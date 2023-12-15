// server.js

const express = require('express');
const path = require('path');
const defaultPort = 3001;
const port = process.env.FE_PORT || process.argv[2] || defaultPort;
const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Frontend server is running on port ${port}`);
});
