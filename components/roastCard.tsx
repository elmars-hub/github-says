"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Flame, Github, Star, GitFork, Share2, X } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface RoastCardProps {
  userData: {
    login: string;
    avatar_url: string;
    public_repos: number;
    followers: number;
    following: number;
  };
  roast: string;
  onShowMercy: () => void;
  onShare?: () => void;
  onClose: () => void;
}

const RoastCard = ({
  userData,
  roast,
  onShowMercy,
  onShare,
  onClose,
}: RoastCardProps) => {
  const handleShare = () => {
    const shareText = `GitHub just roasted me! 🔥\n\nCheck out what GitHub really thinks about @${userData.login}'s code 😭\n\nGet roasted at: ${window.location.origin}`;

    if (navigator.share) {
      navigator
        .share({
          title: "GitHub Roasted Me!",
          text: shareText,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      toast("Copied to clipboard! 📋");
    }

    if (onShare) onShare();
  };

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0, rotateY: 90 }}
      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
      transition={{ duration: 0.8, ease: "backOut" }}
      className="w-full max-w-3xl mx-auto mt-24"
    >
      <div className="rounded-3xl p-8 relative overflow-hidden">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center mb-8"
        >
          <motion.img
            whileHover={{ scale: 1.1, rotate: 5 }}
            src={userData.avatar_url}
            alt={userData.login}
            className="w-24 h-24 rounded-full border-4 border-primary/50 mb-4 shadow-lg"
          />

          <Button
            onClick={onClose}
            variant="ghost"
            className="absolute top-4 right-4 z-10 rounded-full w-10 h-10  cursor-pointer"
          >
            <X className="w-5 h-5" />
          </Button>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Github className="w-6 h-6 text-primary" />
            {userData.login}
          </h2>
        </motion.div>

        {/* GitHub Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="glass rounded-xl p-4 text-center hover-lift">
            <GitFork className="w-5 h-5 text-secondary mx-auto mb-2" />
            <p className="text-2xl font-bold text-gradient">
              {userData.public_repos}
            </p>
            <p className="text-xs text-muted-foreground">Repos</p>
          </div>
          <div className="glass rounded-xl p-4 text-center hover-lift">
            <Star className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-gradient">
              {userData.followers}
            </p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>
          <div className="glass rounded-xl p-4 text-center hover-lift">
            <Star className="w-5 h-5 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-gradient">
              {userData.following}
            </p>
            <p className="text-xs text-muted-foreground">Following</p>
          </div>
        </motion.div>

        {/* Roast Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-6 p-8 rounded-2xl bg-destructive/10 border-2 border-destructive/30 relative overflow-hidden"
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
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-6 h-6 text-destructive animate-pulse" />
            <h3 className="text-xl font-bold text-destructive">
              GitHub Says...
            </h3>
          </div>
          <TypeAnimation
            sequence={[roast]}
            wrapper="div"
            speed={80}
            className="text-lg font-medium leading-relaxed whitespace-pre-line"
            cursor={false}
          />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
          className="flex gap-3"
        >
          <Button
            onClick={onShowMercy}
            className="flex-1 bg-primary  text-lg py-6 rounded-xl font-bold cursor-pointer"
          >
            Show me mercy 🥺
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            className="px-6 py-6 rounded-xl border-primary/30 hover:bg-primary/10 transition-all"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RoastCard;
