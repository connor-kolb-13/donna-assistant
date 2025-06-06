import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { Sidebar } from "../components/Sidebar";
import { ChatWindow } from "../components/ChatWindow";
import { useChat } from "../../hooks/useChat";
import { motion } from "framer-motion";

export default function ChatScreen() {
  const { id: conversationId } = useParams();
  const navigate = useNavigate();
  const [uid, setUid] = useState(null);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const snapshot = await getDocs(
          collection(db, "users", user.uid, "conversations")
        );
        const convs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setConversations(convs);
      } else {
        navigate("/login");
      }
    });
    return () => unsub();
  }, [navigate]);

  const { messages, loading, sendMessage } = useChat(uid, conversationId);

  const handleNewChat = async () => {
    const ref = await addDoc(collection(db, "users", uid, "conversations"), {
      title: "New Chat",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    await addDoc(
      collection(db, "users", uid, "conversations", ref.id, "messages"),
      {
        content: "Hi there! I'm Donna. What would you like help with today?",
        sender: "assistant",
        timestamp: serverTimestamp(),
        processed: true,
        medium: "chat",
      }
    );

    navigate(`/chat/${ref.id}`);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.3 }}
        className="bg-background dark:bg-background-dark min-h-[calc(100vh-128px)] transition-colors"
      >
        <div className="flex h-[calc(100vh-128px)] overflow-hidden">
          <Sidebar conversations={conversations} onNewChat={handleNewChat} />
          <ChatWindow
            messages={messages}
            onSend={sendMessage}
            loading={loading}
          />
        </div>
      </motion.div>
    </>
  );
}
