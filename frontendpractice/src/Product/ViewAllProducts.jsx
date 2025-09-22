import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config"; // adjust the path if needed

export default function ViewAllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.apiBaseUrl}/products`) // use config.apiBaseUrl
      .then((res) => setProducts(res.data))
      .catch(() => console.error("Error fetching products"));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Products</h2>
      <table border="1" cellPadding="8" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>${p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
