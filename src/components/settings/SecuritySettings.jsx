import React from "react";
import { motion } from "framer-motion";

export default function SecuritySettings() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Privacy & Security
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        Control your privacy preferences, account access, and security settings.
      </p>

      <div className="card-surface space-y-4">
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white">
            Session Timeout
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Automatically sign out after inactivity to protect your data.
          </p>
          <select className="input-field w-full sm:w-60">
            <option>30 minutes</option>
            <option>1 hour</option>
            <option>2 hours</option>
          </select>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white">
            Device Access
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage devices where you're currently logged in.
          </p>
          <button className="button-secondary">View Active Devices</button>
        </div>

        <button className="button-danger">Log Out of All Devices</button>
      </div>
    </motion.div>
  );
}
