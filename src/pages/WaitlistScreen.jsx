import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import Navbar from "../components/Navbar";
import { FaPaperPlane } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const DonnaAvatar = "/assets/images/DonnaCircleColored.png";
const REFERRAL_OPTIONS = [
  "X",
  "LinkedIn",
  "Instagram",
  "Friend or Colleague",
  "Google Search",
  "Other",
];

const initialSteps = [
  {
    id: "greeting",
    role: "donna",
    content:
      "Hi there! I'm Donna. Let's get you on the waitlist. What's your first name?",
  },
];

function TypingDots() {
  return (
    <span className="flex space-x-1">
      <span className="animate-bounce">.</span>
      <span className="animate-bounce delay-100">.</span>
      <span className="animate-bounce delay-200">.</span>
    </span>
  );
}

export default function WaitlistScreen() {
  const [steps, setSteps] = useState(initialSteps);
  const [input, setInput] = useState("");
  const [form, setForm] = useState({
    first: "",
    last: "",
    email: "",
    source: "",
  });
  const [step, setStep] = useState("first");
  const [loading, setLoading] = useState(false);
  const [optionsDisabled, setOptionsDisabled] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [steps]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setInput("");
    setLoading(true);
    setSteps((s) => [...s, userMessage, { role: "donna", typing: true }]);

    setTimeout(async () => {
      const reply = await getDonnaReply(input);
      setSteps((s) => [...s.filter((m) => !m.typing), reply]);
      setLoading(false);
    }, 1200);
  };

  const getDonnaReply = async (input) => {
    switch (step) {
      case "first":
        setForm((f) => ({ ...f, first: input }));
        setStep("last");
        return {
          role: "donna",
          content: `Nice to meet you, ${input}! And your last name?`,
        };

      case "last":
        setForm((f) => ({ ...f, last: input }));
        setStep("email");
        return {
          role: "donna",
          content: "Thanks! What's the best email to reach you at?",
        };

      case "email": {
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
        if (!valid) {
          return {
            role: "donna",
            content:
              "Hmm, that doesn't look like a valid email. Mind trying again?",
          };
        }
        setForm((f) => ({ ...f, email: input }));
        setStep("source");
        return {
          role: "donna",
          content:
            "Almost done! How did you hear about Donna? (Tap one or type your own)",
          options: REFERRAL_OPTIONS,
        };
      }

      case "source":
        setForm((f) => ({ ...f, source: input }));
        setOptionsDisabled(true);
        setStep("done");
        try {
          await setDoc(doc(db, "waitlist", form.email.toLowerCase()), {
            ...form,
            source: input,
          });
        } catch (err) {
          console.error("Firestore error:", err);
        }
        return {
          role: "donna",
          content: `You're officially on the waitlist, ${form.first}! 🎉 I'll be in touch soon.`,
        };

      default:
        return null;
    }
  };

  const handleQuickOption = (option) => {
    if (optionsDisabled) return;
    const userMessage = { role: "user", content: option };
    setSteps((s) => [...s, userMessage, { role: "donna", typing: true }]);
    setLoading(true);

    setTimeout(async () => {
      const reply = await getDonnaReply(option);
      setSteps((s) => [...s.filter((m) => !m.typing), reply]);
      setLoading(false);
    }, 1000);
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
        <section
          ref={containerRef}
          className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-start px-4 pt-20 pb-12 overflow-y-auto transition-colors"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-rose-500 mb-6">
            Join Donna's Waitlist
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            Be the first to know when Donna is available for use in your region.
          </p>

          <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-xl shadow p-6 space-y-4 transition-colors">
            <AnimatePresence initial={false}>
              {steps.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.25 }}
                  className={`flex items-start gap-3 ${
                    msg.role === "user" ? "justify-end" : ""
                  }`}
                >
                  {msg.role === "donna" && (
                    <img
                      src={DonnaAvatar}
                      alt="Donna"
                      className="w-8 h-8 rounded-full mt-1 shadow"
                    />
                  )}
                  <div
                    className={`px-4 py-3 rounded-xl max-w-[85%] text-sm whitespace-pre-line shadow ${
                      msg.role === "user"
                        ? "bg-blue-100 text-gray-900"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                    }`}
                  >
                    {msg.typing ? <TypingDots /> : msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {step === "source" && !optionsDisabled && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                {REFERRAL_OPTIONS.map((opt, i) => (
                  <motion.button
                    key={i}
                    onClick={() => handleQuickOption(opt)}
                    className="bg-gray-100 dark:bg-gray-700 dark:text-gray-100 rounded-lg px-3 py-2 text-sm text-left hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {step !== "done" && (
              <form
                className="flex items-center gap-2 pt-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
              >
                <input
                  type="text"
                  className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                  placeholder="Type your response..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition flex items-center gap-2"
                >
                  <FaPaperPlane />
                </button>
              </form>
            )}
          </div>
        </section>
      </motion.div>
    </>
  );
}
