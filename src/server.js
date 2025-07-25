require("dotenv").config();
const express = require("express");
const cors = require("cors");
const recipeRoutes = require("./routes/recipeRoutes");
const { PORT } = require("./config/dotenvConfig");

const app = express();

// Middleware for JSON parsing
app.use(express.json());

// Enable CORS for all origins and common methods
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Logging incoming requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "🟢 AI Recipe Backend is Running!",
    endpoints: {
      generateRecipe: "/generate-vegan-recipe (POST)"
    },
    status: "OK"
  });
});

// Route handler for recipe generation
app.use("/", recipeRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error("Error encountered:", err.message);
  res.status(err.status || 500).json({ error: err.message || "Something went wrong!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
