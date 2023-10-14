import { useState, useImperativeHandle, forwardRef } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const [buttonName, setButtonName] = useState("view");
  const [likes, setLikes] = useState(blog.likes);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const showWhenVisible = { display: visible ? "" : "none" };

  const handleButtonClick = () => {
    setVisible(!visible);
    setButtonName(buttonName === "view" ? "hide" : "view");
  };

  const handleLikeAddition = () => {
    const updatedBlog = { ...blog, likes: likes + 1 };
    blogService.update(blog.id, updatedBlog);
    setLikes(likes + 1);
  };

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={handleButtonClick}>{buttonName}</button>
      <div style={showWhenVisible}>
        {blog.author}
        <br />
        {blog.url}
        <br />
        likes: {likes} <button onClick={handleLikeAddition}>like</button>
        <br />
        {blog.user.name}
      </div>
    </div>
  );
};

export default Blog;
