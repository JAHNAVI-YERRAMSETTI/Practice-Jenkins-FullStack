import { Link } from "react-router-dom";

export default function MainNavBar() {
  return (
    <nav
      style={{
        backgroundColor: "#333",
        padding: "12px",
        display: "flex",
        justifyContent: "center",
        gap: "15px",
      }}
    >
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/products/add" style={linkStyle}>Create Product</Link>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "16px",
};
