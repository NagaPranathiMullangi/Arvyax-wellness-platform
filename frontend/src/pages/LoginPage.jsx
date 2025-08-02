// Import core React library and necessary hooks
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // For page navigation and internal linking
import axios from "axios"; // For making HTTP requests

// LoginPage component handles user login
export default function LoginPage() {
  // Local state for user input and error handling
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // React Router hook to programmatically navigate

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form refresh
    setError(""); // Clear any previous errors

    try {
      // Send login request to backend
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Extract token and userId from response
      const { token, userId } = res.data;

      // Save token and user ID to local storage for future authenticated requests
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      // Redirect to dashboard after successful login
      navigate("/dashboard");
    } catch (err) {
      // Show user-friendly error if login fails
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-100 px-4">
      {/* Login Card */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Heading */}
        <h2 className="text-2xl font-bold mb-2 text-center text-[#a6808c]">
          Hello Friend 👋
        </h2>
        <p className="text-md text-center mb-6 text-gray-600">
          Welcome back to Arvyax Wellness Platform
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(""); // Clear error when user starts typing again
              }}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(""); // Clear error when user starts typing again
              }}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="********"
            />
          </div>

          {/* Show error if login fails */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#ccb7ae] text-black py-2 rounded-md hover:bg-[#a6808c] hover:text-white transition">
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-md text-center mt-4">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-[#565264] font-bold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
