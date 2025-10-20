require('dotenv').config();
require('./app_api/models/db'); // connect to MongoDB

const path = require('path');
const express = require('express');
const cors = require('cors');
const hbs = require('hbs');

const app = express();
app.use(cors());

/** View engine: Handlebars (HBS) **/
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));
hbs.registerHelper('year', () => new Date().getFullYear());
hbs.registerHelper('currency', v => '$' + Number(v).toFixed(2));
hbs.registerHelper('plural', (n, s) => {
  n = Number(n);
  return n + ' ' + (n === 1 ? s : s + 's');
});

/** Static + body parsing **/
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Routes **/
// Public website (server-rendered pages)
app.use('/', require('./app_server/routes/travelers'));

// REST API (JSON)
app.use('/api', require('./app_api/routes/api'));
app.use('/api', require('./app_api/routes/auth'));

/** 404 handlers **/
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Not Found' });
  }
  res.status(404).render('error', { title: 'Not Found', message: 'Page not found.' });
});

/** Error handler **/
app.use((err, req, res, next) => {
  console.error(err);
  if (req.path.startsWith('/api')) {
    const status = err.status || 500;
    return res.status(status).json({ error: err.message || 'Server Error' });
  }
  res.status(500).render('error', { title: 'Server Error', message: 'Something went wrong.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Travlr site listening on http://localhost:' + PORT);
});
