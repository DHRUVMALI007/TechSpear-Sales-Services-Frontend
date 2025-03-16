import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="admin-container">
      <Outlet />  {/* Renders admin pages */}
    </div>
  );
}
