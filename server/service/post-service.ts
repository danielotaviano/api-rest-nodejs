import * as postsData from '../data/posts-data'
import { Post } from '../entities/post'

export const getPosts = (): Promise<Post[]> => {
  return postsData.getPosts()
}

export const getPost = async (id: string): Promise<Post> => {
  const post = await postsData.getPost(id)
  if (!post) throw new Error('post not found')

  return post
}

export const savePost = async (post: Post): Promise<Post> => {
  const existingPost = await postsData.getPostByTitle(post.title)
  if (existingPost) throw new Error('post already exists')

  return postsData.savePost(post)
}

export const deletePost = (id: string): Promise<void> => {
  return postsData.deletePost(id)
}

export const updatePost = async (id: string, post: Partial<Post>): Promise<void> => {
  await getPost(id)

  return postsData.updatePost(id, post)
}
