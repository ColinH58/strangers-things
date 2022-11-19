import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  CreateAccount,
  LoginAccount,
  Profile,
  PostList,
  Navbar,
  PostForm,
  HomePage,
} from "./Components";
import "./index.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/login" element={<LoginAccount />} />
        <Route path="/register" element={<CreateAccount />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/postform" element={<PostForm />} />
      </Routes>
    </div>
  );
}

export default App;
