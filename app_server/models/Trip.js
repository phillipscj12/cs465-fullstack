const { Schema, model } = require("mongoose");

const TripSchema = new Schema(
  {
    code:   { type: String, required: true, unique: true, trim: true, uppercase: true },
    title:  { type: String, required: true, trim: true, minlength: 3, maxlength: 100 },
    summary:{ type: String, required: true, trim: true, maxlength: 500 },
    price:  { type: Number, required: true, min: 0 },
    nights: { type: Number, required: true, min: 1, max: 60 },
    image:  { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

module.exports = model("Trip", TripSchema);
