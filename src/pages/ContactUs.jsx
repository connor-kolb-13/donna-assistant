import React, { useState } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "contactResponses"), {
        ...form,
        submittedAt: serverTimestamp(),
        userAgent: navigator.userAgent,
        page: window.location.pathname,
      });
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
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
        <div className="card-surface max-w-xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-rose-500 mb-2">Contact Us</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            Have a question, suggestion, or just want to say hello? We’d love to
            hear from you. Fill out the form and we’ll get back to you as soon
            as possible.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="input-field"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="input-field"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              rows="4"
              className="input-field"
            />
            <button type="submit" className="button-primary w-full">
              Send Message
            </button>
          </form>

          {status === "success" && (
            <p className="mt-4 text-green-500 text-sm">
              Thank you for your message! We’ll be in touch soon.
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-red-500 text-sm">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </motion.div>
    </>
  );
}
