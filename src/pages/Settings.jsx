import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaUser,
  FaLink,
  FaBell,
  FaDatabase,
  FaShieldAlt,
  FaCreditCard,
} from "react-icons/fa";
import DonnaChatLauncher from "../components/DonnaChatLauncher";

const navItems = [
  { label: "Account", icon: FaUser, path: "account" },
  { label: "Linked Services", icon: FaLink, path: "linked-services" },
  { label: "Notifications", icon: FaBell, path: "notifications" },
  { label: "Memory & Data", icon: FaDatabase, path: "memory" },
  { label: "Privacy & Security", icon: FaShieldAlt, path: "security" },
  { label: "Billing", icon: FaCreditCard, path: "billing" },
];

export default function Settings() {
  const location = useLocation();

  return (
    <main className="flex flex-col md:flex-row min-h-[85vh] bg-background dark:bg-background-dark transition-colors">
      {/* Sidebar Navigation - Static */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 p-4">
        <nav className="space-y-1">
          {navItems.map(({ label, icon: Icon, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-rose-100 dark:bg-rose-900 text-rose-600 dark:text-rose-300"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-background-input"
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Page Content with animation */}
      <section className="flex-1 p-6 overflow-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </section>

      <DonnaChatLauncher />
    </main>
  );
}
