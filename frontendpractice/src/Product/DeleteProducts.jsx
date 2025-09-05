import { useState } from "react";
import axios from "axios";

export default function DeleteProducts() {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:2052/api/products/${id}`);
      setMessage(`Product with ID ${id} deleted successfully.`);
      setId("");
    } catch (err) {
      setMessage("Error deleting product. Please check the ID.");
    }
  };

  return (
    <form
      onSubmit={handleDelete}
      style={{ maxWidth: "400px", margin: "20px auto", textAlign: "center" }}
    >
      <h2>Delete Product</h2>
      <input
        type="number"
        placeholder="Enter Product ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        style={{ margin: "10px", padding: "8px" }}
        required
      />
      <button
        type="submit"
        style={{
          padding: "8px 16px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Delete
      </button>
      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </form>
  );
}
