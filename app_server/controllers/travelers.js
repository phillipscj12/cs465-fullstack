const Trip = require("../models/Trip");

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

const trips = async (req, res, next) => {
  try {
    const trips = await Trip.find().sort({ createdAt: -1 }).lean();
    res.render("trips", { title: "Trips", trips });
  } catch (e) { next(e); }
};

const tripByCode = async (req, res, next) => {
  try {
    const trip = await Trip.findOne({ code: req.params.code.toUpperCase() }).lean();
    if (!trip) return res.status(404).render("error", { title: "Not Found", message: "Trip not found." });
    res.render("trip-details", { title: trip.title, trip });
  } catch (e) { next(e); }
};

module.exports = { index, trips, tripByCode };
