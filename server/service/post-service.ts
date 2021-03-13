import { PostsData } from '../data/posts-data'
import { Post } from '../entities/post'

export class PostsService {
  constructor (private readonly postsData: PostsData) {}

  getPosts (): Promise<Post[]> {
    return this.postsData.getPosts()
  }

  async getPost (id: string): Promise<Post> {
    const post = await this.postsData.getPost(id)
    if (!post) throw new Error('post not found')

    return post
  }

  async savePost (post: Post): Promise<Post> {
    const existingPost = await this.postsData.getPostByTitle(post.title)
    if (existingPost) throw new Error('post already exists')

    return this.postsData.savePost(post)
  }

  deletePost (id: string): Promise<void> {
    return this.postsData.deletePost(id)
  }

  async updatePost (id: string, post: Partial<Post>): Promise<void> {
    await this.getPost(id)

    return this.postsData.updatePost(id, post)
  }
}
