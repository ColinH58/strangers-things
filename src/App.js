import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateAccount, LoginAccount, Profile, PostList, Navbar, PostForm } from "./Components"
import './index.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Navbar />
        <Routes>
          <Route path="/posts" element={<PostList />} />
          <Route path="/login" element={<LoginAccount />} />
          <Route path="/register" element={<CreateAccount />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/postform" element={<PostForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
