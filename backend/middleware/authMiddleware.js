const jwt = require("jsonwebtoken");

// Verify the JWT sent by the frontend.
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Extract the token from: Authorization: Bearer <token>
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication required. Please log in.",
    });
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json({
      success: false,
      message: "Authentication is not configured.",
    });
  }

  // Verify the token and attach its payload to the request.
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token. Please log in again.",
      });
    }

    req.user = decoded;
    next();
  });
};

// Allow only administrator accounts to access protected admin routes.
const requireAdmin = (req, res, next) => {
  if (req.user?.role !== "ADMIN") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Administrator privileges required.",
    });
  }

  next();
};

module.exports = {
  authenticateToken,
  requireAdmin,
};