const express = require("express");
const db = require("../db.js");
const { requireAuth } = require("../middleware/auth.js");

const router = express.Router();

router.get("/", (req, res) => res.json(db.get("tournament").value()));

router.put("/", requireAuth, (req, res) => {
  const patch = req.body || {};
  delete patch.standings; // standings are managed through their own endpoints
  db.get("tournament").assign(patch).write();
  res.json(db.get("tournament").value());
});

router.post("/standings", requireAuth, (req, res) => {
  const standings = db.get("tournament.standings").value();
  const row = { id: Date.now(), pos: String(standings.length + 1), team: "NEW TEAM", matches: "0", booyahs: "0", kills: "0", points: "0" };
  db.get("tournament.standings").push(row).write();
  res.status(201).json(db.get("tournament").value());
});

router.put("/standings/:id", requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const row = db.get("tournament.standings").find({ id }).value();
  if (!row) return res.status(404).json({ error: "Row not found." });
  db.get("tournament.standings").find({ id }).assign(req.body || {}).write();
  res.json(db.get("tournament").value());
});

router.delete("/standings/:id", requireAuth, (req, res) => {
  const id = Number(req.params.id);
  db.get("tournament.standings").remove({ id }).write();
  res.json(db.get("tournament").value());
});

module.exports = router;
