import { useState, useImperativeHandle, forwardRef } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, refreshBlogs, canRemove }) => {
  const [visible, setVisible] = useState(false)
  const [buttonName, setButtonName] = useState('view')
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const removeButtonStyle = {
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const handleButtonClick = () => {
    setVisible(!visible)
    setButtonName(buttonName === 'view' ? 'hide' : 'view')
  }

  const handleLikeAddition = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    blogService
      .update(blog.id, updatedBlog)
      .then(() => {
        refreshBlogs()
      })
      .catch((error) => {
        console.error('Error updating the blog:', error)
      })
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService
        .deleteBlog(blog.id)
        .then(() => {
          refreshBlogs()
        })
        .catch((error) => {
          console.error('Error deleting the blog:', error)
        })
    }
  }

  return (
    <div className="blog" style={blogStyle}>
      {blog.title}
      <button id='view' onClick={handleButtonClick}>{buttonName}</button>
      <div style={showWhenVisible}>
        {blog.author}
        <br />
        {blog.url}
        <br />
        likes: {blog.likes} <button id='like' onClick={handleLikeAddition}>like</button>
        <br />
        {blog.user.name}
        <br />
        {canRemove && (
          <button id='remove' onClick={handleDelete} style={removeButtonStyle}>
            remove
          </button>
        )}
      </div>
    </div>
  )
}

export default Blog
