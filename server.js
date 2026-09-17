require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.js");
const settingsRoutes = require("./routes/settings.js");
const statsRoutes = require("./routes/stats.js");
const categoriesRoutes = require("./routes/categories.js");
const itemsRoutes = require("./routes/items.js");
const tournamentRoutes = require("./routes/tournament.js");

const app = express();
const PORT = process.env.PORT || 4000;

// Comma-separated list of allowed frontend origins, e.g. "https://yami-hub.onrender.com,http://localhost:5173"
const allowedOrigins = (process.env.CORS_ORIGIN || "*").split(",").map((s) => s.trim());

app.use(
  cors({
    origin: allowedOrigins.includes("*") ? true : allowedOrigins,
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/items", itemsRoutes);
app.use("/api/tournament", tournamentRoutes);

app.use((req, res) => res.status(404).json({ error: "Not found." }));

app.listen(PORT, () => console.log(`YAMI HUB backend running on port ${PORT}`));
