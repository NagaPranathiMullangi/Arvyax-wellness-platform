const Session = require("../models/Session");

// 🔓 GET /api/sessions – Public sessions
exports.getPublicSessions = async (req, res) => {
  // console.log("came");
  try {
    const sessions = await Session.find({ status: "published" });
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔐 GET /api/my-sessions – Current user’s sessions
exports.getMySessions = async (req, res) => {
  try {
    console.log(req.user);
    const sessions = await Session.find({ user_id: req.user.userId });
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔐 GET /api/my-sessions/:id – Get one session by ID
exports.getSingleSession = async (req, res) => {
  try {
    const session = await Session.findOne({
      _id: req.params.id,
      user_id: req.user.userId,
    });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔐 POST /api/my-sessions/save-draft – Create or update draft
exports.saveDraftSession = async (req, res) => {
  const { id, title, tags, json_file_url } = req.body;

  try {
    let session;

    if (id) {
      const updateData = {
        status: "draft",
        updated_at: new Date(),
      };

      if (title) updateData.title = title;
      if (tags) updateData.tags = tags;
      if (json_file_url) updateData.json_file_url = json_file_url;

      session = await Session.findOneAndUpdate(
        { _id: id, user_id: req.user.userId },
        updateData,
        { new: true }
      );

      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
    } else {
      if (!title || !json_file_url) {
        return res.status(400).json({
          message: "Title and JSON file URL are required to create a new draft",
        });
      }

      session = new Session({
        user_id: req.user.userId,
        title,
        tags,
        json_file_url,
        status: "draft",
      });

      await session.save();
    }

    res.status(201).json({ message: "Draft saved", session });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.publishSession = async (req, res) => {
  const { id, title, tags, json_file_url } = req.body;

  try {
    let session;

    if (id) {
      const updateData = {
        status: "published",
        updated_at: new Date(),
      };

      if (title) updateData.title = title;
      if (tags) updateData.tags = tags;
      if (json_file_url) updateData.json_file_url = json_file_url;

      session = await Session.findOneAndUpdate(
        { _id: id, user_id: req.user.userId },
        updateData,
        { new: true }
      );

      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
    } else {
      if (!title || !json_file_url) {
        return res.status(400).json({
          message:
            "Title and JSON file URL are required to publish a new session",
        });
      }

      session = new Session({
        user_id: req.user.userId,
        title,
        tags,
        json_file_url,
        status: "published",
      });

      await session.save();
    }

    res.status(201).json({ message: "Session published", session });
  } catch (error) {
    console.error("❌ Error publishing session:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
