import React from "react";
import { motion } from "framer-motion";
import { FaCommentDots, FaRobot, FaClipboardCheck } from "react-icons/fa";

const steps = [
  {
    icon: <FaCommentDots size={28} />,
    title: "You Send a Message",
    description:
      "Ask Donna to summarize, schedule, remind, or explain anything.",
  },
  {
    icon: <FaRobot size={28} />,
    title: "Donna Responds",
    description:
      "She reads, understands, and responds with natural intelligence.",
  },
  {
    icon: <FaClipboardCheck size={28} />,
    title: "Action is Logged",
    description:
      "Results get saved — as memory, reminders, or notes — ready anytime.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-background dark:bg-background-dark transition-colors border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-center text-3xl font-semibold text-gray-800 dark:text-white mb-12">
        How Donna Works
      </h2>

      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between gap-10 px-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="flex-1 rounded-2xl p-6 shadow-md hover:shadow-lg text-center bg-card dark:bg-card-dark transition-shadow"
          >
            <div className="flex justify-center text-rose-500 mb-4">
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
