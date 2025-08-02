// src/components/FeatureSection.jsx
import React from "react";

// Importing React Icons for visual representation
import { FaRegHeart, FaEdit, FaChartLine } from "react-icons/fa";

// Feature data array where each feature includes a title, icon, and description
const features = [
  {
    title: "Personalized Wellness Plans",
    icon: <FaRegHeart size={40} className="text-[#a6808c]" />, // Heart icon for wellness
    description: "Tailored sessions based on your mental and physical needs.",
  },
  {
    title: "Real-time Session Editor",
    icon: <FaEdit size={40} className="text-[#a6808c]" />, // Edit icon for editor
    description: "Create, edit and publish sessions with ease and speed.",
  },
  {
    title: "Progress Tracking",
    icon: <FaChartLine size={40} className="text-[#a6808c]" />, // Chart icon for tracking
    description: "Track your wellness journey with insightful stats and goals.",
  },
];

// Functional component to display feature cards
export default function FeatureSection() {
  return (
    <section className="py-4 px-6 sm:px-4 lg:px-10 bg-[#ecc8af]">
      {/* Section Heading */}
      <h2 className="text-2xl sm:text-2xl font-bold text-center text-gray-800 mb-5">
        Platform Features
      </h2>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition-shadow duration-300">
            {/* Icon Display */}
            <div className="mb-6 flex justify-center">{feature.icon}</div>

            {/* Feature Title */}
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {feature.title}
            </h3>

            {/* Feature Description */}
            <p className="text-gray-600 text-base">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
