const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  name:     { type: String, required: true, trim: true },
  password: { type: String, required: true } // hashed
}, { timestamps: true });

module.exports = model("User", UserSchema);
