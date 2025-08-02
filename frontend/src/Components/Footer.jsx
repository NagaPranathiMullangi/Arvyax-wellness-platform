import React from "react";
// Importing social media icons from react-icons
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

// Functional component: Footer
export default function Footer() {
  return (
    // Footer wrapper with background color and padding
    <footer className="bg-[#ce796b] text-white pt-10 pb-6 px-4 sm:px-8">
      {/* Main footer container with responsive grid layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* About Us Section */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-3 text-white">About Us</h3>
          <p className="text-sm leading-6 flex-1">
            Arvyax Wellness Platform is dedicated to helping you achieve mental
            and physical well-being through guided yoga and meditation sessions.
          </p>
        </div>

        {/* Contact Us Section */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-3 text-white">Contact Us</h3>
          <p className="text-sm">Email: support@arvyax.com</p>
          <p className="text-sm">Phone: +91 98765 43210</p>
          <p className="text-sm">Address: Hyderabad, Telangana, India</p>
        </div>

        {/* Quick Navigation Links */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
          <ul className="text-sm space-y-2">
            {/* Each link navigates to a specific route with hover effects */}
            <li>
              <a href="/" className="hover:text-[#f0ebd8] hover:font-bold">
                Home
              </a>
            </li>
            <li>
              <a
                href="/register"
                className="hover:text-[#f0ebd8] hover:font-bold">
                Register
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-[#f0ebd8] hover:font-bold">
                Login
              </a>
            </li>
            <li>
              <a
                href="/dashboard"
                className="hover:text-[#f0ebd8] hover:font-bold">
                Dashboard
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-3 text-white">Follow Us</h3>
          <div className="flex space-x-4 text-white text-xl">
            {/* Social media icons with hover effects */}
            <a href="#" className="hover:text-[#f0ebd8] hover:text-2xl">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-[#f0ebd8] hover:text-2xl">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-[#f0ebd8] hover:text-2xl">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-[#f0ebd8] hover:text-2xl">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Divider line */}
      <hr className="my-6 border-white" />

      {/* Footer Bottom Text with current year */}
      <p className="text-center text-sm text-white">
        &copy; {new Date().getFullYear()} Arvyax Wellness Platform. All rights
        reserved.
      </p>
    </footer>
  );
}
