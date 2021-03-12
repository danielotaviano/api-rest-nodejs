const postsData = require('../data/posts-data')

exports.getPosts = () => {
  return postsData.getPosts()
}