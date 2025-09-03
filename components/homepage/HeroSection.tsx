"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Award } from "lucide-react";

interface HeroSectionProps {
  content: {
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({ content }) => (
  <section className="relative flex items-center justify-center min-h-screen text-white bg-deep-charcoal">
    <video
      autoPlay loop muted playsInline
      className="absolute inset-0 object-cover w-full h-full opacity-40"
      poster="/videos/hero-poster.jpg"
    >
      <source src="/videos/hero-video.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/30 via-transparent to-deep-charcoal/30"></div>
    <div className="relative z-10 w-full max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight font-lora sm:text-6xl lg:text-7xl">{content.headline}</h1>
        <p className="mt-6 text-lg leading-8 font-inter text-white/90 sm:text-xl">{content.subheadline}</p>
        <div className="flex flex-col items-start gap-4 mt-10 sm:flex-row sm:items-center">
          <Button asChild size="lg" className="font-bold text-white bg-hopeful-clay hover:bg-hopeful-clay/90"><Link href="/get-involved/donate">{content.primaryCta}</Link></Button>
          <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-deep-charcoal"><Link href="/get-involved/partner">{content.secondaryCta}</Link></Button>
        </div>
        <div className="flex items-center gap-6 mt-12 text-sm text-white/80"><div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5" /><span>Top-Rated Charity</span></div><div className="flex items-center gap-2"><Award className="w-5 h-5" /><span>2024 Impact Award</span></div></div>
      </motion.div>
    </div>
  </section>
);