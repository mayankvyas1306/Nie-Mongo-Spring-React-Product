import React, { useState, useEffect } from "react";

function ProductForm({ initialData = {}, onSubmit }) {
  const [name, setName] = useState(initialData.name || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [category, setCategory] = useState(initialData.category || "");
  const [price, setPrice] = useState(initialData.price || "");
  const [stock, setStock] = useState(initialData.stock || "");
  const [tags, setTags] = useState(initialData.tags || []);
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      name,
      description,
      category,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      tags,
    };
    onSubmit(productData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
      <h4 className="mb-3">{initialData.id ? "Edit Product" : "Add Product"}</h4>

      <div className="mb-3">
        <label className="form-label">Name</label>
        <input type="text" className="form-control" value={name}
          onChange={(e) => setName(e.target.value)} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea className="form-control" value={description}
          onChange={(e) => setDescription(e.target.value)} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Category</label>
        <input type="text" className="form-control" value={category}
          onChange={(e) => setCategory(e.target.value)} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Price</label>
        <input type="number" className="form-control" value={price}
          onChange={(e) => setPrice(e.target.value)} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Stock</label>
        <input type="number" className="form-control" value={stock}
          onChange={(e) => setStock(e.target.value)} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Tags</label>
        <div className="d-flex">
          <input type="text" className="form-control me-2"
            value={tagInput} onChange={(e) => setTagInput(e.target.value)}
            placeholder="Type a tag and press Add" />
          <button className="btn btn-secondary" onClick={handleAddTag}>Add</button>
        </div>
        <div className="mt-2">
          {tags.map((tag, i) => (
            <span key={i} className="badge bg-info me-2">
              {tag}
              <button type="button" className="btn-close btn-close-white btn-sm ms-2"
                onClick={() => handleRemoveTag(tag)}></button>
            </span>
          ))}
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-100">
        {initialData.id ? "Update Product" : "Save Product"}
      </button>
    </form>
  );
}

export default ProductForm;