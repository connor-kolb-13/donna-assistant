import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

export default function InputBar({ onSend }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card dark:bg-card-dark border-t border-gray-200 dark:border-gray-700 px-4 py-3 flex gap-3 items-center transition-colors"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-4 py-3 rounded-xl bg-background-input dark:bg-background-input-dark border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all shadow-sm"
      />
      <button
        type="submit"
        className="p-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl shadow-sm transition-colors"
      >
        <FaPaperPlane size={16} />
      </button>
    </form>
  );
}
