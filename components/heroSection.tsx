"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  username: string;
  setUsername: (value: string) => void;
  loading: boolean;
  handleRoast: () => void;
}

export default function HeroSection({
  username,
  setUsername,
  loading,
  handleRoast,
}: HeroSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0.3 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0.5, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="relative z-10 pt-40 pb-20 px-4 sm:px-6 md:px-8 text-center max-w-4xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          What does your{" "}
          <motion.span
            className="text-primary inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            GitHub profile
          </motion.span>{" "}
          say about you?{" "}
          <motion.span
            animate={{ rotate: [0, 14, -8, 14, -8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
            className="inline-block"
          >
            👀
          </motion.span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Type your username and let's see what the data has to say... if you
          dare
        </motion.p>

        {!loading && (
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto w-full"
          >
            <motion.div
              className="relative flex-1 w-full"
              whileFocus={{ scale: 1.02 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10"
              >
                <Search className="w-5 h-5 text-primary" />
              </motion.div>
              <Input
                type="text"
                placeholder="Enter GitHub username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRoast()}
                className="pl-10 h-12 border border-primary/30 focus:border-primary text-base sm:text-lg rounded-xl bg-white/70 dark:bg-neutral-900/60 backdrop-blur-md transition-all hover:border-primary/50 relative z-0"
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleRoast}
                disabled={loading}
                className="h-12 w-full sm:w-auto px-6 sm:px-8 bg-primary text-white font-semibold text-base sm:text-lg rounded-xl transition-transform duration-200 shadow-lg hover:shadow-xl"
              >
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-block"
                >
                  🔥
                </motion.span>{" "}
                Roast Me
              </Button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
