import React from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaEnvelopeOpenText,
  FaLightbulb,
  FaBell,
} from "react-icons/fa";

const features = [
  {
    title: "Smart Scheduling",
    icon: <FaCalendarAlt size={32} />,
    description:
      "Automatically schedules meetings, resolves conflicts, and syncs with your calendar.",
  },
  {
    title: "Inbox Insights",
    icon: <FaEnvelopeOpenText size={32} />,
    description:
      "Summarizes emails and highlights what matters so you don’t miss anything.",
  },
  {
    title: "Intelligent Memory",
    icon: <FaLightbulb size={32} />,
    description:
      "Remembers key facts, links, and tasks mentioned across your day.",
  },
  {
    title: "Proactive Reminders",
    icon: <FaBell size={32} />,
    description:
      "Follows up on messages, commitments, and deadlines—automatically.",
  },
];

export default function FeatureHighlightCards() {
  return (
    <section className="py-20 bg-surface dark:bg-background-card transition-colors">
      <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white mb-12">
        What Donna Can Do
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
        {features.map((feat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-card dark:bg-card-dark rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all flex flex-col items-center text-center"
          >
            <div className="text-rose-500 mb-4">{feat.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {feat.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {feat.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
