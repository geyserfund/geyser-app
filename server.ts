const express = require('express');
const handler = require('serve-handler');

const PORT = process.env.port || 3000;
const app = express();

app.use((request, response) => {
  return handler(request, response, {
    public: './build',
    rewrites: [{ source: '*', destination: '/index.html' }],
  });
});

app.listen(PORT, () => {
  console.log(`Geyser app listening on port ${PORT}`);
});
