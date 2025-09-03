"use client";

import { motion } from "framer-motion";
import { dignifiedReveal, staggeredContainer } from "@/lib/animations";
import { Users, HeartHandshake, TrendingUp, Sparkles } from "lucide-react";
import React from 'react';

// Map string keys to icon components
const iconMap: { [key: string]: React.ElementType } = {
  "Community-Led": Users,
  "Holistic Solutions": HeartHandshake,
  "Proven Results": TrendingUp,
  "Cultural Competency": Sparkles,
};

interface DifferentiatorsSectionProps {
  items: Array<{ title: string; description: string; }>;
  title: string;
}

export const DifferentiatorsSection: React.FC<DifferentiatorsSectionProps> = ({ items, title }) => (
  <section className="py-20 bg-canvas-white sm:py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div variants={dignifiedReveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} className="text-center">
        <h2 className="text-3xl font-bold tracking-tight font-lora text-deep-charcoal sm:text-4xl">{title}</h2>
      </motion.div>
      <motion.div variants={staggeredContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 gap-12 mt-16 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => {
          const IconComponent = iconMap[item.title] || Sparkles; // Fallback to a default icon
          return (
            <motion.div key={i} variants={dignifiedReveal} className="text-center">
              <div className="inline-flex items-center justify-center p-4 rounded-full bg-radiant-gold/10">
                <IconComponent className="w-10 h-10 text-radiant-gold" strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 text-xl font-semibold font-lora text-deep-charcoal">{item.title}</h3>
              <p className="mt-2 text-base text-medium-grey">{item.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </section>
);