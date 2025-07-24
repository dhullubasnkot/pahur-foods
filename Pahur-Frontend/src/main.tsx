import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import "./App.css";
import RootLayout from "./layouts/RootLayouts";
import HomePage from "./routers/home";
import AllProducts from "./pages/Products";
import ProductsDetails from "./components/productsdetails";
import { Cart } from "./pages/cart";

import AdminLayout from "./Admin/components/sidebar";
import Dashboard from "./Admin/pages/Dasboard";
import AddProducts from "./Admin/pages/AddProducts";

import { CartProvider } from "./context/cartcontext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products", element: <AllProducts /> },
      { path: "products/:id", element: <ProductsDetails /> },
      { path: "cart", element: <Cart /> },

      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "addproducts", element: <AddProducts /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);
