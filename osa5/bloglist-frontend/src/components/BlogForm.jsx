import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    })

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id='title'
            name="title"
            value={newBlogTitle}
            onChange={({ target }) => setNewBlogTitle(target.value)}
            placeholder='title'
          />
        </div>
        <div>
          author:
          <input
            id='author'
            name="author"
            value={newBlogAuthor}
            onChange={({ target }) => setNewBlogAuthor(target.value)}
            placeholder='author'
          />
        </div>
        <div>
          url:
          <input
            id='url'
            name="url"
            value={newBlogUrl}
            onChange={({ target }) => setNewBlogUrl(target.value)}
            placeholder='url'
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
