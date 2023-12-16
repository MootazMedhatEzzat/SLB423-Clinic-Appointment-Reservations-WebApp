const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');

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

// Use the OpenShift provided certificate and key
const credentials = {
  key: fs.readFileSync('/var/run/secrets/kubernetes.io/serviceaccount/service-ca.key'),
  cert: fs.readFileSync('/var/run/secrets/kubernetes.io/serviceaccount/service-ca.crt'),
};

// Create an HTTPS server
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
  console.log(`Backend server is running on port ${port} (HTTPS)`);
});
