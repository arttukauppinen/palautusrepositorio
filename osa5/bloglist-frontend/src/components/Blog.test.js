import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

jest.mock('../services/blogs', () => ({
  update: jest.fn(() => Promise.resolve()),
}))

test('title renders, and author, url and likes dont', () => {
  const blog = {
    title: 'Deez nuts',
    author: 'Ligma',
    url: 'http://test.com',
    likes: 5,
    user: { name: 'Matti Luukkainen' }
  }

  render(<Blog blog={blog}/>)

  expect(screen.getByText('Deez nuts')).toBeInTheDocument()
  expect(screen.queryByText('Ligma')).not.toBeInTheDocument()
  expect(screen.queryByText('http://test.com')).not.toBeInTheDocument()
  expect(screen.queryByText('likes: 5')).not.toBeInTheDocument()
})

test('renders author, url and likes when the view button is clicked', async () => {
  const blog = {
    title: 'Deez nuts',
    author: 'Ligma',
    url: 'http://test.com',
    likes: 5,
    user: { name: 'Matti Luukkainen' }
  }

  const user = userEvent.setup()
  const { container } = render(<Blog blog={blog} />)
  const button = screen.getByText('view')
  await user.click(button)

  const author = container.querySelector('.author')
  const likes = container.querySelector('.likes')
  const url = container.querySelector('.url')

  expect(author).toBeDefined()
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})

test('when like button is clicked twice, event handler is called twice', async () => {
  const blog = {
    title: 'Deez nuts',
    author: 'Ligma',
    url: 'http://test.com',
    likes: 5,
    user: { name: 'Matti Luukkainen' }
  }

  const user = userEvent.setup()
  const refreshBlogs = jest.fn()

  render(<Blog blog={blog} refreshBlogs={refreshBlogs} />)
  const button = screen.getByText('view')
  await user.click(button)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(refreshBlogs).toHaveBeenCalledTimes(2)
})
