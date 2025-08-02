const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const serverless = require("serverless-http");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// CORS setup: allow all origins (or restrict to vercel.app domains)
app.use(
  cors({
    origin: "*", // <-- TEMPORARY: allows all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/session", require("./routes/sessionRoutes"));

// Root endpoint
app.get("/", (req, res) => {
  res.send("✅ API is running from Vercel serverless!");
});

// Export as serverless handler
module.exports = app;
module.exports.handler = serverless(app);
