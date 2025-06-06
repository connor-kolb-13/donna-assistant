import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DonnaChatLauncher from "../components/DonnaChatLauncher";
import {
  FaTasks,
  FaRobot,
  FaMemory,
  FaCalendarAlt,
  FaSyncAlt,
  FaFileAlt,
} from "react-icons/fa";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const docRef = doc(db, "users", user.uid);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        setUserData(snapshot.data());
      }
    };
    fetchData();
  }, []);

  const overview = [
    "Meeting with team @ 10:30am",
    "Grocery reminder at 4:00pm",
    "Finalize design doc by EOD",
  ];

  const assistantActivity = [
    'Email draft prepared: "Quarterly Update"',
    "Uploaded invoice.pdf from Outlook",
    "Generated summary of last week’s meetings",
  ];

  const memoryPreview =
    userData?.memory?.recentPreview ||
    "You asked me to remember: Use Concur for travel expenses.";

  const linkedServices = userData?.linkedServices || {};
  const usage = userData?.usage || {};

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-background dark:bg-background-dark min-h-screen px-6 py-10 transition-colors"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-rose-500 mb-2">
            Welcome back, {userData?.firstName || "User"} 👋
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Here's a quick snapshot of your day.
          </p>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <Card title="Today’s Overview" icon={<FaCalendarAlt />}>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                {overview.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </Card>

            <Card title="Recent Assistant Activity" icon={<FaRobot />}>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                {assistantActivity.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </Card>

            <Card title="Quick Actions" icon={<FaTasks />}>
              <div className="flex flex-wrap gap-3">
                {[
                  "Add Task",
                  "Upload File",
                  "Send Summary",
                  "Plan My Week",
                ].map((label) => (
                  <button
                    key={label}
                    className="button-primary text-sm px-4 py-2"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </Card>

            <Card title="Memory Preview" icon={<FaMemory />}>
              <p className="text-gray-700 dark:text-gray-300">
                {memoryPreview}
              </p>
            </Card>

            <Card title="Linked Services" icon={<FaSyncAlt />}>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                {Object.entries(linkedServices).map(([service, details]) => (
                  <li key={service}>
                    🔄 {service} –{" "}
                    {details.status ? "Connected" : "Not Connected"}
                  </li>
                ))}
              </ul>
            </Card>

            <Card title="Usage Summary" icon={<FaFileAlt />}>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li>🧠 GPT interactions: {usage.gptInteractions || 0}</li>
                <li>📁 Files uploaded: {usage.fileUploads || 0}</li>
                <li>📌 Tasks completed: {usage.tasksCompleted || 0}</li>
              </ul>
            </Card>
          </div>
        </div>
        <DonnaChatLauncher />
      </motion.div>
    </>
  );
}

function Card({ title, icon, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card-surface"
    >
      <h2 className="text-lg font-semibold text-rose-500 mb-4 flex items-center gap-2">
        {icon} {title}
      </h2>
      {children}
    </motion.div>
  );
}
