// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

const doctorRoutes = require('./src/routes/doctors');
const patientRoutes = require('./src/routes/patients');
const authRoutes = require('./src/routes/auth');

// API routes
app.use('/api', doctorRoutes);
app.use('/api', patientRoutes);
app.use('/api', authRoutes);

// Serve the React app for any other requests
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(3000, () => {
  console.log('Server Is Running on Port 3000');
});