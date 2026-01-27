import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import User from './components/User'
import Users from './components/Users'
import {
  initializeBlogs,
  createBlog,
  updateBlog as updateBlogThunk,
  deleteBlog as deleteBlogThunk,
} from './reducers/blogReducer'
import { showNotification } from './reducers/notificationReducer'
import { setUser, clearUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    dispatch(initializeUsers())
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await dispatch(createBlog(blogObject))
      dispatch(
        showNotification(`A new blog "${blogObject.title}" added`, 'success')
      )
      return returnedBlog
    } catch (error) {
      dispatch(showNotification('Failed to add blog', 'error'))
    }
  }

  const updateBlog = async (id, updatedBlog) => {
    try {
      await dispatch(updateBlogThunk(id, updatedBlog))
    } catch (error) {
      dispatch(showNotification('Failed to update blog', 'error'))
    }
  }

  const removeBlog = async (id) => {
    try {
      await dispatch(deleteBlogThunk(id))
    } catch (err) {
      dispatch(showNotification('Error removing blog', 'error'))
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message)
      dispatch(showNotification('wrong credentials', 'error'))
    }
  }
  const handleLogout = () => {
    dispatch(clearUser())
    setUsername('')
    setPassword('')
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
  }

  const loginForm = () => (
    <Stack
      component="form"
      onSubmit={handleLogin}
      spacing={2}
      sx={{ maxWidth: 360 }}
    >
      <TextField
        label="username"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
        size="small"
        fullWidth
      />
      <TextField
        label="password"
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        size="small"
        fullWidth
      />
      <Button variant="contained" type="submit">
        login
      </Button>
    </Stack>
  )

  const blogsPage = (
    <Stack spacing={3} sx={{ mt: 2 }}>
      <Typography variant="h4" component="h1">
        blog app
      </Typography>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          create new
        </Typography>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      <Stack spacing={1}>
        {blogs
          .slice()
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              removeBlog={removeBlog}
              user={user}
            />
          ))}
      </Stack>
    </Stack>
  )

  return (
    <Router>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ gap: 2 }}>
          <Button component={Link} to="/" variant="text">
            blogs
          </Button>
          <Button component={Link} to="/users" variant="text">
            users
          </Button>
          <Stack
            direction="row"
            spacing={1}
            sx={{ ml: 'auto', alignItems: 'center' }}
          >
            {user && (
              <Typography variant="body2">{user.name} logged in</Typography>
            )}
            {user && (
              <Button variant="outlined" size="small" onClick={handleLogout}>
                logout
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 3 }}>
        <Notification />

        {!user && (
          <Stack spacing={2}>
            <Typography variant="h5">log in to application</Typography>
            {loginForm()}
          </Stack>
        )}
        {user && (
          <Routes>
            <Route path="/" element={blogsPage} />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        )}
      </Container>
    </Router>
  )
}

export default App
