const express = require('express')
const router = express.Router()
const postsService = require('../service/post-service')

router.get('/posts', async (request, response) => {
  const posts = await postsService.getPosts()
  return response.json(posts)
})


router.post('/posts', async (request, response) => {
  const post = request.body
  const newPost = await postsService.savePost(post)

  return response.json(newPost)
})

router.put('/posts/:id', async (request, response) => {
  const post = request.body
  const { id } = request.params
  await postsService.updatePost(id, post)

  return response.end()
})

router.delete('/posts/:id', async (request, response) => {
  const { id } = request.params
  await postsService.deletePost(id)

  return response.end()
})

module.exports = router