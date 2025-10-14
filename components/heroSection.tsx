"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HeroSection({
  username,
  setUsername,
  loading,
  handleRoast,
}: any) {
  return (
    <section className="relative z-10 pt-40 pb-20 px-4 sm:px-6 md:px-8 text-center max-w-4xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
      >
        What does your <span className="text-primary">GitHub profile</span> say
        about you? 👀
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-base sm:text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
      >
        Type your username and let’s see what the data has to say... if you dare
      </motion.p>

      <AnimatePresence mode="wait">
        {!loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto w-full"
          >
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
              <Input
                type="text"
                placeholder="Enter GitHub username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRoast()}
                className="pl-10 h-12 border border-primary/30 focus:border-primary text-base sm:text-lg rounded-xl bg-white/70 dark:bg-neutral-900/60 backdrop-blur-md transition-all"
              />
            </div>

            <Button
              onClick={handleRoast}
              disabled={loading}
              className="h-12 w-full sm:w-auto px-6 sm:px-8 bg-primary text-white font-semibold text-base sm:text-lg rounded-xl hover:scale-105 transition-transform duration-200"
            >
              Roast Me 🔥
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
