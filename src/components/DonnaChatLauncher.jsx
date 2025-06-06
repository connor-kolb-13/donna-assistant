import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function DonnaChatLauncher() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-card dark:bg-card-dark text-sm text-gray-800 dark:text-gray-200 shadow-lg rounded-xl px-4 py-2 max-w-xs"
          >
            Need help? I'm always just a click away.
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/chat")}
        className="w-14 h-14 rounded-full shadow-lg border border-gray-300 dark:border-gray-700 overflow-hidden transition-all"
      >
        <img
          src="/assets/images/DonnaCircleColored.png"
          alt="Chat with Donna"
          className="w-full h-full object-cover"
        />
      </motion.button>
    </div>
  );
}
