import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Hero from "./pages/Hero";
import Navbar from "./pages/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login"
import Contact from "./pages/Contact";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminApp from "./components/admin-module/AdminApp";
import AdminDashboard from "./components/admin-module/AdminDashboard";
import ManageUsers from "./components/admin-module/ManageUsers";
import AdminRequests from "./components/admin-module/AdminRequests";
import AdminServices from "./components/admin-module/AdminServices";

import ClientApp from "./components/client-module/ClientApp";
import ClientDashboard from "./components/client-module/ClientDashboard";
import ClientServices from "./components/client-module/ClientServices";
import ClientRequests from "./components/client-module/ClientRequests";



import VendorApp from "./components/vendor-module/VendorApp";
import VendorDashboard from "./components/vendor-module/VendorDashboard";
import VendorServices from "./components/vendor-module/VendorServices";
import VendorRequests from "./components/vendor-module/VendorRequests";

function App() {
  const location = useLocation();

  // Hide Navbar on admin, client, vendor dashboards
  const hideNavbar =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/client") ||
    location.pathname.startsWith("/vendor");

  return (
    <div className="bg-darkbg min-h-screen text-black">
      {!hideNavbar && <Navbar />}   {/*  Navbar hidden on dashboards */}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Hero />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin routes */}
        <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route path="/admin" element={<AdminApp />}>
            <Route path="admin-dashboard" element={<AdminDashboard />} />
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="admin-services" element={<AdminServices />} />
            <Route path="service-requests" element={<AdminRequests />} />
          </Route>
        </Route>

        {/* Client routes */}
        <Route element={<ProtectedRoute allowedRole="client" />}>
          <Route path="/client" element={<ClientApp />}>
            <Route path="client-dashboard" element={<ClientDashboard />} />
            <Route path="client-services" element={<ClientServices />} />
            <Route path="client-service-requests" element={<ClientRequests />} />

          </Route>
        </Route>

        {/* Vendor routes */}
        <Route element={<ProtectedRoute allowedRole="vendor" />}>
          <Route path="/vendor" element={<VendorApp />}>
            <Route path="vendor-dashboard" element={<VendorDashboard />} />
            <Route path="vendor-services" element={<VendorServices />} />
            <Route path="vendor-requests" element={<VendorRequests />} />


          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default function RootApp() {
  return (
    <Router>
      <App /> {/*  useLocation now inside Router */}
    </Router>
  );
}