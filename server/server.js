require('dotenv/config')
const express = require('express')

const app = express()

app.use('/', require('./route/posts-route'))

app.listen(3000)