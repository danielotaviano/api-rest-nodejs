import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import { router } from './route/posts-route'

const app = express()
app.use(express.json())

app.use('/', router)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, request: Request, response: Response, _: NextFunction) => {
  if (error.message === 'post not found') { return response.status(404).json({ error: error.message }) }

  if (error.message === 'post already exists') { return response.status(409).json({ message: error.message }) }

  return response.status(500).json({ message: error.message })
})

app.listen(3000)
