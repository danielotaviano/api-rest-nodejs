import 'dotenv/config'
import crypto from 'crypto'
import axios, { Method } from 'axios'

import * as postService from '../service/post-service'

const generate = () => {
  return crypto.randomBytes(20).toString('hex')
}

const request = async (url: string, method: Method, data?: unknown) => {
  return axios({ url, method, data, validateStatus: () => true })
}

test('should get a posts', async () => {
  const post1 = await postService.savePost({ title: generate(), content: generate() })
  const post2 = await postService.savePost({ title: generate(), content: generate() })
  const post3 = await postService.savePost({ title: generate(), content: generate() })

  const response = await request('http://localhost:3000/posts', 'get')

  expect(response.status).toBe(200)

  const posts = response.data

  expect(posts).toHaveLength(3)

  await postService.deletePost(post1.id)
  await postService.deletePost(post2.id)
  await postService.deletePost(post3.id)
})

test('should save a post', async () => {
  const data = ({ title: generate(), content: generate() })

  const response = await request('http://localhost:3000/posts', 'post', data)

  expect(response.status).toBe(201)

  const post = response.data

  expect(post.title).toBe(data.title)
  expect(post.content).toBe(data.content)

  await postService.deletePost(post.id)
})

test('should not save a post', async () => {
  const data = ({ title: generate(), content: generate() })

  const response1 = await request('http://localhost:3000/posts', 'post', data)
  const response2 = await request('http://localhost:3000/posts', 'post', data)

  expect(response2.status).toBe(409)

  const post1 = response1.data

  await postService.deletePost(post1.id)
})

test('should update a post', async () => {
  const post = await postService.savePost({ title: generate(), content: generate() })

  post.title = generate()
  post.content = generate()

  const response = await request(`http://localhost:3000/posts/${post.id}`, 'put', post)

  expect(response.status).toBe(204)

  const updatedPost = await postService.getPost(post.id)

  expect(updatedPost.title).toBe(post.title)
  expect(updatedPost.content).toBe(post.content)

  await postService.deletePost(post.id)
})
test('should not update a post', async () => {
  const post = {
    id: 1
  }
  const response = await request(`http://localhost:3000/posts/${post.id}`, 'put', post)
  expect(response.status).toBe(404)
})

test('should delete a post', async () => {
  const post = await postService.savePost({ title: generate(), content: generate() })

  const response = await request(`http://localhost:3000/posts/${post.id}`, 'delete')

  expect(response.status).toBe(204)

  const posts = await postService.getPosts()

  expect(posts).toHaveLength(0)
})
