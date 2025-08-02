const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const {
  getPublicSessions,
  getMySessions,
  getSingleSession,
  saveDraftSession,
  publishSession,
} = require("../controllers/sessionController");

// Public sessions (published)
router.get("/sessions", getPublicSessions);

// User’s own sessions
router.get("/my-sessions", verifyToken, getMySessions);

// View a single session
router.get("/my-sessions/:id", verifyToken, getSingleSession);

// Save or update a draft
router.post("/my-sessions/save-draft", verifyToken, saveDraftSession);

// Publish a session
router.post("/my-sessions/publish", verifyToken, publishSession);

module.exports = router;
