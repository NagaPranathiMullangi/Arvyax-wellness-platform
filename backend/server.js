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

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        origin.endsWith(".vercel.app") ||
        origin === "http://localhost:5173"
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Optional: extra headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/session", require("./routes/sessionRoutes"));

// Optional root route (for testing)
app.get("/", (req, res) => {
  res.send("✅ API is working!");
});

// Export for serverless
module.exports = app;
module.exports.handler = serverless(app);
