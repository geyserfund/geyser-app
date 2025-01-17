/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const handler = require('serve-handler')
const prerender = require('prerender-node')
const cors = require('cors')

console.log(
  `ENV VAR CHECK:\n\tPORT: ${process.env.PORT}\nPRERENDER_TOKEN: not null -> ${Boolean(process.env.PRERENDER_TOKEN)}`,
)

const PORT = process.env.PORT || 3000
const app = express()

app.use(
  cors({
    credentials: true,
  }),
)

app.use(
  prerender.set('prerenderToken', process.env.PRERENDER_TOKEN).set('afterRender', (err) => {
    // If the request to prerender server fails, just return the normal static files.
    if (err) {
      console.error('Prerender Error', err)
      return { cancelRender: true }
    }
  }),
)

app.use((request, response) => {
  return handler(request, response, {
    public: './dist',
    rewrites: [{ source: '*', destination: '/index.html' }],
    headers: [
      {
        source: '{sw.js, meta.json}',
        headers: [
          {
            key: 'cache-control',
            value: 'private, no-cache, no-store, must-revalidate, max-age=0',
          },
          {
            key: 'pragma',
            value: 'no-cache',
          },
          {
            key: 'expires',
            value: '0',
          },
        ],
      },
    ],
  })
})

app.listen(PORT, () => {
  console.log(`Geyser app listening on port ${PORT}`)
})
