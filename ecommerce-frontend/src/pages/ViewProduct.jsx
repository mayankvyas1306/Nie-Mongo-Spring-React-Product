import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./ViewProduct.css"; // Import the new CSS file

function ViewProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:8080/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Could not load product details.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="page-container status-message">
        <h4>Loading Product...</h4>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="page-container status-message">
        <h3>Product Not Found</h3>
        <p>The product you are looking for does not exist.</p>
        <Link to="/products" className="btn btn-primary">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="page-header">
          <Link to="/products" className="btn btn-secondary">← Back to List</Link>
          <Link to={`/products/edit/${product.id}`} className="btn btn-warning">✏️ Edit Product</Link>
        </div>

        <div className="product-details-card">
          <div className="product-header">
            <h1>{product.name}</h1>
            <span className="product-category">{product.category}</span>
          </div>

          <div className="product-meta">
            <div className="meta-item">
              <span className="meta-label">Price</span>
              <p>₹{product.price.toLocaleString('en-IN')}</p>
            </div>
            <div className="meta-item">
              <span className="meta-label">Stock Available</span>
              <p>{product.stock}</p>
            </div>
          </div>

          <div className="product-section">
            <h3 className="section-title">Description</h3>
            <p className="product-description">{product.description || "No description available."}</p>
          </div>

          <div className="product-section">
            <h3 className="section-title">Tags</h3>
            <div className="product-tags">
              {product.tags && product.tags.length > 0 ? (
                product.tags.map((tag, index) => (
                  <span key={index} className="tag-badge">{tag}</span>
                ))
              ) : (
                <span className="no-tags">No tags</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;