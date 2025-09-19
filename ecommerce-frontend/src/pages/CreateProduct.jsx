import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";

function CreateProduct() {
  const navigate = useNavigate();

  const handleCreate = async (productData) => {
    try {
      await axios.post("http://localhost:8080/products", productData);
      alert("Product created successfully!");
      navigate("/products");
    } catch (err) {
      console.error(err);
      alert("Failed to create product");
    }
  };

  return <ProductForm onSubmit={handleCreate} />;
}

export default CreateProduct;