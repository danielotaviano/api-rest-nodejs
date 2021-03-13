require('dotenv/config')
const e = require('express')
const express = require('express')

const app = express()
app.use(express.json())

app.use('/', require('./route/posts-route'))

app.use((error, request, response, next) => {
  if (error.message === 'post not found')
    return response.status(404).json({ error: e.message })

  if (error.message === 'post already exists')
    return response.status(409).json({ message: e.message })

  return response.status(500).json({ message: e.message })
})

app.listen(3000)