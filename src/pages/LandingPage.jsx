import React from "react";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import PartnerLogoCarousel from "../components/PartnerLogoCarousel";
import FeatureHighlightCards from "../components/FeatureHighlightCards";
import HowItWorksSection from "../components/HowItWorksSection";
import ScrollDownHint from "../components/ScrollDownHint";

export default function LandingPage() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.35 }}
        className="bg-background dark:bg-background-dark transition-colors"
      >
        <HeroSection />
        <ScrollDownHint />
        <FeatureHighlightCards />
        <HowItWorksSection />
        <PartnerLogoCarousel />
      </motion.div>
    </>
  );
}
