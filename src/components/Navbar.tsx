import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";

import { NavbarProps } from "../miscs/types/types";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ModeToggle } from "./mode-toggle";

const Navbar = ({ setSearchTerm, searchTerm }: NavbarProps) => {
  const cartProducts = useSelector((state: RootState) => state.cart.products);
  const isAdmin = useSelector(
    (state: RootState) =>
      state.user.currentUser && state.user.currentUser.role === "admin"
  );

  return (
    <nav className="navbar p-8 bg-gray-100 dark:bg-slate-800">
      {/* Section 1: Logo, Icons */}
      <div className="flex flex-col md:flex-row items-center justify-between my-4">
        <div className="flex items-center md:mb-0 dark:bg-gray-200 rounded">
          <Link to="/">
            <img src="/logo.svg" alt="Logo" />
          </Link>
        </div>
        <div className="navbar-icons flex gap-2 items-center">
          <ModeToggle />
          <Link to="/cart" className="mr-4 hover:text-gray-700">
            <div className="relative">
              <AiOutlineShoppingCart
                size={24}
                className="text-gray-500 dark:text-white opacity-85"
              />
              {cartProducts.length > 0 && (
                <div className="absolute top-0 right-0 bg-red-500 w-3 h-3 rounded-full"></div>
              )}
            </div>
          </Link>

          <Link to="/profile" className="hover:text-gray-700">
            <AiOutlineUser size={24} className="dark:text-white opacity-85" />
          </Link>
        </div>
      </div>

      {/* Section 2: Navigation Links */}
      <div className="flex justify-center md:justify-end">
        <ul className="navbar-nav flex dark:text-white opacity-80">
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
          {isAdmin && (
            <li className="mr-4">
              <Link
                to="/admin-products"
                className="text-lg hover:text-gray-700"
              >
                Products
              </Link>
            </li>
          )}

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
