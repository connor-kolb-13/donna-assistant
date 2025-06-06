import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

export default function ScrollDownHint() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute bottom-6 left-0 right-0 flex justify-center z-20"
    >
      <FaChevronDown
        className="text-rose-400 dark:text-rose-500 animate-bounce"
        size={20}
      />
    </motion.div>
  );
}
