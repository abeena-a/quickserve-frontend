import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-purple-400 shadow-md">
      <nav className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/ZMlogo.png" alt="ZM QuickServe Logo" className="h-8 w-8 rounded-4xl" />
          <span className="font-bold text-xl">ZM QuickServe</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li><a href="/" className="hover:text-white transition">Home</a></li>
          <li><a href="#" className="hover:text-white transition">Contacts</a></li>
          <li><a href="/register" className="hover:text-white transition">Register</a></li>
          <li><a href="/login" className="hover:text-white transition">Login</a></li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu with animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <ul className="bg-purple-500 flex flex-col space-y-4 p-4">
          <li><a href="/" className="hover:text-white transition">Home</a></li>
          <li><a href="#" className="hover:text-white transition">Contacts</a></li>
          <li><a href="/register" className="hover:text-white transition">Register</a></li>
          <li><a href="/login" className="hover:text-white transition">Login</a></li>

        </ul>
      </div>
    </header>
  );
}
