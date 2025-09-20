import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Profile.css"; // Import the new CSS file

function Profile() {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8080/users/${userId}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.error("Failed to load profile:", err);
          alert("Failed to load profile");
        });
    }
  }, [userId]);

  // A helper to get the profile object safely
  const profile = user?.profile || {};

  // Display a message if the user is not logged in
  if (!userId) {
    return (
      <div className="profile-container status-message">
        <h3>Please log in to view your profile.</h3>
        <Link to="/login" className="edit-profile-btn">Go to Login</Link>
      </div>
    );
  }

  // Display a loading state while fetching data
  if (!user) {
    return (
      <div className="profile-container status-message">
        <h4>Loading profile...</h4>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="avatar-placeholder">
            <span>{user.username ? user.username.charAt(0).toUpperCase() : "U"}</span>
          </div>
          <div className="user-info">
            <h2>{user.username || "N/A"}</h2>
            <p>{user.email || "N/A"}</p>
          </div>
        </div>

        {/* Profile Body */}
        <div className="profile-body">
          {/* Basic Details Section */}
          <div className="detail-section">
            <h3>Basic Details</h3>
            <div className="detail-item">
              <span>Phone</span>
              <p>{user.phone || "Not provided"}</p>
            </div>
          </div>

          {/* Address Details Section */}
          <div className="detail-section">
            <h3>Address</h3>
            <div className="detail-item">
              <span>Street</span>
              <p>{profile.street || "Not provided"}</p>
            </div>
            <div className="detail-item">
              <span>City</span>
              <p>{profile.city || "Not provided"}</p>
            </div>
             <div className="detail-item">
              <span>Landmark</span>
              <p>{profile.landmark || "Not provided"}</p>
            </div>
            <div className="detail-item">
              <span>Pincode</span>
              <p>{profile.pincode || "Not provided"}</p>
            </div>
            <div className="detail-item">
              <span>Additional Info</span>
              <p>{profile.additionalInfo || "None"}</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="profile-actions">
          <Link to="/update-profile" className="edit-profile-btn">
            ✏️ Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;