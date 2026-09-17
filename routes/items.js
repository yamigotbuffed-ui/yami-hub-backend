const express = require("express");
const db = require("../db.js");
const { requireAuth } = require("../middleware/auth.js");

const router = express.Router();

router.get("/", (req, res) => res.json(db.get("items").value()));

router.post("/", requireAuth, (req, res) => {
  const { cat, title, desc, price, img, status } = req.body || {};
  if (!title || !price) return res.status(400).json({ error: "Title and price are required." });
  const item = { id: Date.now(), cat: cat || "Accounts", title, desc: desc || "", price: String(price), img: img || "", status: status || "AVAILABLE" };
  db.get("items").push(item).write();
  res.status(201).json(item);
});

router.put("/:id", requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const item = db.get("items").find({ id }).value();
  if (!item) return res.status(404).json({ error: "Product not found." });
  const patch = req.body || {};
  db.get("items").find({ id }).assign(patch).write();
  res.json(db.get("items").find({ id }).value());
});

router.delete("/:id", requireAuth, (req, res) => {
  const id = Number(req.params.id);
  db.get("items").remove({ id }).write();
  res.json({ ok: true });
});

module.exports = router;
