/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')

const filePath = path.resolve(__dirname, 'translations', 'en.json')

const PORT = process.env.VITE_APP_LNG_PORT
const app = express()
const languageRouter = express.Router()

languageRouter.post('/en', (request, response) => {
  requestBody = request.body

  const key = Object.keys(requestBody)[0]

  try {
    const existingTranslations = fs.readFileSync(filePath)
    const translationJson = JSON.parse(existingTranslations)
    translationJson[key] = key

    fs.writeFileSync(filePath, JSON.stringify(translationJson, null, 2))
    response.send('Success')
  } catch (error) {
    console.log(error)
  }
})

app.use(cors())

app.use(bodyParser.json())

app.use('/language', languageRouter)

app.listen(PORT, () => {
  console.log(`Geyser app listening on port ${PORT}`)
})
