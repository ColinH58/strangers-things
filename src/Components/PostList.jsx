import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts, deletePost } from "../API";
const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [filterPosts, setFilterPosts] = useState([]);
  const [filterVal, setFilterVal] = useState("");
  const navigate = useNavigate();

  const handleUpdate = (post) => {
    console.log("UPDATED");
    navigate("/postform", { state: { post: post, updateStatus: true } });
  };

  const handleDelete = async (id) => {
    await deletePost(id);
    const posts = await getPosts();
    setPosts(posts.data.posts);
    console.log("DELETED");
  };

  const handleCreate = () => {
    navigate("/postform");
  };

  useEffect(() => {
    async function fetchData() {
      const posts = await getPosts();
      setPosts(posts.data.posts);
      setFilterPosts(posts.data.posts);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (filterVal.trim().length === 0) {
      setFilterPosts(posts);
    } else if (filterVal.trim().length > 0) {
      const newPosts = posts.filter((post) => {
        console.log("post: ", post.title);
        console.log("filter val: ", filterVal);
        console.log("contains: ", post.title.includes(filterVal));
        return post.title
          .trim()
          .toLowerCase()
          .includes(filterVal.trim().toLowerCase());
      });
      console.log("filter post: ", newPosts);
      setFilterPosts(newPosts);
    }
  }, [filterVal, posts]);

  const isLoggedIn = localStorage.getItem("token");
  return (
    <div className="PostsContainer">
      {/* <h1></h1> */}
      <div className="Search">
        <input
          value={filterVal}
          type="text"
          placeholder="Search..."
          onChange={(e) => setFilterVal(e.target.value)}
        />
      </div>
      {isLoggedIn && (
        <div>
          <button onClick={() => handleCreate()}>Add New Form</button>
        </div>
      )}
      {filterPosts.map((post) => (
        <div className="Posts" key={post._id}>
          <h2>{post.title}</h2>
          <p>Posted By: {post.author.username}</p>
          <h3>Item Description:<br/>{post.description}</h3>
          <h4>Asking Price: {post.price}</h4>
          <p>Location: {post.location}</p>
          {post.willDeliver === false || null ? (
            <p>{"Will NOT Deliver"}</p>
          ) : (
            <p>{"Will Deliver"}</p>
          )}
          {post.isAuthor && isLoggedIn && (
            <>
              <button onClick={() => handleUpdate(post)}>Update</button>
              <button onClick={() => handleDelete(post._id)}>Delete</button>
            </>
          )}
          <br/>
        </div>
      ))}
    </div>
  );
};

export default PostList;
