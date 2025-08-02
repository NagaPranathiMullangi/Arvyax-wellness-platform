import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#ce796b] text-white pt-6 pb-4 px-4 sm:px-6 md:px-8">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {/* About Us */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
            About Us
          </h3>
          <p className="text-sm leading-relaxed">
            Arvyax Wellness Platform helps you achieve mental and physical
            well-being through guided yoga and meditation.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
            Contact Us
          </h3>
          <p className="text-sm">Email: support@arvyax.com</p>
          <p className="text-sm">Phone: +91 98765 43210</p>
          <p className="text-sm">Hyderabad, Telangana, India</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
            Quick Links
          </h3>
          <ul className="text-sm space-y-1.5">
            <li>
              <a href="/" className="hover:text-[#f0ebd8]">
                Home
              </a>
            </li>
            <li>
              <a href="/register" className="hover:text-[#f0ebd8]">
                Register
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-[#f0ebd8]">
                Login
              </a>
            </li>
            <li>
              <a href="/dashboard" className="hover:text-[#f0ebd8]">
                Dashboard
              </a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
            Follow Us
          </h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-[#f0ebd8]">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-[#f0ebd8]">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-[#f0ebd8]">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-[#f0ebd8]">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-4 md:my-6 border-white opacity-60" />

      {/* Bottom Note */}
      <p className="text-center text-xs sm:text-sm text-white">
        &copy; {new Date().getFullYear()} Arvyax Wellness Platform. All rights
        reserved.
      </p>
    </footer>
  );
}
