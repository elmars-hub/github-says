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
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="rounded-2xl p-8 text-center hover-lift bg-background shadow-md"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
                className={`w-16 h-16 mx-auto mb-6 rounded-full glass flex items-center justify-center ${step.color}`}
              >
                <step.icon className="w-8 h-8" />
              </motion.div>

              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.3 }}
                className={`mt-6 h-1 rounded-full ${step.color.replace(
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
