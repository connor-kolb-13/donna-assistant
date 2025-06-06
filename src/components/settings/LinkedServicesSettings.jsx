import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaGoogle,
  FaMicrosoft,
  FaSlack,
  FaFileAlt,
  FaCalendarAlt,
  FaProjectDiagram,
  FaPlug,
} from "react-icons/fa";

const services = [
  {
    name: "Google",
    serviceKey: "google",
    icon: <FaGoogle size={20} />,
  },
  {
    name: "Outlook",
    serviceKey: "outlook",
    icon: <FaMicrosoft size={20} />,
  },
  {
    name: "Concur",
    serviceKey: "concur",
    icon: <FaProjectDiagram size={20} />,
  },
  {
    name: "Slack",
    serviceKey: "slack",
    icon: <FaSlack size={20} />,
  },
  {
    name: "Notion",
    serviceKey: "notion",
    icon: <FaFileAlt size={20} />,
  },
  {
    name: "Zoom",
    serviceKey: "zoom",
    icon: <FaCalendarAlt size={20} />,
  },
];

export default function LinkedServicesOverview({
  linkedServices,
  linkedAccounts,
}) {
  const navigate = useNavigate();

  const getStatus = (key) => {
    const account = linkedAccounts?.[key];
    return account?.enabled || linkedServices?.[key]?.status;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-background dark:bg-background-dark min-h-[85vh]"
    >
      {services.map(({ name, serviceKey, icon }) => {
        const isConnected = getStatus(serviceKey);
        return (
          <div
            key={serviceKey}
            className="card-surface flex flex-col justify-between"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-lg font-semibold">
                <div className="text-gray-800 dark:text-gray-100">{icon}</div>
                <span>{name}</span>
              </div>

              <div className="text-sm text-muted-foreground">
                {isConnected ? "Connected" : "Not Connected"}
              </div>

              <div className="mt-auto">
                <button
                  className="button-primary w-full"
                  onClick={() =>
                    navigate(`/settings/linked-services/${serviceKey}`)
                  }
                >
                  {isConnected ? "Manage" : "Connect"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}
