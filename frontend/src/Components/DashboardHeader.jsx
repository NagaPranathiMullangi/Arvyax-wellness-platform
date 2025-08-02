// Importing React to use JSX and create a functional component
import React from "react";

// DashboardHeader component receives two props:
// - currentView: the current tab/view selected on the dashboard
// - setCurrentView: function to change the current view
export default function DashboardHeader({ currentView, setCurrentView }) {
  return (
    // Main container for the header, with background color and padding
    <div className="flex justify-between items-center p-4 bg-[#e7d7c1] ">
      {/* Title on the left side of the header */}
      <h2 className="pl-75 text-xl text-black font-semibold">
        Welcome to the Dashboard
      </h2>

      {/* Button container on the right side */}
      <div className="space-x-4 text-black">
        {/* Button to show "All Sessions" view */}
        <button
          // When clicked, update currentView to "all"
          onClick={() => setCurrentView("all")}
          // Apply active styling if this is the selected view, else default style
          className={`px-4 py-2 rounded ${
            currentView === "all" ? "bg-[#735751] text-white" : "bg-[#a78a7f]"
          }`}>
          All Sessions
        </button>

        {/* Button to show "My Sessions" view (only sessions created by the user) */}
        <button
          onClick={() => setCurrentView("my")}
          className={`px-4 py-2 rounded ${
            currentView === "my" ? "bg-[#735751] text-white" : "bg-[#a78a7f]"
          }`}>
          My Sessions
        </button>

        {/* Button to open the "Session Editor" to create or edit a session */}
        <button
          onClick={() => setCurrentView("editor")}
          className={`px-4 py-2 rounded ${
            currentView === "editor"
              ? "bg-[#735751] text-white" // active style
              : "bg-[#a78a7f]" // inactive style
          }`}>
          Session Editor
        </button>
      </div>
    </div>
  );
}
