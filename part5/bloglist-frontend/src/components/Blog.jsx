import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Stack,
} from '@mui/material'
import {
  updateBlog as updateBlogThunk,
  deleteBlog as deleteBlogThunk,
  addComment as addCommentThunk,
} from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

const Blog = ({ blog: propBlog }) => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const [commentText, setCommentText] = useState('')

  const blog = propBlog ?? blogs.find((b) => b.id === id)
  if (!blog) return null

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLike = async () => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    try {
      await dispatch(updateBlogThunk(blog.id, updatedBlog))
    } catch (error) {
      dispatch(showNotification('Failed to update blog', 'error'))
    }
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await dispatch(deleteBlogThunk(blog.id))
      } catch (error) {
        dispatch(showNotification('Failed to remove blog', 'error'))
      }
    }
  }

  const handleAddComment = async (event) => {
    event.preventDefault()
    const trimmed = commentText.trim()
    if (!trimmed) return
    try {
      await dispatch(addCommentThunk(blog.id, trimmed))
      setCommentText('')
    } catch (error) {
      dispatch(showNotification('Failed to add comment', 'error'))
    }
  }

  // Compact list item view
  if (propBlog) {
    return (
      <Card variant="outlined" sx={{ mb: 1 }}>
        <CardContent>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </CardContent>
      </Card>
    )
  }

  // Full blog view
  return (
    <Card variant="outlined" className="blog">
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {blog.title} {blog.author}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1.5 }}>
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a>
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="body2">{blog.likes} likes</Typography>
          <Button size="small" variant="contained" onClick={handleLike}>
            like
          </Button>
        </Stack>
        <Typography variant="body2" sx={{ mb: 1 }}>
          added by {blog.user?.name}
        </Typography>
        {user && blog.user?.username === user.username && (
          <Button
            size="small"
            color="error"
            variant="outlined"
            onClick={handleRemove}
            sx={{ mb: 2 }}
          >
            remove
          </Button>
        )}
        <Stack spacing={1} sx={{ mt: 2 }}>
          <Typography variant="h6">comments</Typography>
          <Stack
            component="form"
            direction="row"
            spacing={1}
            onSubmit={handleAddComment}
          >
            <TextField
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="add a comment"
              size="small"
              fullWidth
            />
            <Button type="submit" variant="contained" size="small">
              add
            </Button>
          </Stack>
          <List dense>
            {blog.comments?.map((c, idx) => (
              <ListItem key={idx} disableGutters>
                <ListItemText primary={c} />
              </ListItem>
            ))}
          </List>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default Blog
