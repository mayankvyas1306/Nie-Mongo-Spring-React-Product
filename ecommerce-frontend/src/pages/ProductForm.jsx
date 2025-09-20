import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ProductForm.css"; // Import the new, final stylesheet

function ProductForm({ initialData = {}, onSubmit, isEditing }) {
  const [product, setProduct] = useState({
    name: initialData.name || "",
    description: initialData.description || "",
    category: initialData.category || "",
    price: initialData.price || "",
    stock: initialData.stock || "",
    tags: initialData.tags || [],
  });
  const [tagInput, setTagInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() !== "" && !product.tags.includes(tagInput.trim())) {
      setProduct(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setProduct(prev => ({ ...prev, tags: prev.tags.filter((tag) => tag !== tagToRemove) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare data for submission
    const productData = {
      ...product,
      price: parseFloat(product.price) || 0,
      stock: parseInt(product.stock, 10) || 0,
    };
    onSubmit(productData);
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      {/* Name Input */}
      <div className="form-group">
        <label className="form-label" htmlFor="name">Product Name *</label>
        <input id="name" name="name" type="text" className="form-input" value={product.name} onChange={handleChange} required />
      </div>

      {/* Description Input */}
      <div className="form-group">
        <label className="form-label" htmlFor="description">Description</label>
        <textarea id="description" name="description" className="form-textarea" value={product.description} onChange={handleChange} />
      </div>

      {/* Category, Price, and Stock in a grid layout */}
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label" htmlFor="category">Category *</label>
          <input id="category" name="category" type="text" className="form-input" value={product.category} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="price">Price (₹) *</label>
          <input id="price" name="price" type="number" className="form-input" value={product.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="stock">Stock *</label>
          <input id="stock" name="stock" type="number" className="form-input" value={product.stock} onChange={handleChange} required />
        </div>
      </div>

      {/* Tags Input */}
      <div className="form-group">
        <label className="form-label">Tags</label>
        <div className="tag-input-wrapper">
          <input type="text" className="form-input" value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="e.g., electronics, featured" />
          <button className="btn btn-secondary" onClick={handleAddTag}>Add</button>
        </div>
        <div className="tag-list">
          {product.tags.map((tag, i) => (
            <div key={i} className="tag-item">
              {tag}
              <button type="button" className="remove-tag-btn" onClick={() => handleRemoveTag(tag)}> &times; </button>
            </div>
          ))}
        </div>
      </div>

      {/* Form Actions */}
      <div className="form-actions">
        <Link to="/products" className="btn btn-secondary">Cancel</Link>
        <button type="submit" className="btn btn-primary">
          {isEditing ? "Update Product" : "Save Product"}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;