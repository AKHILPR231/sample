import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/lib/auth";

import { AdminFooter } from "./AdminFooter";
import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";

import "./AdminLayout.css";

export function AdminLayout() {
  const { isAuthenticated } = useAuth();

  // Protect the admin area — bounce unauthenticated users to the login page.
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="admin">
      <AdminHeader />
      <AdminSidebar />
      <main className="admin__main">
        <Outlet />
      </main>
      <AdminFooter />
    </div>
  );
}
