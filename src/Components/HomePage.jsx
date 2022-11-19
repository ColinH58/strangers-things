import React from "react";
import PostList from "./PostList";

const HomePage = () => {
  return (
    <div className="Homepage">
      <h1>Welcome to Stranger's Things™️</h1>
      <h3>Please create an account or login</h3>
      <hr />
      <br />
      <PostList />
    </div>
  );
};

export default HomePage;
