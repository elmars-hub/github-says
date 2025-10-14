"use client";

import { motion } from "framer-motion";
import Loader from "@/components/loader";

export default function LoadingOverlay() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Loader />
    </motion.div>
  );
}
