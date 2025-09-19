import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8080/users/${userId}`)
        .then((res) => {
          const profile = res.data.profile || {};
          setStreet(profile.street || "");
          setLandmark(profile.landmark || "");
          setCity(profile.city || "");
          setPincode(profile.pincode || "");
          setAdditionalInfo(profile.additionalInfo || "");
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to load profile");
        });
    }
  }, [userId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!street || !city || !pincode) {
      alert("Street, City, and Pincode are required");
      return;
    }

    try {
      const userRes = await axios.get(`http://localhost:8080/users/${userId}`);
      const updatedUser = {
        ...userRes.data,
        profile: { street, landmark, city, pincode, additionalInfo },
      };

      await axios.put(`http://localhost:8080/users/${userId}`, updatedUser);
      alert("Profile updated successfully!");
      navigate("/profile"); // ✅ redirect back to profile page
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  if (!userId) {
    return <h3 className="text-center mt-4">Please login first</h3>;
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2 className="text-center mb-4">Update Profile</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label">Street</label>
            <input
              type="text"
              className="form-control"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Enter street"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Landmark</label>
            <input
              type="text"
              className="form-control"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              placeholder="Enter landmark"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Pincode</label>
            <input
              type="text"
              className="form-control"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Enter 6-digit pincode"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Additional Info</label>
            <textarea
              className="form-control"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Enter additional info"
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;