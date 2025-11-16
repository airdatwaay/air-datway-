# air-datway-clean - Clean starter repo (guaranteed to start)

This repo contains a minimal backend intentionally using an in-memory store so Render will start the service even without database credentials.
Steps to deploy on Render:
1. Create a GitHub repo and push these files (upload folders, not a zip)
2. On Render create a new Web Service and connect to the repo
3. Set Root Directory to: backend
4. Build Command: npm install
5. Start Command: npm start
6. Optionally set environment variables (MONGO_URI, JWT_SECRET) if you later enable Mongo integration
