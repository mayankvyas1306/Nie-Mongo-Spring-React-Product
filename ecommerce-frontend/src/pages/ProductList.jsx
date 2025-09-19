import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load products");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:8080/products/${id}`);
        alert("Product deleted successfully");
        loadProducts();
      } catch (err) {
        console.error(err);
        alert("Failed to delete product");
      }
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Products</h2>
      <Link to="/products/create" className="btn btn-success mb-3">+ Add Product</Link>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price (₹)</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <Link to={`/products/view/${p.id}`} className="btn btn-info btn-sm me-2">View</Link>
                  <Link to={`/products/edit/${p.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                  <button onClick={() => handleDelete(p.id)} className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5" className="text-center">No products found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;