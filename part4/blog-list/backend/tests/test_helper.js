const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const initialBlogs = [
  { title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7 },
  { title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5 }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

// Obtain a valid JWT by logging in with the seeded user
const getAuthToken = async (api) => {
  const client = api || supertest(app)
  const res = await client
    .post('/api/login')
    .send({ username: 'root', password: 'sekret' })
    .expect(200)
  return res.body.token
}

module.exports = { initialBlogs, blogsInDb, getAuthToken }