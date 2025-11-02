import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const loadingMessages = [
  "Analyzing your code crimes...",
  "What have you been cooking? 👀",
  "Counting your unfinished projects...",
  "Judging your commit history...",
  "GitHub is not impressed...",
];

const Loader = () => {
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    circleRefs.current.forEach((circle, i) => {
      if (circle) {
        gsap.to(circle, {
          y: -20,
          duration: 0.5,
          delay: i * 0.1,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }
    });

    // Rotate messages
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-lg"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
        }}
        className="rounded-3xl p-12 bg-primary max-w-md mx-4 shadow-2xl relative overflow-hidden"
      >
        {/* Animated background gradient */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.2), transparent 50%)",
              "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.2), transparent 50%)",
              "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.2), transparent 50%)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 -z-10"
        />

        {/* Animated circles with improved styling */}
        <div className="flex gap-3 mb-6 justify-center items-center">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              ref={(el) => {
                circleRefs.current[i] = el;
              }}
              className="w-4 h-4 rounded-full bg-white shadow-lg"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Message with enhanced animation */}
        <motion.p
          key={messageIndex}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          className="text-xl font-bold text-center text-white relative z-10"
        >
          {loadingMessages[messageIndex]}
        </motion.p>

        {/* Progress indicator */}
        <motion.div
          className="mt-6 h-1 bg-white/30 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Loader;
