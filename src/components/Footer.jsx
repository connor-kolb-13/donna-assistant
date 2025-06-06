import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { auth } from "../firebase";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Footer() {
  const { theme, toggle } = useTheme();
  const user = auth.currentUser;

  return (
    <footer className="bg-background dark:bg-background-dark border-t border-gray-200 dark:border-gray-700 px-6 py-6 text-sm transition-colors">
      <div className="flex flex-col items-center justify-center space-y-4">
        <button
          onClick={toggle}
          className="flex items-center gap-2 text-gray-500 dark:text-gray-300 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>

        <div className="flex gap-6 text-gray-500 dark:text-gray-300">
          <Link to="/privacy" className="hover:text-rose-500 transition-colors">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-rose-500 transition-colors">
            Terms
          </Link>
          <Link to="/contact" className="hover:text-rose-500 transition-colors">
            Contact
          </Link>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500 pt-1">
          © {new Date().getFullYear()} Ask Donna, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
