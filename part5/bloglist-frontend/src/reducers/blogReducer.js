import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (_state, action) => action.payload,
    appendBlog: (state, action) => state.concat(action.payload),
    replaceBlog: (state, action) =>
      state.map(blog => (blog.id === action.payload.id ? action.payload : blog)),
    removeBlog: (state, action) => state.filter(blog => blog.id !== action.payload)
  }
})

export const { setBlogs, appendBlog, replaceBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => async dispatch => {
  const blogs = await blogService.getAll()
  dispatch(setBlogs(blogs))
}

export const createBlog = blog => async dispatch => {
  const newBlog = await blogService.create(blog)
  dispatch(appendBlog(newBlog))
  return newBlog
}

export const updateBlog = (id, updated) => async dispatch => {
  const saved = await blogService.update(id, updated)
  dispatch(replaceBlog(saved))
  return saved
}

export const deleteBlog = id => async dispatch => {
  await blogService.remove(id)
  dispatch(removeBlog(id))
}

export default blogSlice.reducer
