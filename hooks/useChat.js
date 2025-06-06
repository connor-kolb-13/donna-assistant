// hooks/useChat.js
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../src/firebase";

export function useChat(uid, conversationId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid || !conversationId) return;
    const q = query(
      collection(db, "users", uid, "conversations", conversationId, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => unsub();
  }, [uid, conversationId]);

  const sendMessage = async (text) => {
    await addDoc(
      collection(db, "users", uid, "conversations", conversationId, "messages"),
      {
        content: text,
        sender: "user",
        timestamp: serverTimestamp(),
        medium: "chat",
        processed: false,
        syncedToNotion: false,
      }
    );
  };

  return { messages, loading, sendMessage };
}
