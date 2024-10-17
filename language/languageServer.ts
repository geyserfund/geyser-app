import bodyParser from 'body-parser'
import cors from 'cors'
import express, { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

const filePath = path.resolve(__dirname, 'translations', 'en.json')

const PORT = process.env.VITE_APP_LNG_PORT
const app = express()
const languageRouter = express.Router()

languageRouter.post('/en', (request: Request, response: Response) => {
  const requestBody = request.body

  const key = Object.keys(requestBody)[0]

  try {
    const existingTranslations = fs.readFileSync(filePath, 'utf-8')
    const translationJson = JSON.parse(existingTranslations)
    translationJson[key] = key

    fs.writeFileSync(filePath, JSON.stringify(translationJson, null, 2))
    response.send('Success')
  } catch (error) {
    console.error(error)
    response.status(500).send('Internal Server Error')
  }
})

app.use(cors())

app.use(bodyParser.json())

app.use('/language', languageRouter)

app.listen(PORT, () => {
  console.log(`Geyser app listening on port ${PORT}`)
})
