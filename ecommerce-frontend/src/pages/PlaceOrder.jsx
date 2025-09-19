import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PlaceOrder() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [items, setItems] = useState([{ productId: "", quantity: 1 }]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // ✅ Fetch products for dropdown
    axios
      .get("http://localhost:8080/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to load products", err));
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { productId: "", quantity: 1 }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderRequest = { userId, items };
      await axios.post("http://localhost:8080/orders", orderRequest);
      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  return (
    <div className="col-md-8 mx-auto">
      <h2 className="mb-4 text-center">🛒 Place Order</h2>
      <form onSubmit={handleSubmit}>
        {items.map((item, index) => (
          <div className="card shadow-sm p-3 mb-3" key={index}>
            <div className="row align-items-end">
              <div className="col-md-6 mb-3">
                <label className="form-label">Product</label>
                <select
                  className="form-select"
                  value={item.productId}
                  onChange={(e) =>
                    handleChange(index, "productId", e.target.value)
                  }
                  required
                >
                  <option value="">-- Select Product --</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (₹{p.price})
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  value={item.quantity}
                  min="1"
                  onChange={(e) =>
                    handleChange(index, "quantity", e.target.value)
                  }
                  required
                />
              </div>
              <div className="col-md-2 mb-3 text-end">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => removeItem(index)}
                >
                  ✖
                </button>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-outline-secondary mb-3"
          onClick={addItem}
        >
          ➕ Add Another Product
        </button>

        {/* ✅ Cart Preview */}
        <h4 className="mt-4">Order Summary</h4>
        {items.filter((i) => i.productId).length === 0 ? (
          <p className="text-muted">No items added yet.</p>
        ) : (
          <ul className="list-group mb-3">
            {items
              .filter((i) => i.productId)
              .map((i, idx) => {
                const product = products.find((p) => p.id === i.productId);
                return (
                  <li
                    key={idx}
                    className="list-group-item d-flex justify-content-between"
                  >
                    <span>
                      {product ? product.name : "Unknown"} × {i.quantity}
                    </span>
                    <strong>
                      ₹{product ? product.price * i.quantity : 0}
                    </strong>
                  </li>
                );
              })}
          </ul>
        )}

        <button type="submit" className="btn btn-success w-100">
          ✅ Confirm & Place Order
        </button>
      </form>
    </div>
  );
}

export default PlaceOrder;