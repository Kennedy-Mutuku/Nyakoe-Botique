const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Nyakoe Boutique API is running...');
});

// Mock Auth Route for now
app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;
  // Professional logic would check against DB
  // For demo/scaffolding, we return a successful response
  res.status(200).json({
    success: true,
    user: {
      id: '1',
      name: role === 'admin' ? 'Admin User' : 'Staff User',
      email: email,
      role: role
    },
    token: 'mock-jwt-token'
  });
});

// Server Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/nyakoe_boutique';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    // Continue running even if DB fails for development purposes
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} (Offline Mode)`));
  });
