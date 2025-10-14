"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { useTheme } from "next-themes";
import FancyThemeToggle from "./fancythemetoggle";

export default function Navbar() {
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Staggered animation for children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const navVariants = {
    hidden: { y: -100, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
        delay: 0.1,
      },
    },
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 mx-auto mt-4 max-w-6xl px-6 rounded-full border backdrop-blur-lg transition-all duration-300
        ${
          scrolled
            ? "bg-white/50 dark:bg-neutral-900/40 border-white/40 dark:border-neutral-800/50 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            : "bg-white/40 dark:bg-neutral-900/30 border-white/30 dark:border-neutral-800/30 shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)]"
        }`}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-between py-3"
      >
        {/* Logo */}
        <motion.div
          variants={itemVariants}
          whileHover={{
            scale: 1.05,
            rotate: [0, -5, 5, -5, 0],
            transition: { duration: 0.5 },
          }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 select-none cursor-pointer"
        >
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Github className="w-6 h-6 text-gray-800 dark:text-gray-100" />
          </motion.div>
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-100 relative">
            GitHubSays
            <motion.span
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-indigo-400 dark:to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
            />
          </span>
        </motion.div>

        <div className="flex items-center gap-6">
          <motion.a
            variants={itemVariants}
            href="#how-it-works"
            whileHover={{
              scale: 1.08,
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
            className="relative text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
          >
            How it works
            <motion.span
              className="absolute -bottom-1 left-0 h-0.5 bg-gray-900 dark:bg-white"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          <motion.div
            variants={itemVariants}
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <FancyThemeToggle />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
      />
    </motion.nav>
  );
}
