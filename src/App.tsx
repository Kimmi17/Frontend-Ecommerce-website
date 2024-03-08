import React, { useEffect, useState } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import store from "./redux/store";
import Navbar from "./components/Navbar";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CategoryProductsPage from "./pages/CategoryProductsPage";
import HomePage from "./pages/HomePage";
import { fetchCategories } from "./redux/slices/categorySlice";
import AboutPage from "./pages/AboutPage";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { dispatch } = store;

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/categories/:categoryName"
          element={<CategoryProductsPage />}
        />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="category" element={<Outlet />}>
          <Route path={":categoryId"} element={<CategoryProductsPage />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
