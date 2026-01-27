import { useState } from 'react'
import { TextField, Button, Stack } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleBlogChange = (event) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    }

    if (typeof createBlog === 'function') createBlog(blogObject)

    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <Stack
      component="form"
      spacing={2}
      onSubmit={addBlog}
      sx={{ maxWidth: 420 }}
    >
      <TextField
        label="title"
        name="title"
        value={newBlog.title}
        onChange={handleBlogChange}
        size="small"
        fullWidth
      />
      <TextField
        label="author"
        name="author"
        value={newBlog.author}
        onChange={handleBlogChange}
        size="small"
        fullWidth
      />
      <TextField
        label="url"
        name="url"
        value={newBlog.url}
        onChange={handleBlogChange}
        size="small"
        fullWidth
      />
      <Button
        variant="contained"
        type="submit"
        sx={{ alignSelf: 'flex-start' }}
      >
        create
      </Button>
    </Stack>
  )
}

export default BlogForm
