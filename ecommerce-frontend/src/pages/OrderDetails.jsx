import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./OrderDetails.css"; // Import the new CSS file

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      axios
        .get(`http://localhost:8080/orders/user/${userId}`)
        .then((res) => {
          const foundOrder = res.data.find((o) => String(o.orderId) === id);
          setOrder(foundOrder);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to load order details.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
        setIsLoading(false);
    }
  }, [id]);

  const getStatusClass = (status) => {
    if (!status) return 'status-default';
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
        <h4>Loading Order Details...</h4>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="page-container status-message">
        <h3>Order Not Found</h3>
        <Link to="/orders" className="btn btn-primary">Back to My Orders</Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="page-header">
            <Link to="/orders" className="btn btn-secondary">← Back to My Orders</Link>
        </div>
        
        <div className="invoice-card">
          <div className="invoice-header">
            <div>
              <h1>Invoice</h1>
              <p>Order #{order.orderId}</p>
            </div>
            <div className={`order-status ${getStatusClass(order.status)}`}>
              {order.status}
            </div>
          </div>
          
          <div className="invoice-meta">
              <div>
                  <span>Date Issued</span>
                  <p>{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                  <span>Total Amount</span>
                  <p className="total-prominent">₹{order.totalAmount.toLocaleString('en-IN')}</p>
              </div>
          </div>

          <div className="invoice-table-container">
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td data-label="#">{index + 1}</td>
                    <td data-label="Product">{item.productName}</td>
                    <td data-label="Quantity">{item.quantity}</td>
                    <td data-label="Unit Price">₹{item.price.toLocaleString('en-IN')}</td>
                    <td data-label="Subtotal">₹{(item.quantity * item.price).toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="invoice-totals">
              <div className="total-row grand-total">
                  <span>Grand Total</span>
                  <span>₹{order.totalAmount.toLocaleString('en-IN')}</span>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;