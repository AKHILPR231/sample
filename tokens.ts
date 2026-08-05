import { Navigate, Route, Routes } from "react-router-dom";

import { AdminLayout } from "@/layouts/AdminLayout";
import { LoginPage } from "@/pages/LoginPage";
import { OutletConfigPage } from "@/pages/OutletConfigPage";
import { PlaceholderPage } from "@/pages/PlaceholderPage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<OutletConfigPage />} />
        <Route path="services" element={<PlaceholderPage title="Services" />} />
        <Route path="brands" element={<PlaceholderPage title="Brands" />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
