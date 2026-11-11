import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";  


export default function ClientApp() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-blue-700 text-white flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold p-4">ZM QuickServe</h2>
          <nav className="flex flex-col space-y-2 px-4">
            <NavLink to="/client/client-dashboard" className={({ isActive }) =>
              `p-2 rounded transition-colors duration-200 hover:bg-blue-600 ${isActive ? "bg-blue-900 font-semibold" : ""}`}>
              Dashboard
            </NavLink>
            <NavLink to="/client/client-services" className={({ isActive }) =>
              `p-2 rounded transition-colors duration-200 hover:bg-blue-600 ${isActive ? "bg-blue-900 font-semibold" : ""}`}>
              Vendor Services
            </NavLink>
            <NavLink to="/client/client-service-requests" className={({ isActive }) =>
              `p-2 rounded transition-colors duration-200 hover:bg-blue-600 ${isActive ? "bg-blue-900 font-semibold" : ""}`}>
              Service Requests
            </NavLink>
          </nav>
        </div>

        {/*  Profile + Logout */}
<div className="p-4 border-t border-blue-600 text-center"> {/* or green for vendor */}
  {currentUser && (
    <div className="mb-2">
      <p className="font-bold">{currentUser.name}</p> {/* show name/company */}
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
