import React from "react";
import { motion } from "framer-motion";
import {
  SiGoogle,
  SiOpenai,
  SiNotion,
  SiGithub,
  SiSlack,
  SiZoom,
  SiDropbox,
  SiLinkedin,
} from "react-icons/si";

const integrations = [
  SiGoogle,
  SiOpenai,
  SiNotion,
  SiGithub,
  SiSlack,
  SiZoom,
  SiDropbox,
  SiLinkedin,
];

export default function PartnerLogoCarousel() {
  return (
    <section className="py-20 bg-background dark:bg-background-dark transition-colors border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-center text-3xl font-semibold text-gray-800 dark:text-white mb-12">
        Seamlessly integrates with your favorite tools
      </h2>

      <div className="relative overflow-hidden w-full max-w-6xl mx-auto">
        {/* Left gradient mask */}
        <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-background dark:from-background-dark to-transparent z-10 pointer-events-none" />
        {/* Right gradient mask */}
        <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-background dark:from-background-dark to-transparent z-10 pointer-events-none" />

        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-33.3333%" }}
          transition={{
            repeat: Infinity,
            duration: 36,
            ease: "linear",
          }}
          className="flex gap-20 items-center min-w-[300%] px-6"
        >
          {[...integrations, ...integrations, ...integrations].map(
            (Icon, index) => (
              <div
                key={index}
                className="flex items-center justify-center rounded-2xl p-4 shadow-sm bg-card dark:bg-card-dark transition-shadow"
              >
                <Icon
                  size={32}
                  className="text-gray-400 dark:text-gray-500 hover:text-rose-500 transition-colors"
                  title="Integration"
                />
              </div>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
