const express = require("express");
const db = require("../db.js");
const { requireAuth } = require("../middleware/auth.js");

const router = express.Router();

router.get("/", (req, res) => res.json(db.get("categories").value()));

router.put("/:slug", requireAuth, (req, res) => {
  const { slug } = req.params;
  const { label, blurb } = req.body || {};
  const cat = db.get("categories").find({ slug }).value();
  if (!cat) return res.status(404).json({ error: "Category not found." });
  if (typeof label === "string") db.get("categories").find({ slug }).assign({ label }).write();
  if (typeof blurb === "string") db.get("categories").find({ slug }).assign({ blurb }).write();
  res.json(db.get("categories").value());
});

module.exports = router;
