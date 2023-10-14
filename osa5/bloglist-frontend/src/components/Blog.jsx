import { useState, useImperativeHandle, forwardRef } from "react";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const [buttonName, setButtonName] = useState("view");
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

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={handleButtonClick}>{buttonName}</button>
      <div style={showWhenVisible}>
        {blog.author}
        <br />
        {blog.url}
        <br />
        likes: {blog.likes} <button>like</button>
        <br />
        {blog.user.name}
      </div>
    </div>
  );
};

export default Blog;
