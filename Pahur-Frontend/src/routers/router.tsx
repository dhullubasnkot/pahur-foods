import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/navbar";

import HomePage from "./home";
import ProductsDetails from "../components/productsdetails";

// Example pages
const AppRouter: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pickel/:id" element={<ProductsDetails />} />

        {/* <Route path="/products" element={<ProductsPage />} />
        <Route path="/profile" element={<ProfilePage />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
