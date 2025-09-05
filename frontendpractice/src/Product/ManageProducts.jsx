import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", price: "" });

  const loadProducts = () => {
    axios
      .get("http://localhost:2052/api/products")
      .then((res) => setProducts(res.data))
      .catch(() => console.error("Error fetching products"));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2052/api/products/${id}`);
      loadProducts();
    } catch (err) {
      console.error("Error deleting product", err);
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
    } catch (err) {
      console.error("Error updating product", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Products</h2>
      <table border="1" cellPadding="8" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>
                {editId === p.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                  />
                ) : (
                  p.name
                )}
              </td>
              <td>
                {editId === p.id ? (
                  <input
                    type="number"
                    name="price"
                    value={editData.price}
                    onChange={handleEditChange}
                  />
                ) : (
                  `$${p.price}`
                )}
              </td>
              <td>
                {editId === p.id ? (
                  <>
                    <button onClick={saveEdit} style={{ marginRight: "10px" }}>
                      Save
                    </button>
                    <button onClick={() => setEditId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(p)} style={{ marginRight: "10px" }}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(p.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
