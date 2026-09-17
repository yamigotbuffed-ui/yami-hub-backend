const express = require("express");
const db = require("../db.js");
const { requireAuth } = require("../middleware/auth.js");

const router = express.Router();

router.get("/", (req, res) => res.json(db.get("stats").value()));

router.put("/", requireAuth, (req, res) => {
  const stats = req.body;
  if (!Array.isArray(stats)) return res.status(400).json({ error: "Expected an array of stats." });
  db.set("stats", stats).write();
  res.json(db.get("stats").value());
});

module.exports = router;
