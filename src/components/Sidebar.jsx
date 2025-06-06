import React from "react";
import { Link, useParams } from "react-router-dom";

export function Sidebar({ conversations, onNewChat }) {
  const { id: activeId } = useParams();

  return (
    <aside className="w-72 bg-card dark:bg-card-dark border-r border-gray-200 dark:border-gray-700 p-4 space-y-4 overflow-y-auto transition-colors">
      <button
        onClick={onNewChat}
        className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 rounded-xl shadow transition-colors"
      >
        + New Chat
      </button>

      <div className="space-y-1">
        {conversations.map((conv) => (
          <Link
            key={conv.id}
            to={`/chat/${conv.id}`}
            className={`block px-4 py-2 rounded-xl text-sm font-medium truncate transition-colors ${
              activeId === conv.id
                ? "bg-rose-100 text-rose-700 dark:bg-rose-800 dark:text-rose-100"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-background-input"
            }`}
          >
            {conv.title || "Untitled"}
          </Link>
        ))}
      </div>
    </aside>
  );
}
