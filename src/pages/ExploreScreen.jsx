// src/pages/ExploreScreen.jsx
import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaEnvelope,
  FaPlaneDeparture,
  FaTasks,
  FaFileAlt,
  FaBrain,
  FaGoogle,
  FaDropbox,
  FaApple,
  FaMicrosoft,
  FaMemory,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const INTEGRATION_ICONS = {
  "Google Calendar": <FaGoogle className="text-gray-500 dark:text-gray-300" />,
  Outlook: <FaMicrosoft className="text-gray-500 dark:text-gray-300" />,
  Gmail: <FaGoogle className="text-gray-500 dark:text-gray-300" />,
  Delta: <FaPlaneDeparture className="text-gray-500 dark:text-gray-300" />,
  TripIt: <FaPlaneDeparture className="text-gray-500 dark:text-gray-300" />,
  "Google Tasks": <FaGoogle className="text-gray-500 dark:text-gray-300" />,
  "iOS Reminders": <FaApple className="text-gray-500 dark:text-gray-300" />,
  "Google Drive": <FaGoogle className="text-gray-500 dark:text-gray-300" />,
  Dropbox: <FaDropbox className="text-gray-500 dark:text-gray-300" />,
  "Donna Private Memory": (
    <FaMemory className="text-gray-500 dark:text-gray-300" />
  ),
};

const CATEGORIES = [
  {
    key: "calendar",
    name: "Calendar",
    description:
      "Stay on top of your meetings and plans with smart scheduling.",
    icon: <FaCalendarAlt size={32} className="text-rose-500" />,
    integrations: ["Google Calendar", "Outlook"],
    prompts: [
      {
        prompt: "Add lunch with Jake tomorrow at 1 PM.",
        response:
          'Got it — added "Lunch with Jake" to your calendar for tomorrow at 1:00 PM and sent a reminder.',
      },
      {
        prompt: "Move my team sync to Friday at 2.",
        response:
          "Team sync has been moved to Friday at 2:00 PM and all attendees have been notified.",
      },
      {
        prompt: "Schedule a dentist appointment for next Tuesday at 9 AM.",
        response:
          "Dentist appointment booked for next Tuesday at 9:00 AM and added to your calendar.",
      },
      {
        prompt: "Cancel my 4 PM call today.",
        response: "Your 4:00 PM call has been canceled and attendees notified.",
      },
    ],
  },
  {
    key: "email",
    name: "Email",
    description:
      "Let Donna catch you up, draft replies, and find messages fast.",
    icon: <FaEnvelope size={32} className="text-rose-500" />,
    integrations: ["Gmail", "Outlook"],
    prompts: [
      {
        prompt: "Summarize my inbox this morning.",
        response:
          "You received 18 emails. I flagged 4 for attention — one from Alex, two from payroll, and a calendar update.",
      },
      {
        prompt: "Draft a polite reply to that client follow-up.",
        response:
          "Here’s a suggested reply: “Thanks for your patience! I’ve looped in our support team and will follow up shortly.”",
      },
      {
        prompt: "Search for the email about the Q2 budget.",
        response:
          "Found 2 emails referencing Q2 budget — one from finance and one from your team lead.",
      },
      {
        prompt: "Delete all promotional emails from yesterday.",
        response: "14 promotional emails from yesterday have been deleted.",
      },
    ],
  },
  {
    key: "travel",
    name: "Travel",
    description: "Track flights, organize reservations, and prep your agenda.",
    icon: <FaPlaneDeparture size={32} className="text-rose-500" />,
    integrations: ["Delta", "TripIt"],
    prompts: [
      {
        prompt: "Add DL385 to JFK on July 8 to my calendar.",
        response:
          "Done. I’ve added your Delta flight to JFK on July 8 with real-time updates and reminders.",
      },
      {
        prompt: "Save my Marriott rewards number: 9827 3112.",
        response: "Saved in your travel memory — Marriott Rewards #9827 3112.",
      },
      {
        prompt: "Remind me to check into my flight 24 hours in advance.",
        response:
          "Reminder created — I’ll notify you 24 hours before check-in for your upcoming flight.",
      },
      {
        prompt: "What’s the terminal for my Southwest flight tomorrow?",
        response:
          "Your Southwest flight departs from Terminal B. I’ll notify you of any changes.",
      },
    ],
  },
  {
    key: "reminders",
    name: "Tasks & Reminders",
    description:
      "Set gentle nudges or recurring reminders with natural phrasing.",
    icon: <FaTasks size={32} className="text-rose-500" />,
    integrations: ["Google Tasks", "iOS Reminders"],
    prompts: [
      {
        prompt: "Remind me to water the plants every Sunday.",
        response:
          "Recurring reminder created — every Sunday at 9:00 AM, I’ll ping you to water the plants.",
      },
      {
        prompt: "Remind me to submit my timecard this Friday.",
        response:
          "Reminder set for Friday at 4:30 PM — I’ll notify you before EOD.",
      },
      {
        prompt: "Every day at 8 PM, ask me if I’ve closed my tabs.",
        response:
          "Scheduled! I’ll check in daily at 8:00 PM about your browser tabs.",
      },
      {
        prompt: "Nudge me to drink water at 3 and 5 PM.",
        response: "Hydration reminders set for 3:00 PM and 5:00 PM today.",
      },
    ],
  },
  {
    key: "files",
    name: "Files & Parsing",
    description: "Drop in PDFs, CSVs, or contracts — Donna pulls what matters.",
    icon: <FaFileAlt size={32} className="text-rose-500" />,
    integrations: ["Google Drive", "Dropbox"],
    prompts: [
      {
        prompt: "Summarize this PDF contract I uploaded.",
        response:
          "The contract spans 7 pages. Key terms: net 30 payment, auto-renewal, $8,000 monthly fee.",
      },
      {
        prompt: "Parse this CSV for customer churn by month.",
        response:
          "From Jan to May, average churn rate is 7.4%. March shows an outlier spike at 12.6%.",
      },
      {
        prompt: "Extract all invoice totals from this PDF.",
        response:
          "Found 8 invoice totals ranging from $500 to $4,200. Compiled into a summary list.",
      },
      {
        prompt: "What’s the contract renewal date in this document?",
        response:
          "The renewal date is listed as August 15, 2025 in section 4.3.",
      },
    ],
  },
  {
    key: "memory",
    name: "Memory",
    description:
      "Teach Donna facts once — she’ll remember securely and privately.",
    icon: <FaBrain size={32} className="text-rose-500" />,
    integrations: ["Donna Private Memory"],
    prompts: [
      {
        prompt: "My Wi-Fi at home is Netgear_208. Remember that.",
        response:
          "Got it — I’ve saved your home network details for future use.",
      },
      {
        prompt: "My license plate is 7DJF382. Save it.",
        response:
          "Stored in your memory under personal details. You can retrieve or update it anytime.",
      },
      {
        prompt: "My assistant’s name is Mia. Keep that in mind.",
        response:
          "Noted. I’ll remember Mia is your assistant for future reference.",
      },
      {
        prompt: "Log my IRS pin as 72839 for tax tools.",
        response:
          "Stored securely under personal tax info. You can access or update this anytime.",
      },
    ],
  },
];

const SAMPLE_USER_ICONS = [
  "https://i.pravatar.cc/150?img=3",
  "https://i.pravatar.cc/150?img=5",
  "https://i.pravatar.cc/150?img=8",
];

export default function ExploreScreen() {
  const [selected, setSelected] = useState(CATEGORIES[0]);
  const [messages, setMessages] = useState([]);
  const [userIconIdx, setUserIconIdx] = useState(0);

  const handlePrompt = ({ prompt, response }) => {
    const nextIcon = (userIconIdx + 1) % SAMPLE_USER_ICONS.length;
    setUserIconIdx(nextIcon);
    setMessages([
      { role: "user", content: prompt, icon: SAMPLE_USER_ICONS[nextIcon] },
      {
        role: "donna",
        content: response,
        icon: "/assets/images/DonnaCircleColored.png",
      },
    ]);
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
        <section className="px-6 py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-rose-500 mb-6">
            Explore Donna
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            Click a category below to see what Donna can do and try it yourself.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {CATEGORIES.map((cat) => (
              <motion.button
                layout
                key={cat.key}
                onClick={() => {
                  setSelected(cat);
                  setMessages([]);
                }}
                className={`rounded-xl border p-4 text-left shadow-sm transition hover:shadow-md ${
                  selected.key === cat.key
                    ? "border-rose-500"
                    : "border-gray-200 dark:border-gray-700"
                } bg-card dark:bg-card-dark`}
              >
                <div className="flex items-center gap-4">
                  <div>{cat.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-rose-600">
                      {cat.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {cat.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <motion.div
            layout
            className="max-w-4xl mx-auto text-left mb-10 card-surface"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-rose-500 mb-4">
              {selected.name}
            </h2>
            <p className="text-gray-700 dark:text-gray-200 mb-2">
              {selected.description}
            </p>

            <div className="flex gap-2 mb-6 flex-wrap items-center">
              {selected.integrations?.map((name, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-gray-300 dark:border-gray-600 px-5 py-4 bg-input dark:bg-input-dark text-gray-900 dark:text-gray-100 shadow-sm transition-colors flex items-center gap-2"
                >
                  {INTEGRATION_ICONS[name] || null}
                  <span>{name}</span>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {selected.prompts.map((ex, i) => (
                <motion.button
                  key={i}
                  onClick={() => handlePrompt(ex)}
                  className="input-field text-left hover:shadow-md"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-rose-600 font-medium">{ex.prompt}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <div className="max-w-2xl mx-auto card-surface space-y-4">
            {messages.length === 0 ? (
              <p className="text-center text-gray-400 py-12 dark:text-gray-500">
                Try a prompt above to preview how Donna responds.
              </p>
            ) : (
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex items-start gap-3"
                  >
                    <img
                      src={msg.icon}
                      alt=""
                      className="w-8 h-8 rounded-full mt-1"
                    />
                    <div
                      className={`rounded-xl px-4 py-3 max-w-[85%] text-sm ${
                        msg.role === "user"
                          ? "bg-blue-100 ml-auto dark:bg-blue-800 text-white"
                          : "bg-gray-200 mr-auto dark:bg-gray-600 text-white"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          <div className="mt-12">
            <p className="text-gray-500 dark:text-gray-300 mb-2">
              Want to talk to the real Donna?
            </p>
            <button
              onClick={() => (window.location.href = "/waitlist")}
              className="button-primary"
            >
              Join the Waitlist
            </button>
          </div>
        </section>
      </motion.div>
    </>
  );
}
