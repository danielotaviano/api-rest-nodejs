import { IDatabase } from 'pg-promise'
import { Post } from '../entities/post'

export class PostsData {
  constructor (private readonly database: IDatabase<Post>) {}

  getPosts (): Promise<Post[]> {
    return this.database.query('select * from blog.post')
  }

  getPost (id: string): Promise<Post> {
    return this.database.oneOrNone('select * from blog.post where id = $1', [id])
  }

  getPostByTitle (title: string): Promise<Post> {
    return this.database.oneOrNone('select * from blog.post where title = $1', [title])
  }

  savePost (post: Post): Promise<Post> {
    return this.database.one(
      'insert into blog.post (title, content) values ($1, $2) returning *',
      [post.title, post.content]
    )
  }

  deletePost (id: string): Promise<void> {
    return this.database.none('delete from blog.post where id = $1', [id])
  }

  updatePost (id: string, post: Partial<Post>): Promise<void> {
    return this.database.none('update blog.post set title = $1, content = $2 where id = $3',
      [post.title, post.content, id]
    )
  }
}
