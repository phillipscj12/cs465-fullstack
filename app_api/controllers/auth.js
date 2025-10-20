const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const sign = (user) => {
  const payload = { sub: user._id.toString(), email: user.email, name: user.name };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || "1d" });
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = sign(user);
    res.json({ token, user: { email: user.email, name: user.name } });
  } catch (e) { next(e); }
};

exports.requireAuth = (req, res, next) => {
  const header = req.headers["authorization"] || "";
  const [, token] = header.split(" ");
  if (!token) return res.status(401).json({ message: "Missing bearer token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach for downstream use
    next();
  } catch {
    return res.status(401).json({ message: "Invalid/expired token" });
  }
};
