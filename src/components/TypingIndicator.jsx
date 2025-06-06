import React from "react";
import { motion } from "framer-motion";

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-start px-4 py-2"
    >
      <div className="px-4 py-3 rounded-2xl text-sm md:text-base max-w-[80%] bg-gray-200 dark:bg-background-input text-gray-700 dark:text-gray-300 shadow-sm">
        Donna is typing...
      </div>
    </motion.div>
  );
}
