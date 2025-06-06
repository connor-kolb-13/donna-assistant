import React from "react";
import { motion } from "framer-motion";

export default function Help() {
  return (
    <>
      <motion.div
        className="min-h-screen bg-gray-100 dark:bg-background-card px-6 py-20 transition-colors-colors"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-rose-500 mb-4">Help</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Support resources and FAQs will be listed here.
        </p>
      </motion.div>
    </>
  );
}
