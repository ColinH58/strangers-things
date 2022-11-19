import React, { useState, useEffect } from "react";
import { createNewPost, updatePost } from "../API";
import { useLocation } from "react-router-dom";

const PostForm = () => {
  const loc = useLocation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState("");

  useEffect(() => {
    const { state } = loc;
    if (state) {
      const { post } = state;
      const { title, description, price, location, willDeliver } = post;
      setTitle(title);
      setDescription(description);
      setPrice(price);
      setLocation(location);
      setWillDeliver(willDeliver);
    }
  }, [loc]);

  const handlePost = async (e) => {
    e.preventDefault();
    const postInfo = {
      post: {
        title: title,
        description: description,
        price: price,
        location: location,
        willDeliver: willDeliver,
      },
    };
    const { state } = loc;
    if (state?.updateStatus) {
      const { post } = state;
      // const { id } = post;
      await updatePost(postInfo, post._id);
    } else {
      await createNewPost(postInfo);
    }
    setTitle("");
    setDescription("");
    setPrice("");
    setLocation("");
    setWillDeliver("");
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDesc = (e) => {
    setDescription(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleDeliver = (e) => {
    setWillDeliver(e.target.value);
  };

  return (
    <div className="PostForm">
      <h1>Create a New Post</h1>
      <input
        placeholder="Enter your post title here..."
        value={title}
        onChange={handleTitle}
      ></input>
      <input
        placeholder="Describe what you're selling here..."
        value={description}
        onChange={handleDesc}
      ></input>
      <input
        placeholder="Enter your starting price here..."
        value={price}
        onChange={handlePrice}
      ></input>
      <input
        placeholder="Enter your location here..."
        value={location}
        onChange={handleLocation}
      ></input>
      <input
        placeholder="Are You Willing to Deliver?"
        value={willDeliver}
        onChange={handleDeliver}
      ></input>
      <button onClick={handlePost}>
        Submit
      </button>
    </div>
  );
};

export default PostForm;
