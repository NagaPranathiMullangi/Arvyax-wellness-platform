const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const serverless = require("serverless-http");
const connectDB = require("./config/db");

dotenv.config();
const app = express();
connectDB();

// Allow specific origin instead of "*"
const allowedOrigins = [
  "https://arvyax-wellness-platform-i3jz.vercel.app", // your frontend
  "http://localhost:3000", // for local testing
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      console.log(origin);
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Handle preflight OPTIONS requests for all routes
app.options("*", cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/session", require("./routes/sessionRoutes"));

app.get("/", (req, res) => {
  res.send("✅ API is running from Vercel serverless!");
});

module.exports = app;
module.exports.handler = serverless(app);
