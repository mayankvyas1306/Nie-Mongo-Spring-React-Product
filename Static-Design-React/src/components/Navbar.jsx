import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    MyApp
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link">
                                Profile
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link">
                                Products
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link">Place Order</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link">My Orders</Link>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <span className="navbar-text text-light me-3">
                                👤 <b>Akshay Rao</b>
                            </span>
                        </li>
                        <li className="nav-item">
                            <button
                                className="btn btn-danger btn-sm"
                            >
                                Logout
                            </button>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">
                                Signup
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;