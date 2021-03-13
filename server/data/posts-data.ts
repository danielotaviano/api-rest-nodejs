import { Post } from '../entities/post'
import { db as database } from '../infra/database'

export const getPosts = (): Promise<Post[]> => {
  return database.query('select * from blog.post')
}

export const getPost = (id: string): Promise<Post> => {
  return database.oneOrNone('select * from blog.post where id = $1', [id])
}

export const getPostByTitle = (title: string): Promise<Post> => {
  return database.oneOrNone('select * from blog.post where title = $1', [title])
}
export const savePost = (post: Post): Promise<Post> => {
  return database.one(
    'insert into blog.post (title, content) values ($1, $2) returning *',
    [post.title, post.content]
  )
}

export const deletePost = (id: string): Promise<void> => {
  return database.none('delete from blog.post where id = $1', [id])
}

export const updatePost = (id: string, post: Partial<Post>): Promise<void> => {
  return database.none('update blog.post set title = $1, content = $2 where id = $3',
    [post.title, post.content, id]
  )
}
