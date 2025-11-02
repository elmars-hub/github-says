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
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          {/* Animated backdrop */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15), transparent 50%)",
                "radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.15), transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15), transparent 50%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <motion.div
            className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 relative overflow-hidden border border-white/10"
            initial={{ scale: 0.8, opacity: 0, y: 40, rotateY: -15 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotateY: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40, rotateY: 15 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
              mass: 0.8,
            }}
            onClick={(e) => e.stopPropagation()}
            style={{ perspective: 1000 }}
          >
            {/* Enhanced animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-pink-500/10"
              animate={{
                background: [
                  "radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.15), transparent 70%)",
                  "radial-gradient(circle at 100% 100%, rgba(236, 72, 153, 0.15), transparent 70%)",
                  "radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.15), transparent 70%)",
                ],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            <div className="relative z-10 text-center">
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2"
              >
                Hey{" "}
                <motion.span
                  className="inline-block"
                  animate={{ rotate: [0, -5, 5, -5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  {username || "You"}
                </motion.span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="font-semibold"
              >
                Github actually says
              </motion.p>
              <motion.hr
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-2 mb-2.5"
              />
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed"
              >
                {message || "Keep going — you're doing amazing things."}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={onClose}
                  className="bg-primary text-white cursor-pointer px-6 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 w-full"
                >
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                    className="inline-block"
                  >
                    💪
                  </motion.span>{" "}
                  Keep Grinding
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
