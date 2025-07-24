import React, { useState } from "react";
import logo from "../../assets/plate.png"; // adjust the path as necessary
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../../context/AuthenticationProvider";
import { useContext } from "react";
import "./AdminHeader.css"; // we'll add styles here

export default function AdminHeader() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/admin"); // back to login
  };

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="Admin Panel" />
        <div>
          <h1>Admin</h1>
          {/*<a className="phone-number" href="tel:+21656422544">
            +216 56 422 544
          </a>*/}
        </div>
      </div>

      <nav className={`admin-nav ${isOpen ? "open" : ""}`}>
        <Link to="/admin/products">Plats</Link>
        <Link to="/admin/orders">Commandes</Link>

        {/* 👇 Replace the Link with a button or span for logout */}
        <button onClick={handleLogout} className="nav-link">
          Déconnexion
        </button>
      </nav>

      <button className="menu-toggle" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
    </header>
  );
}
