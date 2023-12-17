// server.js
/*
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const defaultPort = 3000;
const port = process.env.BE_PORT || process.argv[2] || defaultPort;

app.use(bodyParser.json());
app.use(cors());

const doctorRoutes = require('./src/routes/doctors');
const patientRoutes = require('./src/routes/patients');
const authRoutes = require('./src/routes/auth');

app.use('/api', doctorRoutes);
app.use('/api', patientRoutes);
app.use('/api', authRoutes);

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
*/

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//const https = require('https');
//const fs = require('fs');

const app = express();

const defaultPort = 3000;
const port = process.env.BE_PORT || process.argv[2] || defaultPort;

// Load SSL certificate and private key
//const privateKey = fs.readFileSync('/path/to/private-key.pem', 'utf8');
//const certificate = fs.readFileSync('/path/to/certificate.pem', 'utf8');
//const credentials = { key: privateKey, cert: certificate };

app.use(bodyParser.json());

// Specify your frontend's domain in the CORS configuration
const corsOptions = {
  origin: 'https://clinic-web-client-mootazmwahab-dev.apps.sandbox-m3.1530.p1.openshiftapps.com',
  optionsSuccessStatus: 200, // some legacy browsers choke on 204
};

app.use(cors(corsOptions));

const doctorRoutes = require('./src/routes/doctors');
const patientRoutes = require('./src/routes/patients');
const authRoutes = require('./src/routes/auth');

app.use('/api', doctorRoutes);
app.use('/api', patientRoutes);
app.use('/api', authRoutes);

// Create an HTTPS server
//const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
