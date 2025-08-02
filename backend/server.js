const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("../config/db");

dotenv.config();
const app = express();

// Connect DB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// CORS Configuration - Allow all .vercel.app origins
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || origin.endsWith(".vercel.app")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Routes
app.use("/api/auth", require("../routes/authRoutes"));
app.use("/api", require("../routes/sessionRoutes"));

// Root route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Export the app for Vercel
module.exports = app;

// Start server
////const PORT = process.env.PORT || 5000;
//app.listen(PORT, () => {
// console.log(`🚀 Server running on http://localhost:${PORT}`);
//});
