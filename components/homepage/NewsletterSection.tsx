"use client";

import { motion } from "framer-motion";
import { dignifiedReveal } from "@/lib/animations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NewsletterSectionProps {
  title: string;
  subtitle: string;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ title, subtitle }) => (
  <section className="py-20 bg-deep-charcoal sm:py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div variants={dignifiedReveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white font-lora sm:text-4xl">{title}</h2>
        <p className="mt-4 text-lg leading-8 text-white/80">{subtitle}</p>
        <form className="flex w-full max-w-md gap-x-4 mx-auto mt-10">
          <label htmlFor="email-address" className="sr-only">Email address</label>
          <Input id="email-address" name="email" type="email" autoComplete="email" required className="flex-auto min-w-0 text-deep-charcoal" placeholder="Enter your email" />
          <Button type="submit" className="font-semibold text-white bg-hopeful-clay hover:bg-hopeful-clay/90">Subscribe</Button>
        </form>
      </motion.div>
    </div>
  </section>
);