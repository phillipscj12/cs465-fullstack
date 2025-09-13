/**
 * Controller functions render Handlebars views with data.
 * Replace mock data with real data later (Mongo/REST).
 */
const tripsData = [
  { code: "C01", title: "City Break",  price: 499, nights: 3, summary: "Weekend downtown",  image: "/img/beach.jpg" },
  { code: "B02", title: "Beach Escape", price: 899, nights: 5, summary: "Relax on the coast", image: "/img/city.jpg" },
  { code: "M03", title: "Mountain Run", price: 799, nights: 4, summary: "Trails and views",   image: "/img/mountain.jpg" },
];

const index = (req, res) => {
  res.render("index", {
    title: "Travlr Getaways",
    hero: { headline: "Plan your next trip", sub: "Fast, simple, and flexible." },
    features: [
      { icon: "🗺️", text: "Curated itineraries" },
      { icon: "🛫", text: "Flexible departures" },
      { icon: "💬", text: "Real support" },
    ],
  });
};

const trips = (req, res) => {
  res.render("trips", {
    title: "Trips",
    trips: tripsData,
  });
};

const tripByCode = (req, res) => {
  const trip = tripsData.find(t => t.code === req.params.code);
  if (!trip) return res.status(404).render("error", { title: "Not Found", message: "Trip not found." });
  res.render("trip-details", { title: trip.title, trip });
};

module.exports = { index, trips, tripByCode };
