"use client";

import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function FancyThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isLight = theme === "light";

  const handleToggle = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Trigger the page transition
    triggerThemeTransition(isLight);

    // Delay the actual theme change slightly for smooth transition
    setTimeout(() => {
      setTheme(isLight ? "dark" : "light");
    }, 400);

    setTimeout(() => setIsAnimating(false), 1500);
  };

  const triggerThemeTransition = (isCurrentlyLight: any) => {
    // Create transition overlay
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      cursor: pointer;
    `;
    document.body.appendChild(overlay);

    if (isCurrentlyLight) {
      // Light to Dark: Ink blob transition
      createInkBlobTransition(overlay);
    } else {
      // Dark to Light: Ink blob transition (same effect)
      createInkBlobTransition(overlay, true);
    }

    // Remove overlay after animation
    setTimeout(() => {
      overlay.remove();
    }, 1500);
  };

  const createInkBlobTransition = (container: any, isLightMode = false) => {
    // Create multiple ink blobs that expand
    const blobCount = 8;

    for (let i = 0; i < blobCount; i++) {
      const blob = document.createElement("div");
      const angle = (i / blobCount) * Math.PI * 2;
      const centerX = window.innerWidth / 2;
      const centerY = 100; // Near top where button is

      const gradient = isLightMode
        ? `radial-gradient(circle, #fef3c7 0%, #fed7aa 50%, #fbbf24 100%)`
        : `radial-gradient(circle, #1a1a2e 0%, #0f0f1e 100%)`;

      blob.style.cssText = `
        position: absolute;
        left: ${centerX}px;
        top: ${centerY}px;
        width: 50px;
        height: 50px;
        background: ${gradient};
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: inkSpread ${
          0.8 + i * 0.1
        }s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        filter: blur(20px);
      `;

      container.appendChild(blob);
    }

    // Main overlay
    const mainOverlay = document.createElement("div");
    const mainGradient = isLightMode
      ? `radial-gradient(circle, rgba(254,243,199,0.9) 0%, rgba(254,243,199,0) 70%)`
      : `radial-gradient(circle, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0) 70%)`;

    mainOverlay.style.cssText = `
      position: absolute;
      top: 100px;
      left: 50%;
      width: 100px;
      height: 100px;
      background: ${mainGradient};
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: expandDark 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    `;
    container.appendChild(mainOverlay);

    // Add keyframes if not already present
    if (!document.getElementById("ink-animation-styles")) {
      const style = document.createElement("style");
      style.id = "ink-animation-styles";
      style.textContent = `
        @keyframes inkSpread {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(40);
            opacity: 0;
          }
        }
        @keyframes expandDark {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(50);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  };

  // Particle positions for explosion effect
  const particles = Array.from({ length: 8 }, (_, i) => ({
    angle: (i * 360) / 8,
    delay: i * 0.03,
  }));

  return (
    <motion.button
      onClick={handleToggle}
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.05 }}
      disabled={isAnimating}
      className="relative flex items-center cursor-pointer justify-center w-14 h-14 rounded-full bg-gradient-to-br from-white/30 to-white/10 dark:from-gray-800/40 dark:to-gray-900/40 backdrop-blur-xl border border-white/40 dark:border-gray-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-visible"
    >
      {/* Ripple effect on toggle */}
      <AnimatePresence>
        {isAnimating && (
          <>
            <motion.div
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/40 to-indigo-500/40 dark:from-indigo-500/40 dark:to-yellow-400/40"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ scale: 3.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300/30 to-purple-500/30 dark:from-purple-500/30 dark:to-yellow-300/30"
            />
          </>
        )}
      </AnimatePresence>

      {/* Particles explosion */}
      <AnimatePresence>
        {isAnimating &&
          particles.map((particle, i) => (
            <motion.div
              key={i}
              initial={{
                x: 0,
                y: 0,
                scale: 0,
                opacity: 1,
              }}
              animate={{
                x: Math.cos((particle.angle * Math.PI) / 180) * 40,
                y: Math.sin((particle.angle * Math.PI) / 180) * 40,
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 0.6,
                delay: particle.delay,
                ease: "easeOut",
              }}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                background: isLight
                  ? "linear-gradient(135deg, #fbbf24, #f59e0b)"
                  : "linear-gradient(135deg, #818cf8, #6366f1)",
                boxShadow: isLight ? "0 0 8px #fbbf24" : "0 0 8px #818cf8",
              }}
            />
          ))}
      </AnimatePresence>

      {/* Main icon container */}
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isLight ? (
            <motion.div
              key="sun"
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{
                scale: 1,
                rotate: 0,
                opacity: 1,
              }}
              exit={{
                scale: 0,
                rotate: 180,
                opacity: 0,
                filter: "blur(8px)",
              }}
              transition={{
                duration: 0.5,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="absolute"
            >
              {/* Sun center */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: 360,
                }}
                transition={{
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  rotate: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
                className="relative w-6 h-6 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 shadow-[0_0_20px_rgba(251,191,36,0.6)]"
              >
                {/* Sun rays */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-1 h-3 bg-gradient-to-t from-yellow-400 to-transparent rounded-full origin-bottom"
                    style={{
                      transform: `translate(-50%, -100%) rotate(${
                        i * 45
                      }deg) translateY(-8px)`,
                    }}
                    animate={{
                      scaleY: [1, 1.3, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ scale: 0, rotate: 180, opacity: 0 }}
              animate={{
                scale: 1,
                rotate: 0,
                opacity: 1,
              }}
              exit={{
                scale: 0,
                rotate: -180,
                opacity: 0,
                filter: "blur(8px)",
              }}
              transition={{
                duration: 0.5,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="absolute"
            >
              {/* Moon */}
              <div className="relative w-6 h-6">
                <motion.div
                  animate={{
                    y: [-1, 1, -1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative w-full h-full rounded-full bg-gradient-to-br from-indigo-300 to-indigo-500 shadow-[0_0_20px_rgba(129,140,248,0.6)]"
                >
                  {/* Moon craters */}
                  <div className="absolute top-2 left-1 w-1.5 h-1.5 rounded-full bg-indigo-600/40" />
                  <div className="absolute bottom-2 right-1.5 w-1 h-1 rounded-full bg-indigo-600/30" />
                  <div className="absolute top-3 right-1 w-1 h-1 rounded-full bg-indigo-600/20" />
                </motion.div>

                {/* Stars around moon */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1"
                    style={{
                      top: ["-4px", "12px", "-8px"][i],
                      left: ["-8px", "14px", "14px"][i],
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="w-full h-full bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Glow effect */}
      <motion.div
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-400/20 dark:from-indigo-400/20 dark:to-purple-400/20 blur-xl -z-10"
      />
    </motion.button>
  );
}
