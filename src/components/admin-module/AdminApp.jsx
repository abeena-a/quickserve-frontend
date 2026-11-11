import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

export default function AdminApp() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };



  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-purple-700 text-white flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold p-4">ZM QuickServe</h2>
          <nav className="flex flex-col space-y-2 px-4">
            <NavLink to="/admin/admin-dashboard" className={({ isActive }) =>
              `p-2 rounded transition-colors duration-200 hover:bg-purple-600 ${isActive ? "bg-purple-900 font-semibold" : ""}`}>
              Dashboard
            </NavLink>
            <NavLink to="/admin/manage-users" className={({ isActive }) =>
              `p-2 rounded transition-colors duration-200 hover:bg-purple-600 ${isActive ? "bg-purple-900 font-semibold" : ""}`}>
              Manage Users
            </NavLink>
            <NavLink to="/admin/admin-services" className={({ isActive }) =>
              `p-2 rounded transition-colors duration-200 hover:bg-purple-600 ${isActive ? "bg-purple-900 font-semibold" : ""}`}>
              Services
            </NavLink>
            <NavLink to="/admin/service-requests" className={({ isActive }) =>
              `p-2 rounded transition-colors duration-200 hover:bg-purple-600 ${isActive ? "bg-purple-900 font-semibold" : ""}`}>
              Service Requests
            </NavLink>
          </nav>
        </div>

        {/* Profile + Logout */}
        <div className="p-4 border-t border-purple-600 text-center">
          {currentUser && (
            <div className="mb-2">
              <p className="font-bold">{currentUser.name}</p> {/*show name */}
              <p className="text-xs text-gray-300">
                {currentUser.email}
              </p>

              <p className="text-sm text-purple-200">({currentUser.role})</p>
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
