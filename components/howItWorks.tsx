"use client";

import { motion } from "framer-motion";
import { Search, Zap, Heart } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Enter Username",
    description: "Type your GitHub username and prepare yourself",
    color: "text-primary",
  },
  {
    icon: Zap,
    title: "Get Roasted",
    description: "We analyze your GitHub activity and deliver the truth",
    color: "text-primary",
  },
  {
    icon: Heart,
    title: "Find Motivation",
    description: "Reveal the hidden motivation card to feel better",
    color: "text-primary",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient"
        >
          How It Works
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                delay: index * 0.15,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              whileHover={{
                y: -12,
                scale: 1.05,
                transition: { type: "spring", stiffness: 400, damping: 15 },
              }}
              className="rounded-2xl p-8 text-center hover-lift bg-background shadow-md relative overflow-hidden group"
            >
              {/* Animated background on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />

              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={`w-16 h-16 mx-auto mb-6 rounded-full glass flex items-center justify-center ${step.color} relative z-10 shadow-lg`}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3,
                  }}
                >
                  <step.icon className="w-8 h-8" />
                </motion.div>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.2 }}
                className="text-xl font-bold mb-3 relative z-10"
              >
                {step.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.3 }}
                className="text-muted-foreground relative z-10"
              >
                {step.description}
              </motion.p>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15 + 0.4,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                className={`mt-6 h-1 rounded-full relative z-10 ${step.color.replace(
                  "text-",
                  "bg-"
                )}`}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HowItWorks;
