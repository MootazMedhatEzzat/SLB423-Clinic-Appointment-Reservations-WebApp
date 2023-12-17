// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const defaultPort = 3000;
const port = process.env.BE_PORT || process.argv[2] || defaultPort;

app.use(bodyParser.json());

// Specify your frontend's domain in the CORS configuration
const corsOptions = {
  origin: 'https://clinic-web-client-mootazmwahab-dev.apps.sandbox-m3.1530.p1.openshiftapps.com',
  optionsSuccessStatus: 200, // some legacy browsers choke on 204
};

app.use(cors(corsOptions));
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
