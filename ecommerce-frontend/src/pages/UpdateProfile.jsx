import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./UpdateProfile.css"; // Import the new CSS file

function UpdateProfile() {
  const [formData, setFormData] = useState({
    street: "",
    landmark: "",
    city: "",
    pincode: "",
    additionalInfo: "",
  });
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }
    axios.get(`http://localhost:8080/users/${userId}`)
      .then((res) => {
        const profile = res.data.profile || {};
        setFormData({
          street: profile.street || "",
          landmark: profile.landmark || "",
          city: profile.city || "",
          pincode: profile.pincode || "",
          additionalInfo: profile.additionalInfo || "",
        });
      })
      .catch((err) => {
        console.error("Failed to load profile for editing:", err);
        alert("Failed to load your profile data.");
      })
      .finally(() => {
        setIsLoading(false); // Stop loading once data is fetched or fails
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { street, city, pincode } = formData;
    if (!street || !city || !pincode) {
      alert("Street, City, and Pincode are required");
      return;
    }

    try {
      const userRes = await axios.get(`http://localhost:8080/users/${userId}`);
      const updatedUser = {
        ...userRes.data,
        profile: { ...formData },
      };

      await axios.put(`http://localhost:8080/users/${userId}`, updatedUser);
      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <div className="update-profile-container status-message">
        <h4>Loading form...</h4>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="update-profile-container status-message">
        <h3>Please log in to update your profile.</h3>
        <Link to="/login" className="btn btn-primary">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="update-profile-container">
      <div className="update-profile-card">
        <div className="form-header">
          <h2>Update Your Profile</h2>
          <p>Make sure your address details are correct.</p>
        </div>
        <form onSubmit={handleUpdate}>
          <div className="input-group">
            <label htmlFor="street">Street *</label>
            <input id="street" name="street" type="text" value={formData.street} onChange={handleChange} placeholder="e.g., 123 Main St" />
          </div>
          <div className="input-group">
            <label htmlFor="landmark">Landmark</label>
            <input id="landmark" name="landmark" type="text" value={formData.landmark} onChange={handleChange} placeholder="e.g., Near City Park" />
          </div>
          <div className="input-group">
            <label htmlFor="city">City *</label>
            <input id="city" name="city" type="text" value={formData.city} onChange={handleChange} placeholder="e.g., Bangalore" />
          </div>
          <div className="input-group">
            <label htmlFor="pincode">Pincode *</label>
            <input id="pincode" name="pincode" type="text" value={formData.pincode} onChange={handleChange} placeholder="e.g., 560001" />
          </div>
          <div className="input-group">
            <label htmlFor="additionalInfo">Additional Info</label>
            <textarea id="additionalInfo" name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} placeholder="e.g., Flat number, floor, etc." />
          </div>
          <div className="form-actions">
            <Link to="/profile" className="btn btn-secondary">Cancel</Link>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;