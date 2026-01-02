import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'//for testing interactive elems..
import BlogForm from './BlogForm'

test('calls createBlog with correct data when a new blog is created', async () => {
  const createBlog = vi.fn()
  render(<BlogForm createBlog={createBlog} />)

  const user = userEvent.setup()
  await user.type(screen.getByRole('textbox', { name: /title/i }), 'Test Title')
  await user.type(screen.getByRole('textbox', { name: /author/i }), 'Test Author')
  await user.type(screen.getByRole('textbox', { name: /url/i }), 'http://test.example')
  await user.click(screen.getByRole('button', { name: /create/i }))

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog).toHaveBeenCalledWith({
    title: 'Test Title',
    author: 'Test Author',
    url: 'http://test.example'
  })
})