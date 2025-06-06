// components/SuccessBanner.jsx
import { motion } from "framer-motion";

export default function SuccessBanner({ message }) {
  return (
    <div className="fixed top-[64px] right-4 z-50">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        className="bg-green-600 text-white text-sm px-4 py-2 rounded-md shadow-md min-w-[280px] text-center"
      >
        {message}
      </motion.div>
    </div>
  );
}
