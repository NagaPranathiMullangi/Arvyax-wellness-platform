// Importing necessary libraries and components
import React, { useState } from "react";
import DashboardHeader from "../Components/DashboardHeader"; // Top navigation section for the dashboard
import DashboardContent from "../Components/DashboardContent"; // Shows general dashboard data
import MySessions from "../Components/MySessions"; // Shows user's draft & published sessions
import SessionEditor from "../Components/SessionEditor"; // UI for creating/editing sessions

// Main Dashboard component
export default function Dashboard() {
  // State to track which view is currently active (default is "all")
  const [currentView, setCurrentView] = useState("all");

  return (
    <div>
      {/* DashboardHeader contains buttons/tabs to switch between views */}
      <DashboardHeader
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      {/* Render components based on selected view */}
      {currentView === "all" && <DashboardContent />}{" "}
      {/* Shows general dashboard overview */}
      {currentView === "my" && <MySessions />}{" "}
      {/* Shows user's sessions (published + drafts) */}
      {currentView === "editor" && <SessionEditor />}{" "}
      {/* Opens session editor to create or edit */}
    </div>
  );
}
