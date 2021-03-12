const express = require('express')
const router = express.Router()
const postsService = require('../service/post-service')

router.get('/posts', async (request, response) => {
  const posts = await postsService.getPosts()
  return response.json(posts)
})

router.get('/posts/:id', (request, response) => {

})

router.post('/posts', (request, response) => {

})

router.put('/posts/:id', (request, response) => {

})

router.delete('/posts/:id', (request, response) => {

})


module.exports = router