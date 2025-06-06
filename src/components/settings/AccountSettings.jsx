import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db, storage } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { User } from "lucide-react";
import { FaSpinner } from "react-icons/fa";
import { useUser } from "../../context/UserContext";

export default function AccountSettings() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profilePic: "",
    timeZone: "",
    phoneNumber: "",
    locationCity: "",
    locationState: "",
  });

  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { setProfile } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        setUserId(user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setForm({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            profilePic: data.profilePic || "",
            timeZone: data.timeZone || "",
            phoneNumber: data.phoneNumber || "",
            locationCity: data.locationCity || "",
            locationState: data.locationState || "",
          });
        }
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !userId) return;

    try {
      setUploading(true);
      const storageRef = ref(storage, `profilePics/${userId}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // Update state for immediate visual feedback
      setForm((prev) => ({ ...prev, profilePic: downloadURL }));

      // Persist to Firestore immediately
      const docRef = doc(db, "users", userId);
      await updateDoc(docRef, { profilePic: downloadURL });
      //  Update nav
      const updatedProfile = {
        ...form,
        uid: userId,
      };

      // Sync with UserContext so Navbar updates
      setProfile(updatedProfile);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;

    setIsSaving(true);

    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      profilePic: form.profilePic,
      timeZone: form.timeZone,
      phoneNumber: form.phoneNumber,
      locationCity: form.locationCity,
      locationState: form.locationState,
    });

    setUpdateSuccess(true);
    setIsSaving(false);
    //  Update nav
    const updatedProfile = {
      ...form,
      uid: userId,
    };

    // Sync with UserContext so Navbar updates
    setProfile(updatedProfile);
    setTimeout(() => setUpdateSuccess(false), 3000);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="px-6 py-12 max-w-4xl mx-auto"
    >
      <motion.div layout className="flex flex-col items-center gap-3 mb-8">
        {form.profilePic ? (
          <motion.img
            key={form.profilePic}
            src={form.profilePic}
            alt="User avatar"
            className="w-32 h-32 rounded-full object-cover shadow-lg border-2 border-white dark:border-gray-700"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 shadow-lg"
          >
            <User className="w-12 h-12" />
          </motion.div>
        )}

        <label className="px-4 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition cursor-pointer">
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          {uploading ? "Uploading..." : "Update Photo"}
        </label>
      </motion.div>

      <section className="card-surface">
        <h2 className="text-xl font-semibold text-white mb-6 tracking-tight">
          Profile Information
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5"
        >
          {[
            { label: "First Name", name: "firstName" },
            { label: "Last Name", name: "lastName" },
            { label: "Email", name: "email", span: 2 },
            { label: "Phone Number", name: "phoneNumber", type: "tel" },
            {
              label: "Time Zone",
              name: "timeZone",
              type: "select",
              options: [
                {
                  label: "Eastern Standard (US/NY)",
                  value: "America/New_York",
                },
                {
                  label: "Central Standard (US/Chicago)",
                  value: "America/Chicago",
                },
                {
                  label: "Mountain Standard (US/Denver)",
                  value: "America/Denver",
                },
                {
                  label: "Pacific Standard (US/LA)",
                  value: "America/Los_Angeles",
                },
              ],
            },
            { label: "City", name: "locationCity" },
            {
              label: "State",
              name: "locationState",
              type: "select",
              options: [
                "AL",
                "AK",
                "AZ",
                "AR",
                "CA",
                "CO",
                "CT",
                "DE",
                "FL",
                "GA",
                "HI",
                "ID",
                "IL",
                "IN",
                "IA",
                "KS",
                "KY",
                "LA",
                "ME",
                "MD",
                "MA",
                "MI",
                "MN",
                "MS",
                "MO",
                "MT",
                "NE",
                "NV",
                "NH",
                "NJ",
                "NM",
                "NY",
                "NC",
                "ND",
                "OH",
                "OK",
                "OR",
                "PA",
                "RI",
                "SC",
                "SD",
                "TN",
                "TX",
                "UT",
                "VT",
                "VA",
                "WA",
                "WV",
                "WI",
                "WY",
              ].map((s) => ({ label: s, value: s })),
            },
          ].map((field, i) => (
            <div key={i} className={field.span === 2 ? "sm:col-span-2" : ""}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                {field.label}
              </label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((opt) =>
                    typeof opt === "string" ? (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ) : (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    )
                  )}
                </select>
              ) : (
                <input
                  type={field.type || "text"}
                  name={field.name}
                  className="input-field"
                  value={form[field.name]}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}

          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            disabled={isSaving}
            className={`button-primary sm:col-span-2 mt-2 flex items-center justify-center gap-2 ${
              isSaving ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {isSaving ? (
              <>
                <FaSpinner className="animate-spin" /> Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </motion.button>
        </form>

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
      </section>
    </motion.div>
  );
}
