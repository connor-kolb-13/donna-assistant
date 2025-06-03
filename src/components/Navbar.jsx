import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle, FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();

  const isLoggedIn = false;

  const isActive = (path) =>
    pathname === path
      ? "text-rose-600 font-semibold"
      : "text-gray-600 hover:text-rose-500 dark:text-gray-300 dark:hover:text-rose-400";

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-50 transition-colors">
      <Link to="/" className="flex items-center gap-2">
        <img
          src="/assets/images/DonnaAppIcon.png"
          alt="Donna Logo"
          className="w-8 h-8 rounded-full"
        />
        <span className="font-bold text-lg text-rose-500">Donna</span>
      </Link>

      <div className="hidden md:flex gap-6 items-center">
        <Link to="/" className={isActive("/")}>
          Home
        </Link>
        <Link to="/waitlist" className={isActive("/waitlist")}>
          Waitlist
        </Link>
        <Link to="/explore" className={isActive("/explore")}>
          Explore Donna
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-10 h-10 flex items-center justify-center text-rose-500 hover:text-rose-600"
        >
          <FaUserCircle size={28} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg text-sm z-50 overflow-hidden divide-y divide-gray-100 dark:divide-gray-700">
            <button
              onClick={toggle}
              className="flex items-center gap-2 w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
              {theme === "dark"
                ? "Switch to Light Mode"
                : "Switch to Dark Mode"}
            </button>

            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="block w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="block w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/settings")}
                  className="block w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                  Settings
                </button>
                <button
                  onClick={() => {
                    // handleLogout()
                  }}
                  className="block w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400"
                >
                  Log Out
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
