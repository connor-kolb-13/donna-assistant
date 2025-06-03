import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

export default function LandingHero() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-900 min-h-screen"
      >
        <section className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center text-center px-6 py-20 transition-colors">
          <img
            src="/assets/images/DonnaCircleColored.png"
            alt="Donna Assistant"
            className="w-32 h-32 rounded-full shadow-lg mb-6"
          />

          <h1 className="text-4xl sm:text-5xl font-bold text-rose-500 mb-4">
            Meet Donna
          </h1>

          <p className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl max-w-xl mb-8">
            Your AI assistant for work and life — scheduling, emails, reminders,
            and more.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/waitlist")}
              className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-6 py-3 rounded-xl shadow transition"
            >
              Join the Waitlist
            </button>

            <button
              onClick={() => navigate("/explore")}
              className="text-rose-600 dark:text-rose-400 hover:text-white hover:bg-rose-100 dark:hover:bg-rose-600 font-semibold px-6 py-3 rounded-xl transition"
            >
              Explore Donna
            </button>
          </div>
        </section>
      </motion.div>
    </>
  );
}
