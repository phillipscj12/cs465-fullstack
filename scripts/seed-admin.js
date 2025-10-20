require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../app_api/models/User");

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const email = "admin@travlr.com";
    const name = "Admin";
    const password = "Admin123!";

    const hash = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { email },
      { email, name, password: hash },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log("Seeded admin:", email, "password:", password);
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.connection.close();
  }
})();
