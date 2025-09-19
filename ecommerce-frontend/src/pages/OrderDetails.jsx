import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios
      .get(`http://localhost:8080/orders/user/${userId}`)
      .then((res) => {
        const found = res.data.find((o) => String(o.orderId) === id);
        setOrder(found);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load order details");
      });
  }, [id]);

  if (!order) return <h4 className="text-center mt-4">Loading...</h4>;

  return (
    <div className="col-md-10 mx-auto">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Invoice</h2>

        {/* Order Info */}
        <div className="mb-3">
          <p><strong>Order ID:</strong> {order.orderId}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        </div>

        {/* Items Table */}
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price (₹)</th>
              <th>Subtotal (₹)</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.quantity * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total Section */}
        <div className="text-end">
          <h5 className="mt-3">
            <strong>Total Amount: ₹{order.totalAmount}</strong>
          </h5>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;