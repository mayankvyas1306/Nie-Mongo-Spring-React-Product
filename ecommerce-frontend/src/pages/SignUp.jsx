import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Signup.css"; // Import the new CSS file

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !phone) {
      toast.error("All fields are required");
      return;
    }

    toast.promise(
      axios.post("http://localhost:8080/users", {
        username,
        email,
        password,
        phone,
      }),
      {
        pending: 'Creating your account...',
        success: {
          render({ data }) {
            // After successful signup, navigate to the login page
            navigate("/");
            return `Account created for ${data.data.username}! Please log in.`;
          }
        },
        error: {
          render({ data }) {
            // Display specific error message from the backend if available
            return data.response?.data?.message || "Signup failed. Please try again.";
          }
        }
      }
    );
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create an Account</h2>
          <p>Join us to start managing your products and orders.</p>
        </div>
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Choose a username" required />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" required />
          </div>
          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone number" required />
          </div>
          <button type="submit" className="auth-button">Sign Up</button>
        </form>
        <p className="auth-link">
          Already have an account? <Link to="/">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;