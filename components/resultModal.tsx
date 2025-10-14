"use client";

import { motion } from "framer-motion";

import RoastCard from "@/components/roastCard";
import { GitHubUser } from "@/lib/getGithubData";

export default function ResultModal({
  userData,
  roast,
  onClose,
  onShowMercy,
}: {
  userData: GitHubUser;
  roast: string;
  motivation: string;
  showMotivation: boolean;
  onClose: () => void;
  onShowMercy: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-background/95 backdrop-blur-lg"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <RoastCard
          userData={userData}
          roast={roast}
          onShowMercy={onShowMercy}
          onClose={onClose}
        />
      </motion.div>
    </motion.div>
  );
}
