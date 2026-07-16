const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
dotenv.config();
const packageRoutes = require('./routes/packageRoutes');
const authRoutes = require('./routes/authRoutes');
const googleAuthRoutes = require('./routes/googleAuthRoutes');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const webhookRoutes = require('./routes/webhookRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const { clerkMiddleware } = require('@clerk/express');

const app = express();
app.set('trust proxy', 1); // Fixes rate-limit issue on Render (proxy)

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://localhost:5175'
];

if (process.env.FRONTEND_URL) {
  const origins = process.env.FRONTEND_URL.split(',').map(o => o.trim().replace(/\/$/, ''));
  allowedOrigins.push(...origins);
}

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(cookieParser());

// Clerk middleware
app.use(clerkMiddleware());

// Webhook route needs to bypass express.json(), so we place it here
app.use('/api/webhooks', webhookRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global Rate Limiting
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: { message: 'Too many requests from this IP, please try again after 15 minutes' },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use('/api', globalLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', googleAuthRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/user', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payment', paymentRoutes);

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/trip_soul';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('Failed to connect to MongoDB', err));
