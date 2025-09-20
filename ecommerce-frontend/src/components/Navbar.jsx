import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Using the updated CSS file

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    setUser(storedUser);
    const handleStorageChange = () => {
      setUser(localStorage.getItem("username"));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    setUser(null);
    setIsMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container ">
        <Link className="navbar-brand" to={user ? "/profile" : "/"} onClick={closeMenu}>
          E-com
        </Link>

        <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className={isMenuOpen ? "hamburger open" : "hamburger"}></div>
        </div>

        <ul className={isMenuOpen ? "nav-menu active" : "nav-menu"}>
          {user ? (
            <>
              {/* Main navigation links */}
              <div className="main-nav-links">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile" onClick={closeMenu}>Profile</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/products" onClick={closeMenu}>Products</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/place-order" onClick={closeMenu}>Place Order</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/orders" onClick={closeMenu}>My Orders</NavLink>
                </li>
              </div>

              {/* User actions, pushed to the right */}
              <div className="user-nav-actions">
                <li className="nav-item user-info">
                  <span className="user-name">👤 {user}</span>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="logout-btn">Logout</button>
                </li>
              </div>
            </>
          ) : (
            <>
              {/* Logged-out Links, pushed to the right */}
              <div className="logged-out-links">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/" onClick={closeMenu}>Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link cta" to="/signup" onClick={closeMenu}>Sign Up</NavLink>
                </li>
              </div>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;