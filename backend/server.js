const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

// Middleware to parse JSON
app.use(express.json());

// CORS Configuration
const allowedOrigins = [
  "https://arvyax-wellness-platform-i3jz.vercel.app", // Frontend URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // if you're using cookies or Authorization headers
  })
);

// Connect DB
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/sessionRoutes"));

// Root endpoint
app.get("/", (req, res) => {
  res.send("API is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
