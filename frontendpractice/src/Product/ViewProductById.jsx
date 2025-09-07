import { useState } from "react";
import axios from "axios";

export default function ViewProductById() {
  const [id, setId] = useState("");
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:2052/api/products/${id}`);
      setProduct(res.data);
      setError("");
    } catch (err) {
      setError("Product not found or error fetching product.");
      setProduct(null);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Find Product by ID</h2>
      <form onSubmit={handleSearch}>
        <input
          type="number"
          placeholder="Enter Product ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={{ margin: "10px", padding: "8px" }}
          required
        />
        <button type="submit" style={{ padding: "8px 16px" }}>
          Search
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {product && (
        <div style={{ marginTop: "20px" }}>
          <h3>Product Details</h3>
          <p><b>ID:</b> {product.id}</p>
          <p><b>Name:</b> {product.name}</p>
          <p><b>Price:</b> ${product.price}</p>
        </div>
      )}
    </div>
  );
}
