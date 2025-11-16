require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

// Simple in-memory store as fallback so service can start even without Mongo configured
const orders = new Map();

// Health
app.get('/health', (req,res)=> res.json({status:'ok', env: process.env.NODE_ENV || 'development'}));

// Create order (demo)
app.post('/api/orders', (req,res)=>{
  const { from, to, weightKg, priceNaira, customerName } = req.body;
  const trackingNumber = `ADL-${Date.now().toString().slice(-6)}-${Math.random().toString(36).slice(2,6).toUpperCase()}`;
  const order = {
    id: uuidv4(),
    trackingNumber,
    from: from || { city: 'Unknown', address: '' },
    to: to || { city: 'Unknown', address: '' },
    weightKg: weightKg || 0,
    priceNaira: priceNaira || 0,
    customerName: customerName || 'Guest',
    status: 'Created',
    events: [{ status:'Created', location: (from && from.city) || 'Unknown', timestamp: new Date().toISOString(), note: 'Order created' }],
    createdAt: new Date().toISOString()
  };
  orders.set(order.trackingNumber, order);
  res.json(order);
});

// Get order by tracking number
app.get('/api/track/:trackingNumber', (req,res)=>{
  const t = req.params.trackingNumber;
  const o = orders.get(t);
  if(!o) return res.status(404).json({ msg: 'Not found' });
  res.json(o);
});

// Basic root
app.get('/', (req,res)=>{
  res.send('Air Datway Logistics API is running. Use /api/orders to create (POST) and /api/track/:trackingNumber to track.');
});

app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
});
