// Import React and necessary hooks
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // For navigation and routing
import axios from "axios"; // HTTP client for API requests
const API_URL = process.env.REACT_APP_API_URL;

// RegisterPage component for user registration
export default function RegisterPage() {
  // Local state for input fields and error message
  const [email, setEmail] = useState(""); // Stores user input for email
  const [password, setPassword] = useState(""); // Stores user input for password
  const [error, setError] = useState(""); // Stores error message if registration fails

  const navigate = useNavigate(); // React Router hook to programmatically navigate to other pages

  // Handles registration form submission
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior (refresh)
    setError(""); // Clear any previous errors

    try {
      // Make API call to register endpoint with email and password
      const res = await axios.post(`${API_URL}/api/auth/register`, {
        email,
        password,
      });

      // On successful registration, alert and navigate to login page
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      // Set error message if registration fails
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-100 px-4">
      {/* Registration Card */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Heading */}
        <h2 className="text-2xl font-bold mb-2 text-center text-[#a6808c]">
          Create Account
        </h2>
        <p className="text-md text-center mb-6 text-gray-600">
          Register to access the Arvyax Wellness Platform
        </p>

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(""); // Clear error on user input
              }}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(""); // Clear error on user input
              }}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md"
              placeholder="********"
            />
          </div>

          {/* Display error if any */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#ccb7ae] text-black py-2 rounded-md hover:bg-[#a6808c] hover:text-white transition">
            Register
          </button>
        </form>

        {/* Link to login page */}
        <p className="text-md text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#565264] font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
