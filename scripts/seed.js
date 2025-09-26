require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const Trip = require("../app_server/models/Trip");

(async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("Missing MONGODB_URI");
    await mongoose.connect(uri);
    console.log("Connected to", mongoose.connection.name);

    const p = path.join(__dirname, "..", "data", "trips.json");
    let raw = fs.readFileSync(p, "utf8");
    raw = raw.replace(/^\uFEFF/, ""); // strip BOM if present
    const items = JSON.parse(raw);

    // normalize codes to uppercase and basic sanity checks
    const docs = items.map(t => ({
      code: String(t.code).toUpperCase(),
      title: t.title,
      summary: t.summary,
      price: Number(t.price),
      nights: Number(t.nights),
      image: t.image
    }));

    await Trip.deleteMany({});
    const out = await Trip.insertMany(docs, { ordered: true });
    console.log(`Inserted ${out.length} trips`);
  } catch (e) {
    console.error(e);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log("Disconnected");
  }
})();
