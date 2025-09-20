import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Ensure this CSS file is linked

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:8080/users`);
      const user = res.data.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        alert(`Logged in as ${user.username}`);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("username", user.username);
        setEmail("");
        setPassword("");
        navigate("/profile");
      } else {
        alert("Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Sign In</h2>
          <p>Welcome back, please enter your details.</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
        <p className="signup-link">
          Don’t have an account? <a href="/signup">Sign up now</a>
        </p>
      </div>
    </div>
  );
}

export default Login;