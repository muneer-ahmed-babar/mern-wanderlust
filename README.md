# 🏡 Wanderlust

A full-stack Airbnb-style listings platform built with the MERN stack (minus React — EJS for server-side views). Users can browse, create, and review property listings, with secure authentication and owner-based authorization ensuring only listing owners can edit or delete their own content.

## ✨ Features

- **Full CRUD for Listings** — create, view, edit, and delete property listings
- **User Authentication** — secure signup/login/logout using Passport.js with hashed passwords (`passport-local-mongoose`)
- **Authorization** — only the owner of a listing can edit or delete it (`isOwner` middleware)
- **Reviews** — add and delete reviews with star ratings on any listing
- **Server-side Validation** — Joi schema validation on all incoming data (listings & reviews)
- **Client-side Validation** — Bootstrap form validation for instant feedback
- **Flash Messages** — success/error feedback after every action (create, update, delete, login, etc.)
- **Centralized Error Handling** — custom `ExpressError` class + `wrapAsync` wrapper for clean async error handling
- **MongoDB Relationships** — listings reference their owner and reviews via Mongoose `ref`/`populate`
- **Cascade Deletes** — deleting a listing automatically removes its associated reviews
- **Responsive UI** — built with Bootstrap 5

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Templating | EJS, ejs-mate |
| Auth | Passport.js, express-session, connect-flash |
| Validation | Joi |
| Styling | Bootstrap 5 |

## 📁 Project Structure

```
├── models/          # Mongoose schemas (Listing, Review, User)
├── routes/          # Express routers (listing, review, user)
├── utils/           # ExpressError & wrapAsync helpers
├── views/           # EJS templates
│   ├── includes/    # Navbar, footer, flash messages
│   ├── layouts/      # Boilerplate layout
│   ├── listings/     # Index, show, new, edit views
│   └── users/        # Login & signup views
├── public/          # Static assets (CSS, JS, images)
├── init/             # Database seed script
├── app.js            # Main server entry point
├── middleware.js      # isLoggedIn, isOwner, saveRedirectUrl
└── schema.js          # Joi validation schemas
```

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB running locally (or a MongoDB Atlas connection string)

### Installation

```bash
# Clone the repository
git clone https://github.com/muneer-ahmed-babar/mern-wanderlust.git
cd mern-wanderlust

# Install dependencies
npm install

# Seed the database with sample listings (optional)
node init/index.js

# Start the server
node app.js
```

The app will be running at `http://localhost:8080`.

## 📌 Note

This project was built as part of a Full Stack Web Development course to practice CRUD operations, authentication, authorization, database relationships, and error handling in a real-world application.

## 👤 Author

**Muneer Ahmed Babar**
[GitHub](https://github.com/muneer-ahmed-babar)
