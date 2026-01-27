import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import {
  initializeBlogs,
  createBlog,
  updateBlog as updateBlogThunk,
  deleteBlog as deleteBlogThunk,
} from './reducers/blogReducer'
import { showNotification } from './reducers/notificationReducer'
import { setUser, clearUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
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
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )

  return (
    <div>
      <Notification />

      {!user && (
        <div>
          <h2>log in to application</h2>
          {loginForm()}
        </div>
      )}
      {user && (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>

          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <h2>create new</h2>
            <BlogForm createBlog={addBlog} />
          </Togglable>

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
        </div>
      )}
    </div>
  )
}

export default App
