const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../db.js");
const { requireAuth, SECRET } = require("../middleware/auth.js");

const router = express.Router();

router.post("/login", (req, res) => {
  const { password } = req.body || {};
  const hash = db.get("settings.passwordHash").value();
  if (!password || !bcrypt.compareSync(password, hash)) {
    return res.status(401).json({ error: "Wrong password." });
  }
  const token = jwt.sign({ role: "admin" }, SECRET, { expiresIn: "12h" });
  res.json({ token });
});

router.post("/change-password", requireAuth, (req, res) => {
  const { currentPassword, newPassword } = req.body || {};
  const hash = db.get("settings.passwordHash").value();
  if (!currentPassword || !newPassword) return res.status(400).json({ error: "Both fields are required." });
  if (!bcrypt.compareSync(currentPassword, hash)) return res.status(401).json({ error: "Current password is incorrect." });
  db.set("settings.passwordHash", bcrypt.hashSync(newPassword, 10)).write();
  res.json({ ok: true });
});

module.exports = router;
