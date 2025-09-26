require('dotenv').config();
const path = require('path');
const express = require('express');
const hbs = require('hbs');

// connect to MongoDB (loads MONGODB_URI from .env)
require('./app_server/models/db');

const app = express();

/** View engine: Handlebars (HBS) **/
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));
hbs.registerHelper('year', function () { return new Date().getFullYear(); });
hbs.registerHelper('currency', function (v) { return '$' + Number(v).toFixed(2); });
hbs.registerHelper('plural', function (n, s) {
  n = Number(n);
  return n + ' ' + (n === 1 ? s : s + 's');
});

/** Static + body parsing **/
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Routes **/
app.use('/', require('./app_server/routes/travelers'));
app.use('/api', require('./app_server/routes/api'));

/** 404 + error handlers **/
app.use(function (req, res) {
  res.status(404).render('error', { title: 'Not Found', message: 'Page not found.' });
});
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).render('error', { title: 'Server Error', message: 'Something went wrong.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Travlr site listening on http://localhost:' + PORT);
});
