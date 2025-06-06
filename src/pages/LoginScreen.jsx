import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;
      await updateDoc(doc(db, "users", user.uid), {
        lastLogin: serverTimestamp(),
      });
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-background dark:bg-background-dark min-h-screen py-20 px-6 transition-colors"
      >
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 text-center">
          <div className="card-surface w-full max-w-md">
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
                className="input-field"
              />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="input-field"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button type="submit" className="button-primary w-full">
                Log In
              </button>
            </form>

            <button
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-rose-500 hover:underline mt-3 font-medium"
            >
              Forgot your password?
            </button>

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
