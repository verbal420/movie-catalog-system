require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/users");
const movieRoutes = require("./routes/movies");

const app = express(); // Initialize Express app

// Middleware
app.use(express.json()); // Replaces body-parser
app.use(express.urlencoded({ extended: true })); // For URL-encoded data
app.use(cors());

// Routes
app.use("/users", userRoutes);
app.use("/movies", movieRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Export the Express app instance
module.exports = app;