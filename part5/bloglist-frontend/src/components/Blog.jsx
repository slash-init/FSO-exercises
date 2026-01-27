import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateBlog as updateBlogThunk,
  deleteBlog as deleteBlogThunk,
} from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

const Blog = ({ blog: propBlog }) => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

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

  // Compact list item view
  if (propBlog) {
    return (
      <div style={blogStyle} className="blog">
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </div>
    )
  }

  // Full blog view
  return (
    <div className="blog">
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </div>
      <div>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </div>
      <div>added by {blog.user?.name}</div>
      {user && blog.user?.username === user.username && (
        <div>
          <button onClick={handleRemove}>remove</button>
        </div>
      )}
    </div>
  )
}

export default Blog
