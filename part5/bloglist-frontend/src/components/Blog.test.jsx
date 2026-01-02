import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'//for testing interactive elems..
import Blog from './Blog'

test('renders title and author but not url or likes by default', () => {
    const blog = {
        title: 'Blog title',
        author: 'Author Name',
        url: 'http://example.com',
        likes: 0
    }

    const {container} = render(<Blog blog={blog} />)

    const div = container.querySelector('.blog')
    // title and author should be rendered
    expect(div).toHaveTextContent('Blog title')
    expect(div).toHaveTextContent('Author Name')

    // url and likes should NOT be rendered by default
    expect(screen.queryByText('http://example.com')).toBeNull()
    expect(screen.queryByText(/likes/)).toBeNull()
})

test('shows url and likes when view button clicked', async () => {
  const blog = {
    title: 'Blog title',
    author: 'Author Name',
    url: 'http://example.com',
    likes: 0
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(screen.getByText('http://example.com')).toBeInTheDocument()
  expect(screen.getByText('likes 0')).toBeInTheDocument()
})

test('calls updateBlog twice when like clicked twice', async () => {
  const blog = {
    title: 'Blog title',
    author: 'Author Name',
    url: 'http://example.com',
    likes: 0,
    id: '1',
    user: { id: 'u1', name: 'User' }
  }

  const mockHandler = vi.fn()
  render(<Blog blog={blog} updateBlog={mockHandler} />)

  const user = userEvent.setup()
  const buttonView = screen.getByText('view')
  await user.click(buttonView)

  const buttonLike = screen.getByText('like')
  await user.click(buttonLike)
  await user.click(buttonLike)


  expect(mockHandler).toHaveBeenCalledTimes(2)
})