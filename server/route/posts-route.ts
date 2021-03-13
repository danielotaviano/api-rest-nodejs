import express from 'express'
import * as postsService from '../service/post-service'
const router = express.Router()

router.get('/posts', async (request, response, next) => {
  try {
    const posts = await postsService.getPosts()
    return response.json(posts)
  } catch (e) {
    next(e)
  }
})

router.post('/posts', async (request, response, next) => {
  const post = request.body
  try {
    const newPost = await postsService.savePost(post)
    return response.status(201).json(newPost)
  } catch (e) {
    next(e)
  }
})

router.put('/posts/:id', async (request, response, next) => {
  const post = request.body
  const { id } = request.params

  try {
    await postsService.updatePost(id, post)
    return response.status(204).end()
  } catch (e) {
    next(e)
  }
})

router.delete('/posts/:id', async (request, response, next) => {
  const { id } = request.params
  try {
    await postsService.deletePost(id)
    return response.status(204).end()
  } catch (e) {
    next(e)
  }
})

export { router }
