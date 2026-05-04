require('dotenv').config();
const express = require('express');
const cors = require('cors');

const donorRoutes = require('./routes/donor');
const patientRoutes = require('./routes/patient');
const bloodstockRoutes = require('./routes/bloodstock');
const requestRoutes = require('./routes/request');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/donors', donorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/bloodstock', bloodstockRoutes);
app.use('/api/requests', requestRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
