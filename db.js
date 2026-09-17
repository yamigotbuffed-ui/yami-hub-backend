const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const adapter = new FileSync(path.join(dataDir, "db.json"));
const db = low(adapter);

const defaultPasswordHash = bcrypt.hashSync("yamihub", 10);

db.defaults({
  settings: { name: "YAMI HUB", tg: "https://t.me/YOUR_TELEGRAM", passwordHash: defaultPasswordHash },
  stats: [
    { label: "Accounts Delivered", value: "1,200+" },
    { label: "Tournaments Hosted", value: "50+" },
    { label: "Happy Squad Members", value: "3,000+" },
    { label: "Telegram Support", value: "24/7" },
  ],
  categories: [
    { slug: "accounts", label: "Accounts", icon: "gamepad", blurb: "Ranked & stacked accounts, ready to drop." },
    { slug: "tournaments", label: "Tournaments", icon: "trophy", blurb: "Compete, climb the leaderboard, get paid." },
    { slug: "sensitivity-hud", label: "Sensitivity & HUD", icon: "target", blurb: "Pro presets tuned for one-tap headshots." },
    { slug: "headshot-settings", label: "Headshot Settings", icon: "crosshair", blurb: "Dialed-in settings for consistent snipes." },
    { slug: "graphics", label: "Graphics", icon: "image", blurb: "Thumbnails, posters & channel art that pop." },
    { slug: "video-editing", label: "Video Editing", icon: "video", blurb: "Montages & highlight reels that hit hard." },
    { slug: "refer-earn", label: "Refer & Earn", icon: "coins", blurb: "Bring squad members, stack up rewards." },
  ],
  items: [
    { id: 1, cat: "Accounts", title: "ACCOUNT #001", desc: "High-level Free Fire account with rare items and skins.", price: "25000", img: "", status: "AVAILABLE" },
    { id: 2, cat: "HUD", title: "4-FINGER PRO HUD", desc: "Competitive 4-finger HUD preset used by top clan players.", price: "1500", img: "", status: "AVAILABLE" },
    { id: 3, cat: "Sensitivity", title: "PREMIUM SENSITIVITY", desc: "Device-tuned sensitivity preset for pinpoint headshots.", price: "1200", img: "", status: "AVAILABLE" },
    { id: 4, cat: "Graphics", title: "TOURNAMENT POSTER", desc: "Custom esports tournament poster, ready to post.", price: "3000", img: "", status: "AVAILABLE" },
    { id: 5, cat: "Video Editing", title: "MONTAGE EDIT", desc: "Fast-paced Free Fire montage edit with fire transitions.", price: "5000", img: "", status: "AVAILABLE" },
  ],
  tournament: {
    status: "OPEN",
    title: "YAMI HUB CLASH",
    dates: "Registration: Sept 15 – Sept 22, 2026",
    entryFee: "₦1,000",
    prizePool: "₦20,000",
    slots: "12",
    leaderName: "TEAM YAMI",
    leaderLine: "Points 42 • Kills 28 • Booyahs 2",
    standings: [
      { id: 1, pos: "1", team: "TEAM YAMI", matches: "6", booyahs: "2", kills: "28", points: "42" },
      { id: 2, pos: "2", team: "RED SQUAD", matches: "6", booyahs: "1", kills: "25", points: "37" },
      { id: 3, pos: "3", team: "NOVA", matches: "6", booyahs: "1", kills: "21", points: "33" },
    ],
  },
}).write();

module.exports = db;
