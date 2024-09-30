import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Navbar.css'; // Make sure to import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Smoke Trees</h1>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className="nav-link">User List</Link>
        </li>
        <li>
          <Link to="/add-user" className="nav-link">Add User</Link>
        </li>
        <li>
          <Link to="/add-address" className="nav-link">Add Address</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
