import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import InputBar from "./InputBar";

export function ChatWindow({ messages, onSend, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const showWelcome = messages.length === 0 && !loading;

  return (
    <motion.main
      className="flex-1 flex flex-col justify-between h-full bg-background dark:bg-background-dark transition-colors"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-8 space-y-4">
        {showWelcome && (
          <div className="text-center pt-20 pb-12 text-gray-500 dark:text-gray-400 space-y-4">
            <img
              src="/assets/images/DonnaCircleColored.png"
              alt="Donna avatar"
              className="w-24 h-24 mx-auto rounded-full border-4 border-rose-300 shadow-md"
            />
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              Hi, I'm Donna. What would you like help with today?
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Start a conversation and I’ll take care of the rest ✨
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <MessageBubble key={msg.id} {...msg} />
        ))}

        {loading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      <div className="bg-background dark:bg-background-dark px-4 py-4 border-t border-gray-200 dark:border-gray-700 shadow-inner">
        <InputBar onSend={onSend} />
      </div>
    </motion.main>
  );
}
