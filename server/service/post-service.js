const postsData = require('../data/posts-data')

exports.getPosts = () => {
  return postsData.getPosts()
}

exports.getPost = (id) => {
  return postsData.getPost(id)
}

exports.savePost = (post) => {
  return postsData.savePost(post)
}

exports.deletePost = (id) => {
  return postsData.deletePost(id)
}

exports.updatePost = (id, post) => {
  return postsData.updatePost(id, post)
}