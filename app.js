const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

/** View engine: Handlebars (HBS) **/
app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "app_server", "views", "partials"));
hbs.registerHelper("year", () => new Date().getFullYear());

/** Static + body parsing **/
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** MVC routes **/
const travelersRouter = require("./app_server/routes/travelers");
app.use("/", travelersRouter);
app.use("/api", require("./app_server/routes/json"));

/** 404 + error handlers **/
app.use((req, res) =>
  res.status(404).render("error", { title: "Not Found", message: "Page not found." })
);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("error", { title: "Server Error", message: "Something went wrong." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Travlr site listening on http://localhost:${PORT}`));
hbs.registerHelper("currency", (v) => `$${Number(v).toFixed(2)}`);
hbs.registerHelper("plural", (n, s) => `${n} ${Number(n)===1?s:s+"s"}`);
