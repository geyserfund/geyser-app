const express = require('express');
const handler = require('serve-handler');
const prerender = require('prerender-node');

const PORT = process.env.port || 3001;
const app = express();

app.use(
  prerender
    .set('prerenderToken', process.env.PRERENDER_TOKEN)
    .set('afterRender', (err) => {
      // If the request to prerender server fails, just return the normal static files.
      if (err) {
        console.error('Prerender Error', err);
        return { cancelRender: true };
      }
    }),
);

app.use((request, response) => {
  return handler(request, response, {
    public: './build',
    rewrites: [{ source: '*', destination: '/index.html' }],
  });
});

app.listen(PORT, () => {
  console.log(`Geyser app listening on port ${PORT}`);
});
