# Backend - Air Datway (clean starter)

This backend intentionally uses an in-memory store so the service **starts reliably** on Render even if you haven't configured MongoDB yet.
Endpoints:
- GET /health
- POST /api/orders  (body: from,to,weightKg,priceNaira,customerName)
- GET /api/track/:trackingNumber

To run locally:
```bash
cd backend
npm install
npm start
```
