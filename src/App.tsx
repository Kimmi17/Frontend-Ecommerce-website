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
import ScrollToTopButton from "./components/ScrollToTopBottom";
import { ThemeProvider } from "./components/theme-provider";
import ProductsPage from "./pages/ProductsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import { getUserByToken } from "./redux/slices/userSlice";
import OrderSuccess from "./components/OrderSuccess";
import UsersPage from "./pages/UsersPage";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { dispatch } = store;

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(getUserByToken());
    }
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Navbar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        <div className="min-h-[80vh]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/categories/:categoryName"
              element={<CategoryProductsPage />}
            />
            <Route path="/products/:id" element={<ProductDetailsPage />} />
            <Route path="/admin-products" element={<ProductsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="category" element={<Outlet />}>
              <Route path={":categoryId"} element={<CategoryProductsPage />} />
            </Route>
            <Route path="/order/success/:orderId" element={<OrderSuccess />} />
          </Routes>
        </div>
        <Footer />
        <ScrollToTopButton />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
