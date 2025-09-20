import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProductForm from "./ProductForm";
import "./EditProduct.css"; // We'll add a CSS file for consistency

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load product data.");
        navigate("/products"); // Redirect if product can't be loaded
      });
  }, [id, navigate]);

  const handleUpdate = async (updatedProduct) => {
    // Using toast.promise gives instant feedback for pending, success, and error states
    toast.promise(
      axios.put(`http://localhost:8080/products/${id}`, updatedProduct),
      {
        pending: 'Updating product...',
        success: {
          render() {
            // Navigate away only after the toast is successful
            navigate("/products");
            return 'Product updated successfully!';
          }
        },
        error: 'Failed to update product.'
      }
    );
  };

  if (!product) {
    return (
      <div className="page-container status-message">
        <h4>Loading product data...</h4>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="page-header">
          <h1>Edit "{product.name}"</h1>
        </div>
        {/* The ProductForm will be rendered here */}
        <ProductForm initialData={product} onSubmit={handleUpdate} isEditing={true} />
      </div>
    </div>
  );
}

export default EditProduct;