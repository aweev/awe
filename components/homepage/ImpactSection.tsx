"use client";

import { motion } from "framer-motion";
import { dignifiedReveal, staggeredContainer } from "@/lib/animations";

interface ImpactSectionProps {
  stats: Array<{ value: string; label: string }>;
}

export const ImpactSection: React.FC<ImpactSectionProps> = ({ stats }) => (
  <section className="py-20 bg-canvas-white sm:py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div variants={staggeredContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="grid grid-cols-1 gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div key={i} variants={dignifiedReveal}>
            <p className="text-5xl font-bold font-lora text-hopeful-clay">{stat.value}</p>
            <p className="mt-2 text-lg font-inter text-deep-charcoal">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);