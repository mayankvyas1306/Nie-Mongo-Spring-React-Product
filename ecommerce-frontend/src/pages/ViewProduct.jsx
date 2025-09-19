import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function ViewProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Product Details</h4>
        </div>
        <div className="card-body">
          <p><strong>Name:</strong> {product.name}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> ₹{product.price}</p>
          <p><strong>Stock:</strong> {product.stock}</p>

          <p>
            <strong>Tags:</strong>{" "}
            {product.tags && product.tags.length > 0 ? (
              product.tags.map((tag, index) => (
                <span key={index} className="badge bg-info text-dark me-2">
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-muted">No tags</span>
            )}
          </p>

          <div className="mt-3">
            <Link to="/products" className="btn btn-secondary me-2">
              Back
            </Link>
            <Link to={`/edit/${product.id}`} className="btn btn-warning">
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;