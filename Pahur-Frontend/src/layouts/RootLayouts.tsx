import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

const RootLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
