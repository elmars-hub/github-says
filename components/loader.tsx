import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const loadingMessages = [
  "Fetching your GitHub mess...",
  "Analyzing your code crimes...",
  "What have you been cooking? 👀",
  "Counting your unfinished projects...",
  "Judging your commit history...",
  "Preparing the roast...",
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
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md"
    >
      <div className="rounded-3xl p-12 bg-primary max-w-md mx-4">
        <div className="flex gap-3 mb-6 justify-center">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              ref={(el) => {
                circleRefs.current[i] = el;
              }}
              className="w-3 h-3 rounded-full bg-white"
            />
          ))}
        </div>
        <motion.p
          key={messageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-xl font-bold text-center text-white"
        >
          {loadingMessages[messageIndex]}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Loader;
