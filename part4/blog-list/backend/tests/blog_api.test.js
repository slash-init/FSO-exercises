const { test, after, before, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const config = require('../utils/config')  
const api = supertest(app)

before(async () => {
  await mongoose.connect(config.MONGODB_URI)
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  const res = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(res.body.length, helper.initialBlogs.length)
})

test('blog has id property (not _id)', async () => {
  const response = await api.get('/api/blogs')
  
  assert(response.body.length > 0)
  const blog = response.body[0]
  
  assert(blog.id)           // ← id exists
  assert(!blog._id)         // ← _id is removed
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Async patterns in Node',
    author: 'Dan Abramov',
    url: 'https://example.com/async',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  assert(titles.includes('Async patterns in Node'))
})

test('likes defaults to 0 if missing', async () => {
  const newBlog = {
    title: 'Blog without likes',
    author: 'Test Author',
    url: 'https://example.com'
    // likes property is missing
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  assert.strictEqual(response.body.likes, 0)
})

test('missing title returns 400', async () => {
  const newBlog = {
    author: 'Test Author',
    url: 'https://example.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('missing url returns 400', async () => {
  const newBlog = {
    title: 'Blog without url',
    author: 'Test Author',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

after(async () => {
  await mongoose.connection.close()
})