import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "../components/navbar";

import HomePage from "./home";
import ProductsDetails from "../components/productsdetails";
import AllProducts from "../pages/Products";

import AdminLayout from "../Admin/components/sidebar";
import Dashboard from "../Admin/pages/Dasboard";
import AddProducts from "../Admin/pages/AddProducts";
import { CartProvider } from "../context/cartcontext";
import { Cart } from "../pages/cart";

const AppRouter: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:id" element={<ProductsDetails />} />
          <Route path="/cart" element={<Cart />} />
          {/* Admin routes with layout */}
          <Route path="/admin" element={<AdminLayout />}>
            {/* Redirect /admin to /admin/dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="addproducts" element={<AddProducts />} />
            {/* Add more admin routes here */}
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default AppRouter;
