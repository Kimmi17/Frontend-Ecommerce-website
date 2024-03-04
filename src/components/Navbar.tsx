import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineUser,
} from "react-icons/ai";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar py-4">
      {/* Section 1: Logo, Search Bar, Icons */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <div className="flex items-center mb-4 md:mb-0">
          <Link to="/">
            <img src="/logo.svg" alt="Logo" />
          </Link>
          <SearchBar />
        </div>
        <div className="navbar-icons flex">
          <Link to="/cart" className="mr-4">
            <AiOutlineShoppingCart size={24} />
          </Link>
          <Link to="/favorites" className="mr-4">
            <AiOutlineHeart size={24} />
          </Link>
          <Link to="/profile">
            <AiOutlineUser size={24} />
          </Link>
        </div>
      </div>

      {/* Section 2: Navigation Links */}
      <div className="flex justify-center md:justify-end">
        <ul className="navbar-nav flex">
          <li className="mr-4">
            <Link to="/" className="text-lg">
              Home
            </Link>
          </li>
          <li className="mr-4">
            <Link to="/about" className="text-lg">
              About
            </Link>
          </li>
          <li className="mr-4">
            <Link to="/products" className="text-lg">
              Products
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-lg">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
