"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, Share2 } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface MotivationCardProps {
  message: string;
  username: string;
}

const MotivationCard = ({ message, username }: MotivationCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const handleShare = () => {
    const shareText = `Just got roasted by GitHub! 🔥\n\nBut then GitHub said: "${message}"\n\nGet your GitHub roast at: ${window.location.origin}`;

    if (navigator.share) {
      navigator
        .share({
          title: "My GitHub Motivation",
          text: shareText,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      toast("Copied to clipboard! 📋");
    }
  };

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        {
          rotationY: 180,
          opacity: 0,
          scale: 0.5,
        },
        {
          rotationY: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        }
      );
    }

    // Floating particles animation with GSAP
    if (particlesRef.current) {
      const particles = particlesRef.current.children;
      Array.from(particles).forEach((particle, i) => {
        gsap.to(particle, {
          y: -30,
          x: Math.random() * 40 - 20,
          opacity: 0,
          duration: 2,
          delay: i * 0.1,
          repeat: -1,
          ease: "power1.out",
        });
      });
    }
  }, []);

  return (
    <motion.div
      initial={{ y: 50 }}
      animate={{ y: 0 }}
      className="w-full max-w-2xl mx-auto mt-6 relative"
    >
      {/* Floating particles */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 w-2 h-2 bg-primary/50 rounded-full"
            style={{ left: `${(i + 1) * 12}%` }}
          />
        ))}
      </div>

      <div
        ref={cardRef}
        className=" rounded-3xl p-8 border-2 border-primary/30 relative overflow-hidden"
        style={{ perspective: "1000px" }}
      >
        {/* Animated gradient background */}
        <motion.div
          animate={{
            background: [
              "linear-gradient(135deg, hsl(265 85% 65% / 0.1), hsl(200 85% 60% / 0.1))",
              "linear-gradient(135deg, hsl(200 85% 60% / 0.1), hsl(265 85% 65% / 0.1))",
              "linear-gradient(135deg, hsl(265 85% 65% / 0.1), hsl(200 85% 60% / 0.1))",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 -z-10"
        />

        <div className="flex items-center gap-3 mb-6">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Heart className="w-8 h-8 text-primary fill-primary" />
          </motion.div>
          <h3 className="text-2xl font-bold text-gradient flex items-center gap-2">
            GitHub Actually Says...
            <Sparkles className="w-5 h-5 text-secondary" />
          </h3>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl font-medium leading-relaxed"
        >
          {message}
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-6 h-1 bg-primary rounded-full"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6"
        >
          <Button
            onClick={handleShare}
            className="w-full bg-primary transition-opacity cursor-pointer py-6 rounded-xl font-bold  flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share Your Journey
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MotivationCard;
