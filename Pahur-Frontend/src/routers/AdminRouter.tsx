// src/Admin/AdminAppRouter.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "../Admin/components/sidebar";
import Dashboard from "../Admin/pages/Dasboard";
import AddProducts from "../Admin/pages/AddProducts";

const AdminAppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/AddProducts" element={<AddProducts />} />
          {/* Add more nested routes here */}
        </Route>
      </Routes>
    </Router>
  );
};

export default AdminAppRouter;
