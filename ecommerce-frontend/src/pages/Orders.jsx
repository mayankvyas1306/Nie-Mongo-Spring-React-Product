import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Orders.css"; // Import the new CSS file

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8080/orders/user/${userId}`)
        .then((res) => {
          // Sort orders by date, newest first (assuming createdAt exists)
          const sortedOrders = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setOrders(sortedOrders);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to fetch your orders.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [userId]);

  const getStatusClass = (status) => {
    switch (status.toUpperCase()) {
      case 'PENDING': return 'status-pending';
      case 'SHIPPED': return 'status-shipped';
      case 'DELIVERED': return 'status-delivered';
      case 'CANCELLED': return 'status-cancelled';
      default: return 'status-default';
    }
  };
  
  if (isLoading) {
    return (
      <div className="page-container status-message">
        <h4>Loading your orders...</h4>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="page-container status-message">
        <h3>Please Log In</h3>
        <p>You need to be logged in to view your order history.</p>
        <Link to="/login" className="btn btn-primary">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="page-header">
          <h1>My Orders</h1>
        </div>
        
        {orders.length === 0 ? (
          <div className="no-orders-message">
            <h3>You haven't placed any orders yet.</h3>
            <p>Explore our products and place your first order!</p>
            <Link to="/products" className="btn btn-primary">Browse Products</Link>
          </div>
        ) : (
          <div className="orders-grid">
            {orders.map((order) => (
              <div className="order-card" key={order.orderId}>
                <div className="order-card-header">
                  <div className="order-id">
                    <span>Order</span>
                    <h3>#{order.orderId.split('-')[0]}...</h3>
                  </div>
                  <div className={`order-status ${getStatusClass(order.status)}`}>
                    {order.status}
                  </div>
                </div>
                <div className="order-card-body">
                  <div className="order-detail">
                    <span>Total Amount</span>
                    <p>₹{order.totalAmount.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="order-detail">
                    <span>Order Placed</span>
                    <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="order-card-footer">
                  <Link to={`/orders/${order.orderId}`} className="btn btn-secondary">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;