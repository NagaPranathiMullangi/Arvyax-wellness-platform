// Import React
import React from "react";

// Import necessary modules from react-router-dom for routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import reusable layout components
import Header from "./Components/Header";
import Footer from "./Components/Footer";

// Import individual page components
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashBoardPage from "./pages/DashBoardPage";

// The main App component that handles routing and layout
export default function App() {
  return (
    // Wrap the entire application in the Router component to enable routing
    <Router>
      {/* Flex container for full height layout: header at top, footer at bottom */}
      <div className="flex flex-col min-h-screen">
        {/* Header component displayed at the top of all pages */}
        <Header />

        {/* Main content area that grows to fill the available space */}
        <main className="flex-1">
          <Routes>
            {/* Define individual routes for navigation */}
            <Route path="/" element={<HomePage />} /> {/* Home page */}
            <Route path="/register" element={<RegisterPage />} />{" "}
            {/* Registration page */}
            <Route path="/login" element={<LoginPage />} /> {/* Login page */}
            <Route path="/dashboard" element={<DashBoardPage />} />{" "}
            {/* Dashboard (protected route) */}
          </Routes>
        </main>

        {/* Footer component displayed at the bottom of all pages */}
        <Footer />
      </div>
    </Router>
  );
}
