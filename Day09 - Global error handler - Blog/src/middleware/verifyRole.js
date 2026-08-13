export function verifyRole(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message:
          "Access denied. You do not have the required role to access this resource.",
      });
    }
    next();
  };
}
