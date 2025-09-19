import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8080/users/${userId}`)
        .then((res) => {
          setUser(res.data);          // full user
          setProfile(res.data.profile || {}); // nested profile
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to load profile");
        });
    }
  }, [userId]);

  if (!userId) {
    return <h3 className="text-center mt-4">Please login first</h3>;
  }

  if (!user || !profile) {
    return <h4 className="text-center mt-4">Loading profile...</h4>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">My Profile</h2>

      <div className="row">
        {/* Basic Details */}
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Basic Details</h5>
            </div>
            <div className="card-body">
              <p><strong>Name:</strong> {user.username || "N/A"}</p>
              <p><strong>Email:</strong> {user.email || "N/A"}</p>
              <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Address Details */}
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-secondary text-white">
              <h5 className="mb-0">Address Details</h5>
            </div>
            <div className="card-body">
              <p><strong>Street:</strong> {profile.street || "N/A"}</p>
              <p><strong>Landmark:</strong> {profile.landmark || "N/A"}</p>
              <p><strong>City:</strong> {profile.city || "N/A"}</p>
              <p><strong>Pincode:</strong> {profile.pincode || "N/A"}</p>
              <p><strong>Additional Info:</strong> {profile.additionalInfo || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Button */}
      <div className="text-center mt-3">
        <Link to="/update-profile" className="btn btn-warning">
          ✏️ Edit Profile
        </Link>
      </div>
    </div>
  );
}

export default Profile;