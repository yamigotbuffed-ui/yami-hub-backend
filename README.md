# YAMI HUB backend

Small Express + JSON-file (lowdb) API backing the YAMI HUB admin panel. No native
dependencies (uses bcryptjs, not bcrypt) so `npm install` works cleanly in Termux
and on Render without build tools.

## Local run
```
npm install
cp .env.example .env   # edit JWT_SECRET
npm start
```
Server runs on http://localhost:4000. Default admin password: `yamihub`.

## Deploy on Render (Web Service)
- New + -> Web Service -> connect this repo
- Build Command: `npm install`
- Start Command: `npm start`
- Environment variables: `JWT_SECRET` (any long random string), `CORS_ORIGIN` (your frontend's live URL)

## API
All write routes require `Authorization: Bearer <token>` from `POST /api/auth/login`.

- POST /api/auth/login { password } -> { token }
- POST /api/auth/change-password { currentPassword, newPassword }  [auth]
- GET/PUT /api/settings  { name, tg }
- GET/PUT /api/stats  [array]
- GET /api/categories, PUT /api/categories/:slug  { label, blurb }
- GET/POST /api/items, PUT/DELETE /api/items/:id
- GET/PUT /api/tournament, POST /api/tournament/standings, PUT/DELETE /api/tournament/standings/:id

Data persists to `data/db.json` (gitignored). On Render's free tier this file
resets on redeploy since the disk isn't persistent — for real durability later,
swap lowdb for a hosted database (e.g. Render Postgres) or add a paid persistent disk.
