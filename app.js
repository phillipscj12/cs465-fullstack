const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

/** View engine: Handlebars **/
app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "app_server", "views", "partials"));

/** Static files **/
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Routes **/
const travelersRouter = require("./app_server/routes/travelers");
app.use("/", travelersRouter);

/** 404 + error **/
app.use((req, res) => res.status(404).render("error", { title: "Not Found", message: "Page not found." }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("error", { title: "Server Error", message: "Something went wrong." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Travlr site listening on http://localhost:${PORT}`));
