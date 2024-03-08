import React from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineUser,
} from "react-icons/ai";

import { NavbarProps } from "../miscs/types/types";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Navbar = ({ setSearchTerm, searchTerm }: NavbarProps) => {
  const cartProducts = useSelector((state: RootState) => state.cart.products);

  return (
    <nav className="navbar p-4 bg-gray-100">
      {/* Section 1: Logo, Search Bar, Icons */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <div className="flex items-center mb-4 md:mb-0">
          <Link to="/">
            <img src="/logo.svg" alt="Logo" />
          </Link>
          {/* <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} /> */}
        </div>
        <div className="navbar-icons flex">
          <Link to="/cart" className="mr-4 hover:text-gray-700">
            <div className="relative">
              <AiOutlineShoppingCart size={24} className="text-gray-500" />
              {cartProducts.length > 0 && (
                <div className="absolute top-0 right-0 bg-red-500 w-3 h-3 rounded-full"></div>
              )}
            </div>
          </Link>
          {/* <Link to="/favorites" className="mr-4">
            <AiOutlineHeart size={24} />
          </Link> */}
          <Link to="/profile" className="hover:text-gray-700">
            <AiOutlineUser size={24} />
          </Link>
        </div>
      </div>

      {/* Section 2: Navigation Links */}
      <div className="flex justify-center md:justify-end">
        <ul className="navbar-nav flex">
          <li className="mr-4">
            <Link to="/" className="text-lg hover:text-gray-700">
              Home
            </Link>
          </li>
          <li className="mr-4">
            <Link to="/about" className="text-lg hover:text-gray-700">
              About
            </Link>
          </li>
          {/* <li className="mr-4">
            <Link to="/products" className="text-lg">
              Products
            </Link>
          </li> */}
          <li>
            <Link to="/contact" className="text-lg hover:text-gray-700">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
