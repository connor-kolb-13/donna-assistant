import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import SignupScreen from "./pages/SignupScreen";
import LoginScreen from "./pages/LoginScreen";
import ForgotPassword from "./pages/ForgotPassword";
import WaitlistScreen from "./pages/WaitlistScreen";
import ExploreScreen from "./pages/ExploreScreen";
import Dashboard from "./pages/Dashboard";
import ChatScreen from "./pages/ChatScreen";
import Settings from "./pages/Settings";
import Referrals from "./pages/Referrals";
import Integrations from "./pages/Integrations";
import Billing from "./pages/Billing";
import Help from "./pages/Help";
import ContactUs from "./pages/ContactUs";
import "./styles/utilities.css";
import AccountSettings from "./components/settings/AccountSettings";
import LinkedServicesSettings from "./components/settings/LinkedServicesSettings";
import NotificationSettings from "./components/settings/NotificationSettings";
import MemorySettings from "./components/settings/MemorySettings";
import SecuritySettings from "./components/settings/SecuritySettings";
import BillingSettings from "./components/settings/BillingSettings";

import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/waitlist" element={<WaitlistScreen />} />
        <Route path="/explore" element={<ExploreScreen />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatScreen />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="account" replace />} />
          <Route path="account" element={<AccountSettings />} />
          <Route path="linked-services" element={<LinkedServicesSettings />} />
          <Route path="notifications" element={<NotificationSettings />} />
          <Route path="memory" element={<MemorySettings />} />
          <Route path="security" element={<SecuritySettings />} />
          <Route path="billing" element={<BillingSettings />} />
        </Route>
        <Route
          path="/referrals"
          element={
            <PrivateRoute>
              <Referrals />
            </PrivateRoute>
          }
        />
        <Route
          path="/integrations"
          element={
            <PrivateRoute>
              <Integrations />
            </PrivateRoute>
          }
        />
        <Route
          path="/billing"
          element={
            <PrivateRoute>
              <Billing />
            </PrivateRoute>
          }
        />
        <Route
          path="/help"
          element={
            <PrivateRoute>
              <Help />
            </PrivateRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
