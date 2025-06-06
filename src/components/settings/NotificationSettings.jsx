import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { FaSpinner } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const SECTION_LABEL =
  "text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2";

const DEFAULT_PREFS = {
  emailNudges: {
    emailSummaries: true,
    draftNudges: true,
    attachmentReminders: true,
    followUp: true,
  },
  reminderNotifications: {
    eventReminders: true,
    longTerm: true,
    forgetPrompts: true,
    leadTimeMin: 15,
    taskSummaryFreq: "daily",
  },
  dailyDigestEnabled: true,
  doNotDisturb: {
    enabled: false,
    start: "07:00",
    end: "23:00",
  },
};

export default function NotificationSettings() {
  const [user, setUser] = useState(null);
  const [prefs, setPrefs] = useState(null);
  const [docId, setDocId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savePending, setSavePending] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchPrefs = async () => {
      if (!user?.uid) return;
      const snapshot = await getDocs(
        collection(db, "users", user.uid, "notificationPreferences")
      );
      if (!snapshot.empty) {
        const firstDoc = snapshot.docs[0];
        setDocId(firstDoc.id);
        setPrefs(firstDoc.data());
      } else {
        const defaultDoc = doc(
          collection(db, "users", user.uid, "notificationPreferences")
        );
        await setDoc(defaultDoc, DEFAULT_PREFS);
        setDocId(defaultDoc.id);
        setPrefs(DEFAULT_PREFS);
      }
      setLoading(false);
    };
    fetchPrefs();
  }, [user]);

  const [updateSuccess, setUpdateSuccess] = useState(false);

  const updatePref = (path, value) => {
    const segments = path.split(".");
    const updated = { ...prefs };
    let target = updated;
    for (let i = 0; i < segments.length - 1; i++) {
      target = target[segments[i]] = target[segments[i]] || {};
    }
    target[segments.at(-1)] = value;
    setPrefs(updated);
  };

  const savePrefs = async () => {
    if (!docId || !prefs || !user?.uid) return;
    setSavePending(true);
    await setDoc(
      doc(db, "users", user.uid, "notificationPreferences", docId),
      prefs,
      { merge: true }
    );
    setSavePending(false);
    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 3000);
  };

  if (loading || !prefs) return <div className="p-6">Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="p-6 bg-background dark:bg-background-dark min-h-[85vh]"
    >
      <h2 className="text-xl font-bold mb-1">Notification Settings</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Control what Donna should notify you about.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-surface">
          <h3 className={SECTION_LABEL}>📧 Email</h3>
          {renderToggle(
            "emailNudges.emailSummaries",
            "Email Summaries",
            "Receive concise email summaries for daily performance.",
            prefs,
            updatePref
          )}
          {renderToggle(
            "emailNudges.draftNudges",
            "Draft Completion Nudges",
            "Reminders for unfinished emails or notes.",
            prefs,
            updatePref
          )}
          {renderToggle(
            "emailNudges.attachmentReminders",
            "Attachment Reminders",
            "Prompts when you mention attachments but haven’t added them.",
            prefs,
            updatePref
          )}
          {renderToggle(
            "emailNudges.followUp",
            "Email Follow-up Suggestions",
            "Alerts for following up on unanswered emails.",
            prefs,
            updatePref
          )}
        </div>

        <div className="card-surface">
          <h3 className={SECTION_LABEL}>📆 Calendar & Scheduling</h3>
          {renderToggle(
            "reminderNotifications.eventReminders",
            "Event Reminders",
            "Timely pings about upcoming calendar events.",
            prefs,
            updatePref
          )}
          {renderToggle(
            "dailyDigestEnabled",
            "Daily Briefings",
            "Morning recaps with agenda and goals.",
            prefs,
            updatePref
          )}
          {renderToggle(
            "reminderNotifications.leadTimeMin",
            "Event Conflict Alerts",
            "Early warnings when events overlap.",
            prefs,
            updatePref
          )}
        </div>

        <div className="card-surface">
          <h3 className={SECTION_LABEL}>🧠 Task & Memory</h3>
          {renderToggle(
            "reminderNotifications.taskSummaryFreq",
            "Pending Tasks Summary",
            "Highlight overdue and upcoming tasks.",
            prefs,
            updatePref
          )}
          {renderToggle(
            "reminderNotifications.longTerm",
            "Long-Term Reminders",
            "Recurring nudges for persistent tasks.",
            prefs,
            updatePref
          )}
          {renderToggle(
            "reminderNotifications.forgetPrompts",
            "Did you forget prompts",
            "Smart reminders when tasks are missed or ignored.",
            prefs,
            updatePref
          )}
        </div>

        <div className="card-surface">
          <h3 className={SECTION_LABEL}>⚙️ General</h3>
          <div className="flex flex-col gap-2 mt-2">
            {renderToggle(
              "doNotDisturb.enabled",
              "Only Allow Certain Times",
              "Restrict notifications to a custom daily time range.",
              prefs,
              updatePref
            )}
            {prefs?.doNotDisturb?.enabled && (
              <div className="flex gap-4 items-center text-sm mt-1">
                <div>
                  <label className="block text-muted-foreground text-xs">
                    Not before (ET)
                  </label>
                  <input
                    type="time"
                    value={prefs.doNotDisturb.start}
                    onChange={(e) =>
                      updatePref("doNotDisturb.start", e.target.value)
                    }
                    className="input-field mt-1"
                  />
                </div>
                <div>
                  <label className="block text-muted-foreground text-xs">
                    Not after (ET)
                  </label>
                  <input
                    type="time"
                    value={prefs.doNotDisturb.end}
                    onChange={(e) =>
                      updatePref("doNotDisturb.end", e.target.value)
                    }
                    className="input-field mt-1"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-10">
        <button
          className={`button-primary transition-all flex items-center gap-2 ${
            savePending ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={savePending}
          onClick={savePrefs}
        >
          {savePending ? (
            <>
              <FaSpinner className="animate-spin" /> Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </button>

        <button
          className="button-primary bg-red-600 hover:bg-red-700"
          onClick={() => {
            if (!docId) return;
            setPrefs({});
            setDoc(
              doc(db, "users", user.uid, "notificationPreferences", docId),
              {},
              { merge: true }
            );
          }}
        >
          Disable All
        </button>
      </div>

      <AnimatePresence>
        {updateSuccess && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="text-green-500 text-sm mt-5 text-center"
          >
            ✅ Account updated successfully.
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function renderToggle(path, label, desc, prefs, onChange) {
  const segments = path.split(".");
  let value = prefs;
  let valid = true;

  // Traverse safely and build nested path value
  for (const segment of segments) {
    if (value && typeof value === "object" && segment in value) {
      value = value[segment];
    } else {
      value = false; // fallback default for missing fields
      valid = false;
      break;
    }
  }

  const isBoolean = typeof value === "boolean" || !valid; // treat missing as false

  return (
    <div className="flex items-center justify-between mt-2 w-full">
      <div className="text-sm text-gray-800 dark:text-gray-100">
        <strong>{label}</strong> – {desc}
      </div>
      {isBoolean && (
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={!!value}
            onChange={(e) => onChange(path, e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 dark:peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
        </label>
      )}
    </div>
  );
}
