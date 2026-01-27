const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')
const { request } = require('express')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  try {
    const body = request.body
    const user = request.user
    if (!user) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes,
      user: user._id,
    })

    const saved = await blog.save()

    // maintain inverse relation
    user.blogs = user.blogs.concat(saved._id)
    await user.save()

    const populatedBlog = await Blog.findById(saved._id).populate('user', { username: 1, name: 1 })
    response.status(201).json(populatedBlog)
  } catch (error) {
    next(error)  // pass to error handler
  }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    // Require a valid user and ownership
    const user = request.user
    if (!user) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      // Keep previous semantics for nonexistent blogs
      return response.status(204).end()
    }

    //toString() needed cause blog.user is ObjectId while user._id is ObjectId/string
    if (blog.user && blog.user.toString() !== user._id.toString()) {
      return response.status(403).json({ error: 'forbidden: not the blog owner' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  }
  catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const updated = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true }
    ).populate('user', { username: 1, name: 1 })
    response.json(updated)
  }
  catch (error) {
    next(error)
  }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }
    
    blog.comments = blog.comments.concat(request.body.comment)
    const updated = await blog.save()
    const populated = await Blog.findById(updated._id).populate('user', { username: 1, name: 1 })
    response.status(201).json(populated)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter