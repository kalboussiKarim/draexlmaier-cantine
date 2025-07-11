import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";

export default function AdminLayout() {
  return (
    <>
      <AdminHeader />
      <main style={{ padding: "1rem" }}>
        <Outlet /> {/* This renders nested routes like /admin/orders */}
      </main>
    </>
  );
}
