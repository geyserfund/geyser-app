import cors from 'cors'
import express from 'express'
import prerender from 'prerender-node'
import handler from 'serve-handler'

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
  })
})

app.listen(PORT, () => {
  console.log(`Geyser app listening on port ${PORT}`)
})
