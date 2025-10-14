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
    <section className="pt-32 pb-20 px-6 text-center max-w-4xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-bold mb-6"
      >
        Let GitHub tell you what it{" "}
        <span className="text-gradient">really thinks</span> of your code 👀
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-xl text-muted-foreground mb-12"
      >
        Enter your GitHub username and prepare to be roasted... then motivated
        🔥
      </motion.p>

      <AnimatePresence mode="wait">
        {!loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex gap-4 max-w-md mx-auto mb-8"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter GitHub username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRoast()}
                className="pl-10 h-12 border-primary/30 focus:border-primary text-lg"
              />
            </div>
            <Button
              onClick={handleRoast}
              disabled={loading}
              className="h-12 px-8 bg-primary font-bold text-lg neon-glow cursor-pointer"
            >
              Roast Me 🔥
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
