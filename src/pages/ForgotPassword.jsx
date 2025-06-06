import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    try {
      await sendPasswordResetEmail(auth, email);
      setStatus({
        type: "success",
        message: "Password reset email sent. Check your inbox.",
      });
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-background dark:bg-background-dark min-h-screen"
      >
        <section className="min-h-screen flex items-center justify-center px-6 py-20 text-center">
          <div className="card-surface w-full max-w-md text-left">
            <h2 className="text-2xl font-bold text-rose-500 mb-1">
              Forgot Password
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Enter your email and we’ll send you a reset link.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                required
                className="input-field"
              />
              {status.message && (
                <p
                  className={`text-sm ${
                    status.type === "success"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {status.message}
                </p>
              )}
              <button type="submit" className="button-primary w-full">
                Send Reset Link
              </button>
            </form>

            <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 text-center">
              Back to{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-rose-500 hover:underline font-semibold"
              >
                Login
              </button>
            </p>
          </div>
        </section>
      </motion.div>
    </>
  );
}
