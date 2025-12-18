const express = require('express')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

mongoose.set('strictQuery', false)

const app = express()
app.use(express.json())
app.use('/api/blogs', blogsRouter)

// Error handler (must be last)
app.use((error, request, response, next) => {
  console.error(error.message)
  
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformed id' })
  }
  
  response.status(500).json({ error: error.message })
})

module.exports = app