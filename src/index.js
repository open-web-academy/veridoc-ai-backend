require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const specialistRoutes = require('./routes/specialists');
const consultationRoutes = require('./routes/consultations');

const app = express();
const PORT = process.env.PORT || 3003;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(morgan('dev')); // Log each request: method, url, status, time
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
console.log("Registering /api/specialists...");
app.use('/api/specialists', specialistRoutes);
console.log("Registering /api/consultations...");
app.use('/api/consultations', consultationRoutes);
console.log("Routes registered.");

// Health check
app.get('/', (req, res) => {
  res.json({
    message: 'Veridoc API - Backend running',
    version: '1.0.0',
    endpoints: {
      specialists: '/api/specialists',
      consultations: {
        base: '/api/consultations',
        documentation: {
          'POST /api/consultations': 'Create consultation',
          'GET /api/consultations/specialist/:account': 'List consultations by specialist account',
          'GET /api/consultations/:id': 'Get consultation by ID',
          'PATCH /api/consultations/:id': 'Update consultation (status/comments)'
        }
      },
      documentation: {
        'POST /api/specialists': 'Create specialist',
        'GET /api/specialists': 'List specialists (?status, ?specialty, ?city)',
        'GET /api/specialists/identifier/:identifier': 'Find by account identifier',
        'GET /api/specialists/by-document-id/:id': 'Get specialist by MongoDB _id',
        'GET /api/specialists/:id': 'Get specialist by privyWallet',
        'PATCH /api/specialists/:id/status': 'Update status',
        'PUT /api/specialists/:id': 'Update specialist (by privyWallet)',
        'DELETE /api/specialists/:id': 'Delete specialist'
      }
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
