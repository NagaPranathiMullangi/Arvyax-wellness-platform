import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Menu and close icons for mobile menu

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false); // State to track if mobile menu is open
  const location = useLocation(); // Gets current route information
  const path = location.pathname; // Extracts the current path

  // Toggle menu for mobile view
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // This function renders buttons conditionally based on current route
  const renderButtons = (isMobile = false) => {
    // Styling classes based on mobile or desktop
    const baseClasses = isMobile
      ? "block text-blue-600 hover:underline mb-3"
      : "text-white hover:underline text-base font-medium";

    // Clear user data and redirect to home
    const handleLogout = () => {
      localStorage.clear();
      window.location.href = "/";
    };

    // Button rendering based on current route
    return (
      <>
        {/* On Home Page */}
        {path === "/" && (
          <>
            <Link to="/register" className={baseClasses}>
              Register
            </Link>
            <Link to="/login" className={baseClasses}>
              Login
            </Link>
            <Link to="/dashboard" className={baseClasses}>
              Dashboard
            </Link>
            <button onClick={handleLogout} className={baseClasses}>
              Logout
            </button>
          </>
        )}

        {/* On Register Page */}
        {path === "/register" && (
          <>
            <Link to="/login" className={baseClasses}>
              Login
            </Link>
            <button onClick={handleLogout} className={baseClasses}>
              Logout
            </button>
          </>
        )}

        {/* On Login Page */}
        {path === "/login" && (
          <>
            <Link to="/dashboard" className={baseClasses}>
              Dashboard
            </Link>
            <button onClick={handleLogout} className={baseClasses}>
              Logout
            </button>
          </>
        )}

        {/* On Dashboard Page */}
        {path === "/dashboard" && (
          <>
            <button onClick={handleLogout} className={baseClasses}>
              Logout
            </button>
          </>
        )}
      </>
    );
  };

  return (
    <header className="bg-[#ce796b] text-white px-4 py-4 flex justify-between items-center shadow-md">
      {/* Logo or Brand Name on the left */}
      <h1 className="text-lg sm:text-xl font-semibold">
        Arvyax Wellness Platform
      </h1>

      {/* Navigation buttons for desktop */}
      <nav className="hidden md:flex gap-8">{renderButtons(false)}</nav>

      {/* Hamburger menu toggle button for small screens */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          {/* Icon changes based on menu state */}
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Side menu for mobile view */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-white text-blue-600 p-6 z-50 shadow-lg">
          {/* Menu header with close icon */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Menu</h2>
            <button onClick={toggleMenu}>
              <X size={24} />
            </button>
          </div>

          {/* Navigation links inside side menu */}
          <div className="space-y-2">{renderButtons(true)}</div>
        </div>
      )}
    </header>
  );
}
