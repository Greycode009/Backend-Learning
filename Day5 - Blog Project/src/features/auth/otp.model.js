import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "User is required"],
    },
    otpHash: {
      type: String,
      required: [true, "OTP hash is required"],
    },
    expiresAt: {
      type: Date,
      required: [true, "OTP expiration time is required"],
    },
  },
  {
    timestamps: true,
  },
);

const otpModel = mongoose.model("Otp", otpSchema);

export default otpModel;
