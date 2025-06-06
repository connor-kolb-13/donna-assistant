// SignupScreen.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaMicrosoft } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function SignupScreen() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const createUserDocument = async (
    uid,
    email,
    firstName = "",
    lastName = ""
  ) => {
    await setDoc(doc(db, "users", uid), {
      firstName,
      lastName,
      email,
      plan: "Free",
      referralCode: "",
      referredBy: "",
      linkedServices: {},
      notificationPrefs: {
        emailFollowups: true,
        eventReminders: true,
        summaryDigests: true,
        taskNudges: false,
      },
      usage: {
        fileUploads: 0,
        gptInteractions: 0,
        linkedServices: 0,
      },
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      createdAt: serverTimestamp(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true); // start spinner

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;
      await createUserDocument(
        user.uid,
        form.email,
        form.firstName,
        form.lastName
      );
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false); // stop spinner on error
    }
  };

  const handleProviderSignup = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await createUserDocument(user.uid, user.email);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
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
        <section className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="card-surface w-full max-w-md text-center">
            <img
              src="/assets/images/DonnaCircleColored.png"
              alt="Donna"
              className="w-20 h-20 mx-auto rounded-full mb-6"
            />
            <h2 className="text-2xl font-bold text-rose-500 mb-1">
              Create Your Account
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Let Donna help you get things done.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="flex gap-3">
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                  className="input-field"
                />
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                  className="input-field"
                />
              </div>
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
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                className="input-field"
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                className={`button-primary w-full flex justify-center items-center gap-2 ${
                  isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin" /> Creating account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>

            <div className="my-6 border-t border-gray-300 dark:border-gray-600" />

            <div className="flex flex-col gap-3 mt-6">
              <button
                onClick={() => handleProviderSignup(new GoogleAuthProvider())}
                className="flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-900 px-5 py-3 rounded-xl shadow-sm transition-colors hover:bg-gray-100"
              >
                <FcGoogle className="w-5 h-5" />
                Continue with Google
              </button>

              <button
                onClick={() =>
                  handleProviderSignup(new OAuthProvider("microsoft.com"))
                }
                className="flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-900 px-5 py-3 rounded-xl shadow-sm transition-colors hover:bg-gray-100"
              >
                <FaMicrosoft className="w-5 h-5 text-[#5E5E5E]" />
                Continue with Microsoft
              </button>

              <button
                onClick={() =>
                  handleProviderSignup(new OAuthProvider("apple.com"))
                }
                className="flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-900 px-5 py-3 rounded-xl shadow-sm transition-colors hover:bg-gray-100"
              >
                <FaApple className="w-5 h-5 text-black" />
                Continue with Apple
              </button>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mt-6 text-center">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-rose-500 hover:underline font-semibold"
              >
                Log in here
              </button>
            </p>
          </div>
        </section>
      </motion.div>
    </>
  );
}
