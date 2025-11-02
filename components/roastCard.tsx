"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Flame, Github, Star, GitFork, Share2, X } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useEffect } from "react";

interface RoastCardProps {
  userData: {
    login: string;
    avatar_url: string;
    public_repos: number;
    followers: number;
    following: number;
    name: string;
  };
  roast: string;
  onShowMercy: () => void;
  onShare?: () => void;
  onClose: () => void;
}

const AnimatedCounter = ({ value, delay = 0 }: { value: number; delay?: number }) => {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });
  const displayValue = useTransform(springValue, (current) =>
    Math.round(current)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      motionValue.set(value);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [value, delay, motionValue]);

  return <motion.span>{displayValue}</motion.span>;
};

const StatCard = ({
  icon: Icon,
  value,
  label,
  index,
}: {
  icon: React.ElementType;
  value: number;
  label: string;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 0.3 + index * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      whileHover={{ y: -5, scale: 1.05 }}
      className="glass rounded-xl p-4 text-center hover-lift cursor-pointer"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          delay: 0.4 + index * 0.1,
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
      >
        <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 + index * 0.1 }}
        className="text-2xl font-bold text-gradient"
      >
        <AnimatedCounter value={value} delay={0.5 + index * 0.1} />
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 + index * 0.1 }}
        className="text-xs text-muted-foreground"
      >
        {label}
      </motion.p>
    </motion.div>
  );
};

const RoastCard = ({
  userData,
  roast,
  onShowMercy,
  onShare,
  onClose,
}: RoastCardProps) => {
  const handleShare = () => {
    const url = `${window.location.origin}?user=${encodeURIComponent(
      userData.login
    )}`;

    navigator.clipboard.writeText(url);
    toast.success("Link copied! Share your roast");

    if (onShare) onShare?.();
  };

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0, rotateY: 90 }}
      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
      transition={{ duration: 0.8, ease: "backOut" }}
      className="w-full max-w-7xl mx-auto mt-20 scrollbar-hide"
    >
      <div className="rounded-3xl p-1 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <Button
            onClick={onClose}
            variant="ghost"
            className="absolute top-4 right-4 z-10 rounded-full w-10 h-10 cursor-pointer hover:bg-destructive/10"
          >
            <motion.div
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <X className="w-7 h-7" />
            </motion.div>
          </Button>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          className="flex flex-col items-center mb-8"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.3,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
          >
            <motion.img
              whileHover={{ scale: 1.15, rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.5 }}
              src={userData.avatar_url}
              alt={userData.login}
              className="w-24 h-24 rounded-full border-4 border-primary/50 mb-4 shadow-lg cursor-pointer"
            />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-bold flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            >
              <Github className="w-6 h-6 text-primary" />
            </motion.div>
            {userData.name || userData.login}
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <StatCard
            icon={GitFork}
            value={userData.public_repos}
            label="Repos"
            index={0}
          />
          <StatCard
            icon={Star}
            value={userData.followers}
            label="Followers"
            index={1}
          />
          <StatCard
            icon={Star}
            value={userData.following}
            label="Following"
            index={2}
          />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{
            delay: 0.7,
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          className="mb-6 p-4 rounded-2xl bg-destructive/10 border-2 border-destructive/30 relative overflow-hidden"
        >
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 0% 0%, hsl(0 85% 65% / 0.1), transparent 50%)",
                "radial-gradient(circle at 100% 100%, hsl(0 85% 65% / 0.1), transparent 50%)",
                "radial-gradient(circle at 0% 0%, hsl(0 85% 65% / 0.1), transparent 50%)",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute inset-0 -z-10"
          />
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-2 mb-4"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Flame className="w-6 h-6 text-destructive" />
            </motion.div>
            <h3 className="text-xl font-bold text-destructive">
              GitHub Says...
            </h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <TypeAnimation
              sequence={[roast]}
              wrapper="div"
              speed={80}
              className="text-lg font-medium leading-relaxed whitespace-pre-line"
              cursor={false}
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 1.2,
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          className="flex gap-3"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={onShowMercy}
              className="flex-1 bg-primary text-lg py-6 rounded-xl font-bold cursor-pointer shadow-lg hover:shadow-xl"
            >
              <motion.span
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                className="inline-block"
              >
                🥺
              </motion.span>{" "}
              Show me mercy
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Button
              onClick={handleShare}
              variant="outline"
              className="px-6 py-6 rounded-xl border-primary/30 hover:bg-primary/10 transition-all cursor-pointer"
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RoastCard;
