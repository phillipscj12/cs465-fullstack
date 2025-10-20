const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../app_api/models/User");

const JWT_SECRET = process.env.JWT_SECRET;

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.hash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { sub: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "2h" }
    );
    res.json({ token, profile: { email: user.email, name: user.name, role: user.role } });
  } catch (e) { next(e); }
};

// Optional: simple register for local testing
exports.register = async (req, res, next) => {
  try {
    const { email, name, password } = req.body || {};
    if (!email || !name || !password) return res.status(400).json({ message: "Missing fields" });

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(409).json({ message: "User exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email: email.toLowerCase(), name, hash });
    res.status(201).json({ id: user._id, email: user.email });
  } catch (e) { next(e); }
};
