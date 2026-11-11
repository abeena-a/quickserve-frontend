import Navbar from "../pages/Navbar";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="bg-darkbg min-h-screen text-black">
      <Navbar />
      <Outlet /> {/* public pages render here */}
    </div>
  );
}
