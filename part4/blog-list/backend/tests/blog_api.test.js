const { test, after, before, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const config = require('../utils/config')  
const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcrypt')

before(async () => {
  await mongoose.connect(config.MONGODB_URI)
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

// Ensure a known users state for user-related tests
beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', name: 'Superuser', passwordHash })
  await user.save()
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
  const token = await helper.getAuthToken(api)
  const newBlog = {
    title: 'Async patterns in Node',
    author: 'Dan Abramov',
    url: 'https://example.com/async',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  assert(titles.includes('Async patterns in Node'))
})

test('likes defaults to 0 if missing', async () => {
  const token = await helper.getAuthToken(api)
  const newBlog = {
    title: 'Blog without likes',
    author: 'Test Author',
    url: 'https://example.com'
    // likes property is missing
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)

  assert.strictEqual(response.body.likes, 0)
})

test('missing title returns 400', async () => {
  const token = await helper.getAuthToken(api)
  const newBlog = {
    author: 'Test Author',
    url: 'https://example.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
})

test('missing url returns 400', async () => {
  const token = await helper.getAuthToken(api)
  const newBlog = {
    title: 'Blog without url',
    author: 'Test Author',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
})

test('adding a blog without token returns 401 and does not change DB', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const newBlog = {
    title: 'No Auth Blog',
    author: 'No Auth',
    url: 'https://noauth.example.com',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
})

test('a blog can be deleted', async () => {
  const token = await helper.getAuthToken(api)
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

  const ids = blogsAtEnd.map(b => b.id)
  assert(!ids.includes(blogToDelete.id))
})

test('delete nonexistent blog returns 404', async () => {
  const token = await helper.getAuthToken()
  const invalidId = '000000000000000000000000'

  await api
    .delete(`/api/blogs/${invalidId}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)  // MongoDB returns 204 for nonexistent IDs
})

test('likes can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedBlog = {
    likes: 999
  }

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 999)
  assert.strictEqual(response.body.id, blogToUpdate.id)
})

test('entire blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updated = {
    title: 'Updated Title',
    author: 'Updated Author',
    url: 'https://updated.com',
    likes: 50
  }

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updated)
    .expect(200)

  assert.strictEqual(response.body.title, 'Updated Title')
  assert.strictEqual(response.body.likes, 50)
})

after(async () => {
  await mongoose.connection.close()
})

// User validation tests
test('user creation fails with 400 if username is shorter than 3 chars', async () => {
  const usersAtStart = await User.find({})

  const newUser = {
    username: 'ab',
    name: 'Short Name',
    password: 'strongpassword'
  }

  const res = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  // Mongoose ValidationError message should mention minlength/validation
  assert.match(res.body.error, /(shorter than the minimum allowed length|minlength|validation)/i)

  const usersAtEnd = await User.find({})
  assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})

test('user creation fails with 400 if username is missing', async () => {
  const usersAtStart = await User.find({})

  const newUser = {
    name: 'No Username',
    password: 'strongpassword'
  }

  const res = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  assert.match(res.body.error, /(username|required)/i)

  const usersAtEnd = await User.find({})
  assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})

test('user creation fails with 400 if username is not unique', async () => {
  const usersAtStart = await User.find({})

  const newUser = {
    username: 'root', // already created in beforeEach
    name: 'Duplicate',
    password: 'anothersecret'
  }

  const res = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  assert.match(res.body.error, /(unique|duplicate|already)/i)

  const usersAtEnd = await User.find({})
  assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})