import React from "react";

export default function MessageBubble({ sender, content }) {
  const isUser = sender === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } items-end gap-2 px-4`}
    >
      {!isUser && (
        <img
          src="/assets/images/DonnaAvatar.png"
          alt="Donna"
          className="w-8 h-8 rounded-full border-2 border-rose-400 shadow-sm"
        />
      )}
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm text-sm md:text-base whitespace-pre-wrap transition-colors ${
          isUser
            ? "bg-[#D1E8FF] text-gray-800 dark:bg-blue-300"
            : "bg-[#E2E2E2] dark:bg-background-input dark:text-gray-100 text-gray-900"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
