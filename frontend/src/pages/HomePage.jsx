// src/pages/HomePage.jsx

// Import React core library
import React from "react";

// Import components used on the homepage
import HeroSection from "../Components/HeroSection"; // Top section with main message or CTA
import FeatureSection from "../Components/FeatureSection"; // Section that shows features or highlights

// HomePage component: this is the main landing page of the application
function HomePage() {
  return (
    // Container with padding and vertical spacing between sections
    <div className=" px-4 md:px-10 py-2  space-y-3">
      {/* Render the hero/banner section */}
      <HeroSection />

      {/* Render the feature section below the hero */}
      <FeatureSection />
    </div>
  );
}

// Export the HomePage component to use in routes
export default HomePage;
