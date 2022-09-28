const prerender = require('prerender-node');
const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.port || 5000;

const app = express();

app.use(prerender.set('prerenderServiceUrl', 'http://localhost:3000/'));

app.use(express.static(path.join(__dirname, 'build')));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Geyser app listening on port ${PORT}`);
});
