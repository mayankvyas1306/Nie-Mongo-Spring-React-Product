import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ProductList.css";
import { toast } from 'react-toastify'; // Import toast

function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      // Replaced alert with toast
      toast.error("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  // --- This is the new, improved handleDelete function ---
  const handleDelete = (id) => {
    // Custom Component for the confirmation toast
    const ConfirmDelete = ({ closeToast }) => (
      <div className="confirm-toast">
        <h6>Are you sure?</h6>
        <p>This action cannot be undone.</p>
        <div className="confirm-toast-buttons">
          <button
            className="btn btn-danger btn-sm"
            onClick={async () => {
              try {
                await axios.delete(`http://localhost:8080/products/${id}`);
                toast.success("Product deleted successfully");
                loadProducts(); // Refresh the list
              } catch (err) {
                console.error(err);
                toast.error("Failed to delete product");
              }
              closeToast(); // Close the confirmation toast
            }}
          >
            Yes, Delete
          </button>
          <button className="btn btn-secondary btn-sm" onClick={closeToast}>
            Cancel
          </button>
        </div>
      </div>
    );

    // Display the confirmation toast
    toast.warn(<ConfirmDelete />, {
      position: "top-center",
      autoClose: false, // Don't close automatically
      closeButton: false, // Hide the default close button
      closeOnClick: false,
      draggable: false,
    });
  };

  return (
    <div className="page-container">
        {/* The rest of your JSX remains the same... */}
        <div className="content-wrapper">
        <div className="page-header">
          <h1>Product Management</h1>
          <Link to="/products/create" className="btn btn-primary">+ Add Product</Link>
        </div>

        <div className="table-container">
          {isLoading ? (
            <div className="loading-message">Loading products...</div>
          ) : products.length > 0 ? (
            <table className="products-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price (₹)</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td data-label="Name">{p.name}</td>
                    <td data-label="Category">{p.category}</td>
                    <td data-label="Price">{p.price.toLocaleString('en-IN')}</td>
                    <td data-label="Stock">{p.stock}</td>
                    <td data-label="Actions">
                      <div className="action-buttons">
                        <Link to={`/products/view/${p.id}`} className="btn btn-secondary">👁️ View</Link>
                        <Link to={`/products/edit/${p.id}`} className="btn btn-warning">✏️ Edit</Link>
                        <button onClick={() => handleDelete(p.id)} className="btn btn-danger">🗑️ Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-products-message">
              <h3>No Products Found</h3>
              <p>Get started by adding a new product.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;