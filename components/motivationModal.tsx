"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MotivationModalProps {
  show: boolean;
  onClose: () => void;
  message?: string;
  username?: string;
}

export default function MotivationModal({
  show,
  onClose,
  message,
  username,
}: MotivationModalProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 relative overflow-hidden border border-white/10"
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-pink-500/10 blur-3xl animate-pulse" />
            <div className="relative z-10 text-center">
              <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
                Hey {username || "You"}
              </h2>
              <p className="font-semibold">Github actually says</p>
              <hr className="mt-2 mb-2.5" />
              <p className="text-neutral-700 dark:text-neutral-300 mb-6">
                {message || "Keep going — you’re doing amazing things."}
              </p>
              <button
                onClick={onClose}
                className="bg-primary text-white cursor-pointer px-6 py-2 rounded-lg font-medium hover:scale-105 transition-transform duration-300"
              >
                Keep Grinding 💪
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
