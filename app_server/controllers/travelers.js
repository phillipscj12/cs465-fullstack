const path = require("path");
const fs = require("fs");

// read trips.json each request (simple for Module 3; later we’d cache or DB)
function readTrips() {
  const p = path.join(__dirname, "..", "..", "data", "trips.json");
  const raw = fs.readFileSync(p, "utf8");
  const clean = raw.replace(/^\uFEFF/, ""); // strip BOM if present
  return JSON.parse(clean);
}
const index = (req, res) => {
  res.render("index", {
    title: "Travlr Getaways",
    hero: { headline: "Plan your next trip", sub: "Fast, simple, and flexible." },
    features: [
      { icon: "🗺️", text: "Curated itineraries" },
      { icon: "🛫", text: "Flexible departures" },
      { icon: "💬", text: "Real support" }
    ]
  });
};

const trips = (req, res, next) => {
  try {
    const trips = readTrips();
    res.render("trips", { title: "Trips", trips });
  } catch (e) {
    next(e);
  }
};

const tripByCode = (req, res, next) => {
  try {
    const trips = readTrips();
    const trip = trips.find(t => t.code === req.params.code);
    if (!trip) return res.status(404).render("error", { title: "Not Found", message: "Trip not found." });
    res.render("trip-details", { title: trip.title, trip });
  } catch (e) {
    next(e);
  }
};

module.exports = { index, trips, tripByCode };
