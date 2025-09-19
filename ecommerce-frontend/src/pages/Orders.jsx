import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8080/orders/user/${userId}`)
        .then((res) => setOrders(res.data))
        .catch((err) => {
          console.error(err);
          alert("Failed to fetch orders");
        });
    }
  }, [userId]);

  if (!userId) {
    return <h4 className="text-center mt-4">Please login to view orders</h4>;
  }

  return (
    <div>
      <h2 className="mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div className="col-md-4 mb-3" key={order.orderId}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Order #{order.orderId}</h5>
                  <p>
                    <strong>Status:</strong> {order.status}
                  </p>
                  <p>
                    <strong>Total:</strong> ₹{order.totalAmount}
                  </p>
                  <Link
                    to={`/orders/${order.orderId}`}
                    className="btn btn-primary btn-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;