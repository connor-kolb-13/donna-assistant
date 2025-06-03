import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔐 Firebase or custom auth here
    console.log("Login data:", form);
  };

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
        <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-white dark:bg-gray-900 text-center transition-colors">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 transition-colors">
            <img
              src="/assets/images/DonnaCircleColored.png"
              alt="Donna"
              className="w-20 h-20 mx-auto rounded-full mb-6"
            />

            <h2 className="text-2xl font-bold text-rose-500 mb-1">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Log in to continue with Donna.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-base bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-base bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />

              <button
                type="submit"
                className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold px-6 py-3 rounded-xl transition"
              >
                Log In
              </button>
            </form>

            <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">
              Don’t have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-rose-500 hover:underline font-semibold"
              >
                Sign up here
              </button>
            </p>
          </div>
        </section>
      </motion.div>
    </>
  );
}
