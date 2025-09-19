import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Welcome Back 👋</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control rounded-pill"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control rounded-pill"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 rounded-pill">
            Login
          </button>
        </form>
        <p className="text-center mt-3">
          Don’t have an account?{" "}
          <a href="/signup" className="text-decoration-none">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;