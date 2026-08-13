import userModel from "../user/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../../config/config.js";
import sessionModel from "./session.model.js";
import { sendEmail } from "./email.service.js";
import { generateOTP, getOtpHtml } from "../../utils/utils.js";
import otpModel from "./otp.model.js";

//POST register function
export async function register(req, res, next) {
  const { username, email, password } = req.body;
  // Basic validation: ensure required fields exist
  const isAlreadyRegistered = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isAlreadyRegistered) {
    // Conflict: username or email already taken
    return res.status(409).json({
      message: "Username or email already exists",
    });
  }

  // Hash password (demo): SHA-256 is shown here for simplicity.
  // In real applications use a slow KDF like bcrypt or argon2 with a salt.
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  // Create and persist the new user
  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  const otp = generateOTP();
  const otpHtml = getOtpHtml(otp);

  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

  const otpDoc = await otpModel.create({
    email,
    user: user._id,
    otpHash,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000), // OTP expires in 10 minutes
  });

  try {
    await sendEmail(
      email,
      "OTP Verification",
      `Your OTP code is: ${otp}`,
      otpHtml,
    );
  } catch (error) {
    console.error("OTP email send failed, rolling back registration:", error);
    await otpModel.deleteMany({ user: user._id });
    await userModel.findByIdAndDelete(user._id);

    return res.status(500).json({
      message: "Failed to send verification email. Please try again later.",
    });
  }

  // // Create a refresh token (longer lived) and an access token (short-lived)
  // const refreshToken = jwt.sign(
  //   {
  //     id: user._id,
  //   },
  //   config.JWT_SECRET,
  //   {
  //     expiresIn: config.REFRESH_TOKEN_EXPIRATION,
  //   },
  // );
  // const refreshTokenHash = crypto
  //   .createHash("sha256")
  //   .update(refreshToken)
  //   .digest("hex");
  // // We create a session in the database to store the refresh token hash, IP,
  // // and user agent for security and revocation purposes.
  // // This is a good practice for managing user sessions and enhancing security.
  // const session = await sessionModel.create({
  //   user: user._id,
  //   refreshTokenHash,
  //   ip: req.ip,
  //   userAgent: req.headers["user-agent"],
  // });

  // const accessToken = jwt.sign(
  //   {
  //     id: user._id,
  //     sessionId: session._id, // Include session ID in the access token for validation
  //   },
  //   config.JWT_SECRET,
  //   {
  //     expiresIn: config.ACCESS_TOKEN_EXPIRATION,
  //   },
  // );

  // // Set refresh token in an HTTP-only, secure cookie so it's not accessible to JS.
  // // Note: `secure: true` requires HTTPS — this can prevent cookies in local HTTP dev.
  // res.cookie("refreshToken", refreshToken, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "strict",
  //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  // });

  // Return created user info (omit password) and the access token for immediate use
  return res.status(201).json({
    message: "User registered successfully",
    user: {
      username: user.username,
      email: user.email,
      verified: user.verified,
    },
  });
}

//POST login function
export async function login(req, res, next) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }
  if (!user.verified) {
    return res.status(403).json({
      message:
        "Email not verified. Please verify your email before logging in.",
    });
  }
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const isPasswordValid = hashedPassword === user.password;
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }
  const refreshToken = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    {
      expiresIn: config.REFRESH_TOKEN_EXPIRATION,
    },
  );
  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");
  const session = await sessionModel.create({
    user: user._id,
    refreshTokenHash,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });

  const accessToken = jwt.sign(
    {
      id: user._id,
      sessionId: session._id,
      role: user.role, // Include user role in the access token for authorization
    },
    config.JWT_SECRET,
    {
      expiresIn: config.ACCESS_TOKEN_EXPIRATION,
    },
  );
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  res.status(200).json({
    message: "Login successful",
    user: {
      username: user.username,
      email: user.email,
    },
    accessToken,
  });
}

// Get current user info function
export async function getMe(req, res, next) {
  // Expect `Authorization: Bearer <token>`
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Authorization token is missing",
    });
  }

  // Verify the JWT and retrieve the user id stored in the token
  const decoded = jwt.verify(token, config.JWT_SECRET);

  // Fetch user from DB and return public fields
  const user = await userModel.findById(decoded.id);

  res.status(200).json({
    message: "User fetched successfully",
    user: {
      username: user.username,
      email: user.email,
    },
  });
}

// Rotate refresh token function
export async function refreshToken(req, res, next) {
  // Read refresh token from the HTTP-only cookie
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh token is missing",
    });
  }

  // Verify the refresh token; if invalid/expired this will throw
  const decoded = jwt.verify(refreshToken, config.JWT_SECRET);
  const user = await userModel.findById(decoded.id);

  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const session = await sessionModel.findOne({
    refreshTokenHash,
    revoked: false,
  });
  if (!session) {
    return res.status(401).json({
      message: "Invalid refresh token",
    });
  }
  // Issue a new short-lived access token
  const accessToken = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    {
      expiresIn: config.ACCESS_TOKEN_EXPIRATION,
    },
  );

  // Rotate refresh token: issue a new one and reset the cookie
  const newRefreshToken = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    {
      expiresIn: config.REFRESH_TOKEN_EXPIRATION,
    },
  );
  const newRefreshTokenHash = crypto
    .createHash("sha256")
    .update(newRefreshToken)
    .digest("hex");
  session.refreshTokenHash = newRefreshTokenHash;
  await session.save();

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // Return the new access token for the client to use
  res.status(200).json({
    message: "Access token refreshed successfully",
    accessToken,
  });
}

// Logout function
export async function logout(req, res, next) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(400).json({
      message: "Refresh token is missing",
    });
  }
  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const session = await sessionModel.findOne({
    refreshTokenHash,
    revoked: false,
  });
  if (!session) {
    return res.status(400).json({
      message: "Invalid refresh token",
    });
  }

  session.revoked = true;
  await session.save();

  res.clearCookie("refreshToken");

  res.status(200).json({
    message: "Logged out successfully",
  });
}

// Logout from all sessions function
export async function logoutAll(req, res, next) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(400).json({
      message: "Refresh token is missing",
    });
  }
  const decode = jwt.verify(refreshToken, config.JWT_SECRET);
  await sessionModel.updateMany(
    {
      user: decode.id,
      revoked: false,
    },
    {
      revoked: true,
    },
  );
  res.clearCookie("refreshToken");
  res.status(200).json({
    message: "Logged out from all devices successfully",
  });
}

// Verify email function
export async function verifyEmail(req, res, next) {
  const { email, otp } = req.body;
  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

  const otpDoc = await otpModel.findOne({
    email,
    otpHash,
    expiresAt: { $gt: new Date() }, // Ensure OTP is not expired
  });
  if (!otpDoc) {
    return res.status(400).json({
      message: "Invalid or expired OTP",
    });
  }
  const user = await userModel.findByIdAndUpdate(
    otpDoc.user,
    {
      verified: true,
    },
    {
      new: true,
    },
  );
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  await otpModel.deleteMany({
    user: otpDoc.user,
  }); // Remove all OTPs for this user after successful verification

  return res.status(200).json({
    message: "Email verified successfully",
    user: {
      username: user.username,
      email: user.email,
      verified: user.verified,
    },
  });
}
