// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const defaultPort = 3000;
const port = process.env.BE_PORT || process.argv[2] || defaultPort;

app.use(bodyParser.json());

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://clinic-web-client-mootazmwahab-dev.apps.sandbox-m3.1530.p1.openshiftapps.com');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Handle preflight requests
//app.options('*', cors(corsOptions));

//app.use(cors());

const doctorRoutes = require('./src/routes/doctors');
const patientRoutes = require('./src/routes/patients');
const authRoutes = require('./src/routes/auth');

app.use('/api', doctorRoutes);
app.use('/api', patientRoutes);
app.use('/api', authRoutes);

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
