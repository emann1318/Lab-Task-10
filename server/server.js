const express = require('express');
const path = require('path');
const serviceRoutes = require('./routes/serviceRoutes');

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json());

// API Routes
app.use('/api', serviceRoutes);

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../client')));

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
