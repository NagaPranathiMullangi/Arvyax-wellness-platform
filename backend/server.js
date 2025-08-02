const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// ✅ Register the route
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/sessionRoutes"));

app.get("/", (req, res) => {
  res.send("API is running");
});

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
