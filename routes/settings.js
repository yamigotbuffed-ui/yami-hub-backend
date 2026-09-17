const express = require("express");
const db = require("../db.js");
const { requireAuth } = require("../middleware/auth.js");

const router = express.Router();

router.get("/", (req, res) => {
  const { name, tg } = db.get("settings").value();
  res.json({ name, tg });
});

router.put("/", requireAuth, (req, res) => {
  const { name, tg } = req.body || {};
  if (typeof name === "string") db.set("settings.name", name).write();
  if (typeof tg === "string") db.set("settings.tg", tg).write();
  const { name: n, tg: t } = db.get("settings").value();
  res.json({ name: n, tg: t });
});

module.exports = router;
