// app/(public)/[locale]/_components/impact-section.tsx

"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { dignifiedReveal, staggeredContainer } from "@/lib/animations";
import { ImpactStat } from "@/types/homepage";
import { ArrowRight } from "lucide-react";

interface ImpactSectionProps {
  stats: ImpactStat[];
  title: string;
}

export function ImpactSection({ stats, title }: ImpactSectionProps) {
  return (
    <section className="relative bg-gradient-to-b from-background to-muted/20 section-spacing overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.02] dark:opacity-[0.01]"
          style={{ backgroundImage: "url(/images/community-impact-bg.jpg)" }}
        />
        <div className="absolute inset-0 bg-texture-bogolan opacity-[0.03] dark:opacity-[0.02]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-background/30" />
      </div>

      {/* Floating accent elements */}
      <motion.div
        className="absolute top-32 right-16 w-40 h-40 rounded-full bg-primary/5 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-24 left-20 w-32 h-32 rounded-full bg-accent/5 blur-3xl"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="container-brand relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={dignifiedReveal}
          className="text-center max-w-3xl mx-auto space-y-6"
        >
          <h2 className="text-heading2 text-foreground">{title}</h2>
          <p className="text-body-base text-muted-foreground max-w-2xl mx-auto">
            Numbers that tell the story of transformed lives and strengthened communities across our programs.
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div
          variants={staggeredContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div key={i} variants={dignifiedReveal} className="group relative">
              <div
                className="relative p-8 text-center rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] overflow-hidden
                           bg-card/70 backdrop-blur-sm border border-transparent bg-clip-padding
                           before:absolute before:inset-0 before:rounded-2xl before:p-[1px]
                           before:bg-gradient-to-r before:from-primary/40 before:to-accent/40 before:opacity-75 before:-z-10"
              >
                {/* Subtle gradient hover background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 space-y-4">
                  {/* Animated number */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                  >
                    <p className="text-5xl sm:text-6xl font-bold font-serif text-primary transition-colors duration-300 group-hover:text-accent">
                      <CountUp
                        end={parseInt(stat.value.replace(/\D/g, ""))}
                        duration={2}
                        separator=","
                      />
                      {stat.value.replace(/[0-9]/g, "") /* keep suffix like +, %, etc. */}
                    </p>
                  </motion.div>

                  {/* Label */}
                  <h3 className="text-body-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {stat.label}
                  </h3>

                  {/* Outcome */}
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <ArrowRight className="w-4 h-4 text-accent opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                    <p className="text-small-meta text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {stat.outcome}
                    </p>
                  </div>
                </div>

                {/* Accent line at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-body-base text-muted-foreground mb-6">
            Want to dive deeper into our impact methodology and detailed reports?
          </p>
          <motion.a
            href="/impact/reports"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary border border-primary/20 hover:border-primary/40 transition-all duration-300 font-medium group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Detailed Reports
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
