// context/UserContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setUser(authUser);

      if (authUser) {
        const snap = await getDoc(doc(db, "users", authUser.uid));
        if (snap.exists()) {
          setProfile({ uid: authUser.uid, ...snap.data() });
        }
      } else {
        setProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, profile, setProfile }}>
      {children}
    </UserContext.Provider>
  );
}
