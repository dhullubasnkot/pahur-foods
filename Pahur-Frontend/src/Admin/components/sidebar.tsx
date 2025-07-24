import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Boxes,
} from "lucide-react";

const navItems = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  { name: "Orders", path: "/admin/orders", icon: <ShoppingCart size={18} /> },
  { name: "Products", path: "/admin/addproducts", icon: <Package size={18} /> },
  { name: "Stock", path: "/admin/stock", icon: <Boxes size={18} /> },
  { name: "Users", path: "/admin/users", icon: <Users size={18} /> },
  { name: "Settings", path: "/admin/settings", icon: <Settings size={18} /> },
];

export default function AdminLayout() {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-md h-screen sticky top-0 transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="p-4 border-b font-bold text-orange-600 text-lg">
          {collapsed ? "🛒" : "Admin Panel"}
        </div>
        <nav className="flex flex-col p-4 gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 p-2 rounded-lg transition ${
                pathname === item.path
                  ? "bg-orange-100 text-orange-700"
                  : "hover:bg-gray-100"
              }`}
            >
              {item.icon}
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-500"
        >
          {collapsed ? "➡️" : "⬅️ Collapse"}
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
