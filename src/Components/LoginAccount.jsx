import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { accountLogin } from "../API";

const LoginAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const submitInformation = async (e) => {
    e.preventDefault();
    await accountLogin(username, password);
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/posts");
    } else {
      console.log("Invalid Login, Try Again");
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div className="Login">
      <h2>Login</h2>
      <form onSubmit={submitInformation}>
        <input
          placeholder="Username"
          value={username}
          onChange={handleUsername}
        ></input>
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={handlePassword}
        ></input>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default LoginAccount;
