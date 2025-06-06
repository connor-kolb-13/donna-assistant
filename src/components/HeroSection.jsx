import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollDownHint from "./ScrollDownHint";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-background dark:bg-background-dark transition-colors"
    >
      <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6 py-20 relative">
        <img
          src="/assets/images/DonnaCircleColored.png"
          alt="Donna Assistant"
          className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 max-w-[160px] max-h-[160px] rounded-full shadow-lg border-4 border-white dark:border-gray-300 mb-6 transition-all duration-300"
        />

        <h1 className="text-4xl sm:text-5xl font-bold text-rose-500 mb-4">
          Meet Donna
        </h1>

        <p className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl max-w-xl mb-10">
          Your AI assistant for work and life — scheduling, emails, reminders,
          and more.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/waitlist")}
            className="button-primary"
          >
            Join the Waitlist
          </button>

          <button
            onClick={() => navigate("/explore")}
            className="button-secondary"
          >
            Explore Donna
          </button>
        </div>
      </section>
      <ScrollDownHint />
    </motion.div>
  );
}
