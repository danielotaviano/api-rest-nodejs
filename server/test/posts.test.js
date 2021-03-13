require('dotenv/config')
const axios = require('axios')
const crypto = require('crypto')
const postService = require('../service/post-service')

const generate = () => {
  return crypto.randomBytes(20).toString('hex')
}

const request = async (url, method, data) => {
  return axios({ url, method, data })
}

test('should get a posts', async () => {
  const post1 = await postService.savePost({ title: generate(), content: generate() })
  const post2 = await postService.savePost({ title: generate(), content: generate() })
  const post3 = await postService.savePost({ title: generate(), content: generate() })

  const response = await request('http://localhost:3000/posts', 'get')

  const posts = response.data

  expect(posts).toHaveLength(3)

  await postService.deletePost(post1.id)
  await postService.deletePost(post2.id)
  await postService.deletePost(post3.id)
})

test('should save a post', async () => {
  const data = ({ title: generate(), content: generate() })

  const response = await request('http://localhost:3000/posts', 'post', data)
  const post = response.data

  expect(post.title).toBe(data.title)
  expect(post.content).toBe(data.content)

  await postService.deletePost(post.id)
})

test('should update a post', async () => {
  const post = await postService.savePost({ title: generate(), content: generate() })

  post.title = generate()
  post.content = generate()

  await request(`http://localhost:3000/posts/${post.id}`, 'put', post)

  const updatedPost = await postService.getPost(post.id)

  expect(updatedPost.title).toBe(post.title)
  expect(updatedPost.content).toBe(post.content)

  await postService.deletePost(post.id)
})

test('should delete a post', async () => {
  const post = await postService.savePost({ title: generate(), content: generate() })

  await request(`http://localhost:3000/posts/${post.id}`, 'delete')

  const posts = await postService.getPosts()

  expect(posts).toHaveLength(0)
})