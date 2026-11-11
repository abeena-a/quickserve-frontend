import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";  

export default function VendorApp() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-green-700 text-white flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold p-4">ZM QuickServe</h2>
          <nav className="flex flex-col space-y-2 px-4">
            <NavLink to="/vendor/vendor-dashboard" className={({ isActive }) =>
              `p-2 rounded transition-colors duration-200 hover:bg-green-600 ${isActive ? "bg-green-900 font-semibold" : ""}`}>
              Dashboard
            </NavLink>
            <NavLink to="/vendor/vendor-services" className={({ isActive }) =>
              `p-2 rounded transition-colors duration-200 hover:bg-green-600 ${isActive ? "bg-green-900 font-semibold" : ""}`}>
              Services
            </NavLink>
            <NavLink to="/vendor/vendor-requests" className={({ isActive }) =>
              `p-2 rounded transition-colors duration-200 hover:bg-green-600 ${isActive ? "bg-green-900 font-semibold" : ""}`}>
              Client Requests
            </NavLink>
          </nav>
        </div>

        {/* Profile + Logout */}
<div className="p-4 border-t border-green-600 text-center"> {/* or green for vendor */}
  {currentUser && (
    <div className="mb-2">
      <p className="font-bold">{currentUser.name || currentUser.company}</p> {/*  show name/company */}
      <p className="text-xs text-gray-300">
  {currentUser.email}
</p>
      <p className="text-sm text-blue-200">({currentUser.role})</p>
    </div>
  )}
  <button
    onClick={handleLogout}
    className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
  >
    Logout
  </button>
</div>

      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
