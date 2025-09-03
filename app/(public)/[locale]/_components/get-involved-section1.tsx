// app/(public)/[locale]/_components/get-involved-section.tsx

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { InvolvementOption } from "@/types/homepage";
import { dignifiedReveal, staggeredContainer } from "@/lib/animations";
import { ArrowRight } from "lucide-react";

interface GetInvolvedSectionProps {
  options: InvolvementOption[];
  title: string;
}

export function GetInvolvedSection({ options, title }: GetInvolvedSectionProps) {
  return (
    <section className="relative bg-gradient-to-b from-muted/10 via-background to-muted/20 section-spacing overflow-hidden">
      <div className="container-brand relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={dignifiedReveal}
          className="text-center max-w-3xl mx-auto space-y-6 mb-20"
        >
          <h2 className="text-heading2 text-foreground">{title}</h2>
          <p className="text-body-base text-muted-foreground">
            Choose how you’d like to make a difference — every action helps fuel impact.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={staggeredContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {options.map((opt, i) => (
            <motion.div
              key={i}
              variants={dignifiedReveal}
              className="group perspective"
            >
              {/* Flip container */}
              <div className="relative preserve-3d h-full w-full transition-transform duration-700 group-hover:rotate-y-180">
                {/* Front side */}
                <div className="absolute inset-0 backface-hidden flex flex-col justify-between p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">
                      {opt.title}
                    </h3>
                    <p className="text-body-base text-muted-foreground">
                      {opt.description}
                    </p>
                  </div>
                  <div className="mt-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md
                                 bg-gradient-to-r from-primary to-accent text-white font-medium shadow-lg"
                    >
                      {opt.cta}
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>

                {/* Back side */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 p-8 rounded-2xl bg-gradient-to-br from-primary/90 to-accent/90 text-white flex flex-col justify-between shadow-xl">
                  <div>
                    <h3 className="text-xl font-semibold">{opt.title}</h3>
                    <p className="mt-4 text-body-base opacity-90">
                      Ready to take action? Click below to continue.
                    </p>
                  </div>
                  <Link
                    href={opt.link}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-md
                               bg-white/20 hover:bg-white/30 transition-colors font-medium shadow-md"
                  >
                    {opt.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
