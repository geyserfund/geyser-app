const express = require('express');
const handler = require('serve-handler');
const prerender = require('prerender-node');

console.log(`ENV VAR CHECK:\n\tPORT: ${process.env.PORT}\n\PRERENDER_TOKEN: not null -> ${Boolean(process.env.PRERENDER_TOKEN)}`);

const PORT = process.env.PORT || 3001;
const app = express();

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
