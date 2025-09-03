// app/(public)/[locale]/_components/homepage/hero-section.tsx

"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  ArrowRight,
  Play,
  ChevronDown,
  Globe,
  Users,
  Heart,
  TrendingUp,
} from "lucide-react";
import { HeroContent } from "@/types/homepage";
import { heroAnimations } from "@/lib/animations";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  content: HeroContent;
  locale?: string;
}

// Testimonials interface for better type safety
interface Testimonial {
  text: string;
  author: string;
  location: string;
  program?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  content,
  locale = "en",
}) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Mock testimonials data - in production this comes from Supabase
  const testimonials: Record<string, Testimonial[]> = {
    en: [
      {
        text: "AWE transformed our entire community",
        author: "Maria Santos",
        location: "Kenya",
        program: "Women's Empowerment",
      },
      {
        text: "Hope restored in our village",
        author: "John Kamau",
        location: "Uganda",
        program: "Youth Leadership",
      },
      {
        text: "Education changed everything",
        author: "Fatima Al-Rashid",
        location: "Jordan",
        program: "Child Education",
      },
    ],
    de: [
      {
        text: "AWE hat unsere ganze Gemeinde verändert",
        author: "Maria Santos",
        location: "Kenia",
        program: "Frauenförderung",
      },
      {
        text: "Hoffnung in unser Dorf zurückgebracht",
        author: "John Kamau",
        location: "Uganda",
        program: "Jugendführung",
      },
      {
        text: "Bildung hat alles verändert",
        author: "Fatima Al-Rashid",
        location: "Jordanien",
        program: "Kinderbildung",
      },
    ],
    fr: [
      {
        text: "AWE a transformé toute notre communauté",
        author: "Maria Santos",
        location: "Kenya",
        program: "Autonomisation des femmes",
      },
      {
        text: "L'espoir restauré dans notre village",
        author: "John Kamau",
        location: "Ouganda",
        program: "Leadership jeunesse",
      },
      {
        text: "L'éducation a tout changé",
        author: "Fatima Al-Rashid",
        location: "Jordanie",
        program: "Éducation des enfants",
      },
    ],
  };

  const currentTestimonials = testimonials[locale] || testimonials.en;

  // Impact statistics - would come from Supabase in production
  const impactStats = [
    {
      value: "500+",
      label: "Lives Transformed",
      icon: Users,
      color: "text-blue-600",
    },
    {
      value: "85%",
      label: "Success Rate",
      icon: TrendingUp,
      color: "text-green-600",
    },
    { value: "5", label: "Countries", icon: Globe, color: "text-purple-600" },
  ];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % currentTestimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentTestimonials.length]);

  const handleScrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-background via-muted/30 to-accent/10">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Brand-colored gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-accent/30 to-primary/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Geometric patterns using brand colors */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 border-2 border-primary/20 rotate-45"
          animate={{ rotate: [45, 405] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Texture overlay from globals.css */}
        <div className="absolute inset-0 bg-texture-paper opacity-30" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl px-6 mx-auto md:px-8 lg:px-12">
        <motion.div
          variants={heroAnimations.container}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 items-center min-h-screen"
        >
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Main Headline with enhanced typography */}
            <motion.div
              variants={heroAnimations.headline}
              className="space-y-4"
            >
              <h1 className="text-heading1 font-bold tracking-tight text-foreground">
                <span className="block leading-[0.9] mb-2">
                  {content.headlinePrimary}
                </span>
                <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-[0.9] bg-[length:200%_auto] animate-gradient-x">
                  {content.headlineAccent}
                </span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              variants={heroAnimations.headline}
              className="text-body-large text-muted-foreground leading-relaxed max-w-2xl"
            >
              {content.subheadline}
            </motion.p>

            {/* Enhanced Testimonial Carousel */}
            <motion.div
              variants={heroAnimations.floatingCard}
              className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/40 shadow-lg hover:shadow-xl transition-all duration-300 theme-transition"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground font-medium mb-1 italic">
                      &quot;{currentTestimonials[currentTestimonial]?.text}
                      &quot;
                    </p>
                    <p className="text-small-meta text-muted-foreground">
                      — {currentTestimonials[currentTestimonial]?.author},{" "}
                      {currentTestimonials[currentTestimonial]?.location}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Carousel indicators */}
              <div className="flex gap-2 mt-4 justify-center">
                {currentTestimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? "bg-primary w-8"
                        : "bg-border"
                    }`}
                    onClick={() => setCurrentTestimonial(index)}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div
              variants={heroAnimations.cta}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                size="lg"
                className="group font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-2xl hover:shadow-primary/25 transition-all duration-300 transform hover:-translate-y-1 px-8 py-6 text-base"
              >
                <Link
                  href={`/${locale}/get-involved/donate`}
                  className="flex items-center gap-2"
                >
                  {content.primaryCta}
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="group font-semibold border-2 border-border hover:border-primary/50 bg-card/80 backdrop-blur-sm hover:bg-card text-foreground hover:text-primary transition-all duration-300 transform hover:-translate-y-1 px-8 py-6 text-base"
              >
                <Link
                  href={`/${locale}/get-involved/partner`}
                  className="flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  {content.secondaryCta}
                </Link>
              </Button>
            </motion.div>

            {/* Enhanced Trust Indicators */}
            <motion.div
              variants={heroAnimations.cta}
              className="flex flex-wrap gap-4 pt-8"
            >
              {content.trustIndicators.map((indicator, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, y: -1 }}
                  className="flex items-center gap-3 px-4 py-3 bg-card/60 backdrop-blur-sm rounded-xl border border-border/40 shadow-sm hover:shadow-md transition-all duration-300 theme-transition"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10">
                    <Icon
                      name={indicator.icon}
                      className="w-5 h-5 text-primary"
                    />
                  </div>
                  <span className="text-small-meta font-medium text-foreground">
                    {indicator.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Enhanced Visual Elements */}
          <motion.div
            variants={heroAnimations.floatingCard}
            className="relative lg:pl-8"
          >
            {/* Main Image Container */}
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-muted to-accent/20 border border-border/20">
                {/* Enhanced placeholder for community image */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/20 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="relative">
                      <Users className="w-24 h-24 text-primary mx-auto" />
                      <motion.div
                        className="absolute inset-0 w-24 h-24 border-4 border-accent rounded-full mx-auto"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </div>
                    <p className="text-foreground font-medium">
                      Community Impact Visual
                    </p>
                    <p className="text-small-meta text-muted-foreground">
                      Empowering Lives Together
                    </p>
                  </div>
                </div>

                {/* Enhanced Stats Overlay */}
                <motion.div
                  className="absolute bottom-6 left-6 right-6 bg-card/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-border/20"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                >
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {impactStats.map((stat, index) => (
                      <motion.div
                        key={index}
                        className="space-y-1"
                        whileHover={{ scale: 1.05 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        <div className="flex items-center justify-center">
                          <stat.icon className={`w-4 h-4 mr-1 ${stat.color}`} />
                        </div>
                        <p className="text-xl font-bold text-primary">
                          {stat.value}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {stat.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Enhanced Floating Cards */}
              <motion.div
                className="absolute -top-8 -right-8 bg-card/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-border/20"
                animate={{
                  y: [-10, 10, -10],
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      New Project
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Education Center
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-12 -left-12 bg-card/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-border/20"
                animate={{
                  y: [-10, 10, -10],
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      Global Reach
                    </p>
                    <p className="text-xs text-muted-foreground">5 Countries</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 cursor-pointer group"
            onClick={handleScrollToNext}
          >
            <span className="text-small-meta text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              Scroll to explore
            </span>
            <div className="p-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/40 group-hover:border-primary/40 transition-all duration-300">
              <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Custom CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  );
};
