import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

export default function DashboardHeader({ currentView, setCurrentView }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navButtons = (
    <>
      <button
        onClick={() => {
          setCurrentView("all");
          setMenuOpen(false);
        }}
        className={`px-4 py-2 rounded w-full text-left ${
          currentView === "all" ? "bg-[#735751] text-white" : "bg-[#a78a7f]"
        }`}>
        All Sessions
      </button>

      <button
        onClick={() => {
          setCurrentView("my");
          setMenuOpen(false);
        }}
        className={`px-4 py-2 rounded w-full text-left ${
          currentView === "my" ? "bg-[#735751] text-white" : "bg-[#a78a7f]"
        }`}>
        My Sessions
      </button>

      <button
        onClick={() => {
          setCurrentView("editor");
          setMenuOpen(false);
        }}
        className={`px-4 py-2 rounded w-full text-left ${
          currentView === "editor" ? "bg-[#735751] text-white" : "bg-[#a78a7f]"
        }`}>
        Session Editor
      </button>
    </>
  );

  return (
    <div className="p-4 bg-[#e7d7c1] text-black">
      <div className="flex justify-between items-center">
        {/* Title */}
        <h2 className="text-xl font-semibold">Welcome to the Dashboard</h2>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">{navButtons}</div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Side Menu (slide down under header) */}
      {menuOpen && (
        <div className="mt-4 flex flex-col space-y-2 md:hidden">
          {navButtons}
        </div>
      )}
    </div>
  );
}
