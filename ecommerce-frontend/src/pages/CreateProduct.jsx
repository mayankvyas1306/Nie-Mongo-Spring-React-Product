import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProductForm from "./ProductForm";
import "./CreateProduct.css"; // A new CSS file for consistent layout

function CreateProduct() {
  const navigate = useNavigate();

  const handleCreate = async (productData) => {
    // A simple client-side validation check
    if (!productData.name || !productData.price || !productData.category) {
        toast.error("Please fill in at least Name, Price, and Category.");
        return;
    }

    // Use toast.promise for a great UX during form submission
    toast.promise(
      axios.post("http://localhost:8080/products", productData),
      {
        pending: 'Creating new product...',
        success: {
          render() {
            navigate("/products");
            return 'Product created successfully!';
          }
        },
        error: 'Failed to create product. Please try again.'
      }
    );
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="page-header">
          <h1>Add a New Product</h1>
          <p>Fill in the details below to add a new item to the inventory.</p>
        </div>
        {/* The ProductForm will be rendered here */}
        <ProductForm onSubmit={handleCreate} isEditing={false} />
      </div>
    </div>
  );
}

export default CreateProduct;