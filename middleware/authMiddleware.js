const jwt = require("jsonwebtoken");

// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ error: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, "012efgh");
    req.userId = verified.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
console.log("🚀 ~ authenticateToken ~ authenticateToken:", authenticateToken);
