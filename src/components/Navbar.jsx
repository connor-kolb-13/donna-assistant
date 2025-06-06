import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { auth, db } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { FaUserCircle } from "react-icons/fa";
import { useUser } from "../context/UserContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef();
  const { theme } = useTheme();
  const { profile } = useUser();
  const [currentUser, setCurrentUser] = useState(null);
  const firstName = profile?.firstName || "User";
  const profilePic = profile?.profilePic || "";

  const closeTimerRef = useRef();
  const hoverTimeout = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFirstName(data.firstName || "User");
          setProfilePic(data.profilePic || "");
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const isActive = (path) =>
    pathname === path
      ? "text-rose-600 font-semibold"
      : "text-gray-600 hover:text-rose-500 dark:text-gray-300 dark:hover:text-rose-400";

  const homePath = currentUser ? "/dashboard" : "/";

  return (
    <nav className="bg-background dark:bg-background-dark border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm transition-colors">
      <Link to={homePath} className="flex items-center gap-2">
        <img
          src="/assets/images/DonnaAppIcon.png"
          alt="Donna Logo"
          className="w-8 h-8 rounded-full"
        />
      </Link>

      <div className="hidden md:flex gap-5 items-center">
        {!currentUser ? (
          <>
            <Link to="/" className={isActive("/")}>
              Home
            </Link>
            <Link to="/explore" className={isActive("/explore")}>
              Explore Donna
            </Link>
            <Link to="/waitlist" className={isActive("/waitlist")}>
              Join Waitlist
            </Link>
            <button
              onClick={() => navigate("/login")}
              className="bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm px-4 py-2 rounded-xl shadow"
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm px-4 py-2 rounded-xl shadow"
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            <Link to="/dashboard" className={isActive("/dashboard")}>
              Dashboard
            </Link>
            <Link to="/chat" className={isActive("/chat")}>
              Chat
            </Link>
            <div
              className="relative"
              onMouseEnter={() => {
                clearTimeout(hoverTimeout.current);
                setMenuOpen(true);
              }}
              onMouseLeave={() => {
                hoverTimeout.current = setTimeout(() => {
                  setMenuOpen(false);
                }, 200); // 200ms delay on leave
              }}
            >
              <button className="flex items-center gap-2 text-rose-500 hover:text-rose-600 focus:outline-none">
                {firstName && (
                  <span className="hidden md:inline text-sm font-medium text-gray-800 dark:text-white">
                    {firstName}
                  </span>
                )}
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full border-2 border-rose-400"
                  />
                ) : (
                  <FaUserCircle className="w-8 h-8 text-rose-500" />
                )}
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-background dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg text-sm z-50 overflow-hidden divide-y divide-gray-100 dark:divide-gray-700">
                  {[
                    { route: "", label: "Home" },
                    { route: "explore", label: "Explore Donna" },
                    { route: "settings", label: "Settings" },
                    { route: "referrals", label: "Referrals" },
                    { route: "integrations", label: "Integrations" },
                    { route: "billing", label: "Billing" },
                    { route: "help", label: "Help" },
                  ].map(({ route, label }) => (
                    <button
                      key={route}
                      onClick={() => {
                        navigate(`/${route}`);
                        setMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-input-dark text-gray-800 dark:text-gray-200 transition-colors"
                    >
                      {label}
                    </button>
                  ))}

                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-input-dark text-red-600 dark:text-red-400 transition-colors"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background dark:bg-background-dark px-6 py-4 border-t border-gray-200 dark:border-gray-700 shadow-md flex flex-col gap-4 md:hidden z-40">
          {!currentUser ? (
            <>
              <Link
                to="/"
                className={isActive("/")}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/explore"
                className={isActive("/explore")}
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore Donna
              </Link>
              <Link
                to="/waitlist"
                className={isActive("/waitlist")}
                onClick={() => setMobileMenuOpen(false)}
              >
                Join Waitlist
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/login");
                }}
                className="bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm px-4 py-2 rounded-xl shadow"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/signup");
                }}
                className="bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm px-4 py-2 rounded-xl shadow"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className={isActive("/dashboard")}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/chat"
                className={isActive("/chat")}
                onClick={() => setMobileMenuOpen(false)}
              >
                Chat
              </Link>
              {[
                { route: "", label: "Home" },
                { route: "explore", label: "Explore Donna" },
                { route: "settings", label: "Settings" },
                { route: "referrals", label: "Referrals" },
                { route: "integrations", label: "Integrations" },
                { route: "billing", label: "Billing" },
                { route: "help", label: "Help" },
              ].map(({ route, label }) => (
                <button
                  key={route}
                  onClick={() => {
                    navigate(`/${route}`);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left capitalize"
                >
                  {label}
                </button>
              ))}

              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="text-left text-red-600 dark:text-red-400"
              >
                Log Out
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
