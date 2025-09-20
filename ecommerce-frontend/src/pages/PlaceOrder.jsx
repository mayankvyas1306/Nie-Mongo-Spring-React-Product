import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./PlaceOrder.css"; // Import the new CSS file

function PlaceOrder() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [items, setItems] = useState([{ productId: "", quantity: 1 }]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  // Fetch products for the dropdown
  useEffect(() => {
    axios
      .get("http://localhost:8080/products")
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error("Failed to load products", err);
        toast.error("Failed to load products for ordering.");
      });
  }, []);

  // Calculate the grand total whenever items or products change
  useEffect(() => {
    const newTotal = items
      .filter((i) => i.productId)
      .reduce((sum, currentItem) => {
        const product = products.find((p) => p.id === currentItem.productId);
        const price = product ? product.price : 0;
        return sum + price * currentItem.quantity;
      }, 0);
    setTotal(newTotal);
  }, [items, products]);

  const handleChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = field === 'quantity' ? parseInt(value, 10) : value;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { productId: "", quantity: 1 }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validItems = items.filter(i => i.productId && i.quantity > 0);
    if (validItems.length === 0) {
      toast.warn("Please add at least one product to the order.");
      return;
    }

    toast.promise(
      axios.post("http://localhost:8080/orders", { userId, items: validItems }),
      {
        pending: 'Placing your order...',
        success: {
          render() {
            navigate("/orders");
            return 'Order placed successfully!';
          },
        },
        error: 'Failed to place order. Please try again.'
      }
    );
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="page-header">
          <h1>🛒 Place a New Order</h1>
        </div>

        <form onSubmit={handleSubmit} className="order-form">
          <div className="order-items-list">
            {items.map((item, index) => (
              <div className="order-item-row" key={index}>
                <div className="form-group product-select">
                  <label>Product</label>
                  <select value={item.productId} onChange={(e) => handleChange(index, "productId", e.target.value)} required >
                    <option value="">-- Select a Product --</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} (₹{p.price})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group quantity-input">
                  <label>Quantity</label>
                  <input type="number" value={item.quantity} min="1" onChange={(e) => handleChange(index, "quantity", e.target.value)} required />
                </div>
                {items.length > 1 && (
                  <button type="button" className="btn-remove-item" onClick={() => removeItem(index)}>
                    &times;
                  </button>
                )}
              </div>
            ))}
          </div>

          <button type="button" className="btn-add-item" onClick={addItem}>
            ➕ Add Another Product
          </button>

          <div className="order-summary-card">
            <h3>Order Summary</h3>
            {items.filter((i) => i.productId).length === 0 ? (
              <p className="empty-summary">Your summary will appear here once you add products.</p>
            ) : (
              <>
                <div className="summary-list">
                  {items.filter((i) => i.productId).map((i, idx) => {
                    const product = products.find((p) => p.id === i.productId);
                    return (
                      <div className="summary-item" key={idx}>
                        <span>{product ? product.name : "Unknown"} × {i.quantity}</span>
                        <strong>₹{(product ? product.price * i.quantity : 0).toLocaleString('en-IN')}</strong>
                      </div>
                    );
                  })}
                </div>
                <div className="summary-total">
                  <span>Grand Total</span>
                  <strong>₹{total.toLocaleString('en-IN')}</strong>
                </div>
              </>
            )}
          </div>

          <button type="submit" className="btn btn-primary btn-submit-order">
            ✅ Confirm & Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default PlaceOrder;