import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleUpdate = async (updatedProduct) => {
    try {
      await axios.put(`http://localhost:8080/products/${id}`, updatedProduct);
      alert("Product updated successfully!");
      navigate("/products");
    } catch (err) {
      console.error(err);
      alert("Failed to update product");
    }
  };

  if (!product) return <p>Loading...</p>;

  return <ProductForm initialData={product} onSubmit={handleUpdate} />;
}

export default EditProduct;