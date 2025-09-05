import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [product, setProduct] = useState({ name: "", price: "" });
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", price: "" });
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState("");

  const loadProducts = () => {
    axios
      .get("http://localhost:2052/api/products")
      .then((res) => setProducts(res.data))
      .catch(() => console.error("Error fetching products"));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:2052/api/products", product);
      alert("Product added successfully!");
      setProduct({ name: "", price: "" });
      loadProducts();
    } catch (err) {
      alert("Error adding product.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:2052/api/products/${id}`);
        loadProducts();
        alert("Product deleted successfully!");
      } catch (err) {
        alert("Error deleting product.");
      }
    }
  };

  const startEdit = (product) => {
    setEditId(product.id);
    setEditData({ name: product.name, price: product.price });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    try {
      await axios.put(`http://localhost:2052/api/products/${editId}`, editData);
      setEditId(null);
      setEditData({ name: "", price: "" });
      loadProducts();
      alert("Product updated successfully!");
    } catch (err) {
      alert("Error updating product.");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:2052/api/products/${searchId}`);
      setSearchResult(res.data);
      setSearchError("");
    } catch (err) {
      setSearchError("Product not found");
      setSearchResult(null);
    }
  };

  const containerStyle = {
    maxWidth: "800px",
    margin: "20px auto",
    padding: "20px"
  };

  const sectionStyle = {
    backgroundColor: "#f0f0f0",
    padding: "20px",
    margin: "20px 0",
    border: "1px solid #ccc"
  };

  const formStyle = {
    display: "flex",
    gap: "10px",
    alignItems: "end",
    flexWrap: "wrap"
  };

  const inputStyle = {
    padding: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    minWidth: "150px"
  };

  const buttonStyle = {
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer"
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    border: "1px solid #ccc"
  };

  const thStyle = {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px",
    textAlign: "center"
  };

  const tdStyle = {
    padding: "8px",
    borderBottom: "1px solid #ccc",
    textAlign: "center",
    color: "black"
  };

  const actionButtonStyle = {
    padding: "4px 8px",
    margin: "0 2px",
    border: "none",
    cursor: "pointer",
    fontSize: "12px"
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "white" }}>
        Product Management System
      </h1>

      {/* Add Product Section */}
      <div style={sectionStyle}>
        <h2 style={{ marginBottom: "20px", color: "black" }}>Add New Product</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            style={inputStyle}
            required
          />
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            style={inputStyle}
            required
          />
          <button type="submit" style={buttonStyle}>
            Add Product
          </button>
        </form>
      </div>

      {/* Search Product Section */}
      <div style={sectionStyle}>
        <h2 style={{ marginBottom: "20px", color: "black" }}>Find Product by ID</h2>
        <form onSubmit={handleSearch} style={formStyle}>
          <input
            type="number"
            placeholder="Enter Product ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            style={inputStyle}
            required
          />
          <button type="submit" style={buttonStyle}>
            Search
          </button>
        </form>
        
        {searchError && (
          <div style={{ 
            color: "red", 
            backgroundColor: "#f0f0f0", 
            padding: "10px", 
            marginTop: "10px",
            border: "1px solid #ccc"
          }}>
            {searchError}
          </div>
        )}

        {searchResult && (
          <div style={{ 
            backgroundColor: "#f0f0f0", 
            padding: "15px", 
            marginTop: "15px",
            border: "1px solid #ccc"
          }}>
            <h3 style={{ margin: "0 0 10px 0", color: "black" }}>Product Found</h3>
            <p><strong>ID:</strong> {searchResult.id}</p>
            <p><strong>Name:</strong> {searchResult.name}</p>
            <p><strong>Price:</strong> ${searchResult.price}</p>
          </div>
        )}
      </div>

      {/* View All Products Section */}
      <div style={sectionStyle}>
        <h2 style={{ marginBottom: "20px", color: "black" }}>All Products</h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td style={tdStyle}>{p.id}</td>
                <td style={tdStyle}>
                  {editId === p.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleEditChange}
                      style={{...inputStyle, minWidth: "120px", padding: "4px"}}
                    />
                  ) : (
                    p.name
                  )}
                </td>
                <td style={tdStyle}>
                  {editId === p.id ? (
                    <input
                      type="number"
                      name="price"
                      value={editData.price}
                      onChange={handleEditChange}
                      style={{...inputStyle, minWidth: "80px", padding: "4px"}}
                    />
                  ) : (
                    `$${p.price}`
                  )}
                </td>
                <td style={tdStyle}>
                  {editId === p.id ? (
                    <>
                      <button 
                        onClick={saveEdit} 
                        style={{...actionButtonStyle, backgroundColor: "#007bff", color: "white"}}
                      >
                        Save
                      </button>
                      <button 
                        onClick={() => setEditId(null)} 
                        style={{...actionButtonStyle, backgroundColor: "#ccc", color: "black"}}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => startEdit(p)} 
                        style={{...actionButtonStyle, backgroundColor: "#007bff", color: "white"}}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(p.id)} 
                        style={{...actionButtonStyle, backgroundColor: "#ccc", color: "black"}}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            No products found. Add your first product above!
          </p>
        )}
      </div>
    </div>
  );
}
