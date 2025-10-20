const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const hdr = req.header("Authorization") || "";
  const token = hdr.startsWith("Bearer ") ? hdr.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Missing token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "devsecret");
    req.user = payload; // { sub, email, name }
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
