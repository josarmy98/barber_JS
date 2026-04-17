const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Simple Mock Database
const MOCK_SHOPS = [
  {
    id: 'shop1',
    name: 'The Golden Scissor (Server)',
    description: 'Luxury grooming for the modern gentleman. Serving you from the real Node.js backend!',
    address: '123 Ocean Drive, Miami, FL 33139',
    latitude: 25.7825,
    longitude: -80.1299,
    images: ['https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800'],
    rating: 4.8,
    reviewCount: 342,
    ownerId: 'o1',
    services: [
      { id: 's1', name: 'Premium Haircut', price: 45, durationMinutes: 45, category: 'haircut' }
    ],
    barbers: ['b1'],
    workingHours: [],
    amenities: ['Free WiFi'],
    isPremium: true,
  }
];

// Routes
app.get('/api/shops', (req, res) => {
  res.json(MOCK_SHOPS);
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  // Simple auth simulation
  if (email && password) {
    res.json({
      success: true,
      user: {
        id: 'u1',
        email,
        fullName: 'Real App User',
        role: 'client',
        createdAt: new Date().toISOString()
      }
    });
  } else {
    res.status(400).json({ success: false, message: 'Invalid credentials' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log(`🚀 BarberHub Backend running on http://localhost:${PORT}`);
});
