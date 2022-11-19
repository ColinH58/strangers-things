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
    //only change
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
    <div>
      <div>
        Search:
        <input
          value={filterVal}
          type="text"
          onChange={(e) => setFilterVal(e.target.value)}
        />
      </div>
      {isLoggedIn && (
        <div>
          <button onClick={() => handleCreate()}>Add New Form</button>
        </div>
      )}
      {filterPosts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <h3>{post.author.username}</h3>
          <h3>{post.description}</h3>
          <h4>{post.price}</h4>
          <p>{post.location}</p>
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
        </div>
      ))}
    </div>
  );
};

export default PostList;
