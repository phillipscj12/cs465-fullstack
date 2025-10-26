# Travlr Getaways — Full Stack Project

# in module2-travlr
npm install
# set env in .env:
# MONGODB_URI=...
# JWT_SECRET=...
npm run dev
# API: http://localhost:3000/api/trips
# Login: POST http://localhost:3000/api/auth/login

# in travlr-admin
npm install
npx ng serve --host 127.0.0.1 --port 4200
# App: http://127.0.0.1:4200

Architecture

Front end styles used and why

Express + Handlebars (server-rendered HTML + a bit of JS): powers the public site. Good for SEO, fast first paint, and simple trip browsing.

Angular SPA (TypeScript, components, client-side routing): powers the admin tools. Great for rich, interactive CRUD with form state, validation, and quick updates without full page reloads.

Why MongoDB (NoSQL)

Flexible schema for trip data (code, title, summary, price, nights, image) that can evolve without heavy migrations.

JSON-like documents line up nicely with the API responses.

Simple to model and query small, focused collections for this project.

Functionality

JSON vs JavaScript, and how they connect layers

JavaScript is the programming language running in Node and the browser.

JSON is a lightweight data format (text) used on the wire. The API sends JSON, the SPA reads/writes JSON, and the Express site can also use JSON to render templates. It’s the contract between front end and back end.

Refactors and reusable UI

Moved trip logic from one big template into smaller Angular components (Trip list → Trip card + Trip editor).
Benefits: clearer code, easier testing, and reusability across screens.

Centralized API calls in a TripsService.
Benefits: one place for HTTP logic, easier error handling, and simpler updates if endpoints change.

Added an HTTP interceptor to attach the JWT automatically.
Benefits: no token plumbing in every call.

Testing

Endpoints and methods

GET /api/trips and /api/trips/:code to read data.

POST/PUT/DELETE on /api/trips to create/update/remove trips. These are protected.

Security checks

JWT login: POST /api/auth/login returns a token.

Protected routes require Authorization: Bearer <token>.
In Postman, verify:

Missing/invalid token → 401.

Valid token → success (201/200/204 depending on action).

What I tested

Public GET routes load correctly in the browser and Postman.

Admin SPA can add, edit, and delete trips and shows changes immediately.

Error paths return the right HTTP status codes and JSON error messages.

Reflection

This project pulled together the full stack: Express routing, HBS templates, REST design, MongoDB modeling, Angular components/services, and auth with JWT.

I’m more confident setting up environments, wiring APIs, and structuring an SPA around services and interceptors.

I practiced clean separation of concerns (MVC site vs. API vs. SPA) and learned to protect write operations with middleware.

These are the same skills I’ll use on production teams: building endpoints that are easy to consume, organizing front-end code into reusable pieces, and adding basic security the right way.
