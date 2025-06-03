import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import LandingHero from "./components/LandingHero";
import SignupScreen from "./pages/SignupScreen";
import LoginScreen from "./pages/LoginScreen";
import WaitlistScreen from "./pages/WaitlistScreen";
import ExploreScreen from "./pages/ExploreScreen";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingHero />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/waitlist" element={<WaitlistScreen />} />
        <Route path="/explore" element={<ExploreScreen />} />
      </Routes>
    </AnimatePresence>
  );
}
