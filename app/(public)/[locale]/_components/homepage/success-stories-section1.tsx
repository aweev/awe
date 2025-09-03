// app/(public)/[locale]/_components/homepage/success-stories-section.tsx

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useState, useEffect, useRef, useCallback } from "react";
import { dignifiedReveal, staggeredContainer } from "@/lib/animations";
import { SuccessStory } from "@/types/homepage";
import { StoryCard } from "./story-card";
import { Heart, ArrowRight, ChevronLeft, ChevronRight, Play, Pause, Users, Globe, Sparkles, Quote } from "lucide-react";
import Link from "next/link";

interface SuccessStoriesSectionProps {
  stories: SuccessStory[];
  title: string;
  subtitle: string;
  locale?: string;
}

// Enhanced story statistics component
const StoryStatistics: React.FC<{ stories: SuccessStory[] }> = ({ stories }) => {
  const stats = [
    { value: stories.length, label: "Stories", icon: Quote },
    { value: 15, label: "Countries", icon: Globe }, // Mock data
    { value: 500, label: "Lives Changed", icon: Users },
  ];

  return (
    <div className="flex items-center justify-center gap-8 mb-12">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center justify-center mb-2">
            <stat.icon className="w-5 h-5 text-primary mr-2" />
            <span className="text-2xl font-bold text-primary">{stat.value}+</span>
          </div>
          <p className="text-small-meta text-muted-foreground">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

// Immersive typewriter effect for quotes
const TypewriterQuote: React.FC<{ text: string; isActive: boolean }> = ({ text, isActive }) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setDisplayText("");
      setIsComplete(false);
      return;
    }

    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [text, isActive]);

  return (
    <div className="min-h-[3rem] flex items-center">
      <motion.p 
        className="text-lg italic text-foreground"
        animate={isComplete ? { opacity: [0.7, 1, 0.7] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        &quot;{displayText}&quot;
        {!isComplete && <motion.span 
          className="inline-block w-0.5 h-5 bg-primary ml-1"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        />}
      </motion.p>
    </div>
  );
};

// Interactive carousel controls
const CarouselControls: React.FC<{
  emblaApi: any;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  isPlaying: boolean;
  onPlayPause: () => void;
}> = ({ emblaApi, canScrollPrev, canScrollNext, isPlaying, onPlayPause }) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <motion.button
        onClick={() => emblaApi?.scrollPrev()}
        disabled={!canScrollPrev}
        className="p-3 rounded-full bg-card/80 backdrop-blur-sm border border-border/40 hover:border-primary/40 text-muted-foreground hover:text-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft className="w-5 h-5" />
      </motion.button>

      <motion.button
        onClick={onPlayPause}
        className="p-4 rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-xl hover:shadow-2xl transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </motion.button>

      <motion.button
        onClick={() => emblaApi?.scrollNext()}
        disabled={!canScrollNext}
        className="p-3 rounded-full bg-card/80 backdrop-blur-sm border border-border/40 hover:border-primary/40 text-muted-foreground hover:text-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronRight className="w-5 h-5" />
      </motion.button>
    </div>
  );
};

export function SuccessStoriesSection({ stories, title, subtitle, locale = 'en' }: SuccessStoriesSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAutoplayActive, setIsAutoplayActive] = useState(true);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const featuredStories = stories.slice(0, 6);
  
  const autoplayPlugin = useRef(
    Autoplay({ delay: 6000, stopOnInteraction: false })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: "center",
      containScroll: "trimSnaps",
      dragFree: true
    },
    [autoplayPlugin.current]
  );

  // Parallax effects
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  const toggleAutoplay = useCallback(() => {
    const autoplay = autoplayPlugin.current;
    if (autoplay.isPlaying()) {
      autoplay.stop();
      setIsAutoplayActive(false);
    } else {
      autoplay.play();
      setIsAutoplayActive(true);
    }
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gradient-to-b from-muted/10 via-background to-muted/20 section-spacing overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Dynamic gradient orbs with parallax */}
        <motion.div 
          className="absolute top-20 right-10 w-80 h-80 rounded-full bg-gradient-to-r from-primary/15 to-accent/10 blur-3xl"
          style={{ y: y1 }}
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-32 left-20 w-60 h-60 rounded-full bg-gradient-to-r from-accent/20 to-primary/15 blur-3xl"
          style={{ y: y2 }}
          animate={{ 
            scale: [1.1, 0.9, 1.1], 
            opacity: [0.2, 0.5, 0.2],
            x: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-4 h-4 bg-primary/30 rotate-45"
          animate={{ 
            rotate: [45, 405],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-6 h-6 border-2 border-accent/40 rounded-full"
          animate={{ 
            scale: [1, 2, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Texture overlay */}
        <div className="absolute inset-0 bg-texture-paper opacity-20 dark:opacity-10" />
      </div>

      <div className="container-brand relative z-10">
        {/* Enhanced Header */}
        <motion.div
          variants={staggeredContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-5xl mx-auto text-center space-y-8 mb-16"
        >
          <motion.div variants={dignifiedReveal} className="space-y-6">
            {/* Animated badge */}
            <motion.div 
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card/90 backdrop-blur-sm border border-border/60 shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <Heart className="w-5 h-5 text-primary" />
                <motion.div
                  className="absolute inset-0 w-5 h-5"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="w-5 h-5 text-primary/30" />
                </motion.div>
              </div>
              <span className="text-small-meta font-semibold text-foreground">
                Stories of Transformation
              </span>
              <Sparkles className="w-4 h-4 text-accent" />
            </motion.div>

            <h2 className="text-heading2 text-foreground">{title}</h2>
            <p className="text-body-large text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </motion.div>

          {/* Story statistics */}
          <motion.div variants={dignifiedReveal}>
            <StoryStatistics stories={featuredStories} />
          </motion.div>
        </motion.div>

        {/* Featured Quote Section */}
        <motion.div
          variants={dignifiedReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="relative bg-card/80 backdrop-blur-sm rounded-3xl p-8 border border-border/40 shadow-2xl overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-2xl"
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            <div className="relative z-10 text-center space-y-6">
              <div className="text-6xl text-primary/20 font-serif">&quot;</div>
              <TypewriterQuote 
                text={featuredStories[selectedIndex]?.quote || "Every story is a testament to the power of hope and community support."} 
                isActive={true}
              />
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">
                    {featuredStories[selectedIndex]?.profile?.full_name || 'Community Member'}
                  </p>
                  <p className="text-small-meta text-muted-foreground">
                    Story #{selectedIndex + 1} of {featuredStories.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Carousel */}
        <motion.div
          variants={dignifiedReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-8"
        >
          {/* Desktop Grid View */}
          <div className="hidden lg:block">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggeredContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {featuredStories.map((story, index) => (
                <motion.div key={story.id} variants={dignifiedReveal}>
                  <StoryCard story={story} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Enhanced Mobile/Tablet Carousel */}
          <div className="lg:hidden">
            <div className="relative">
              {/* Progress indicators */}
              <div className="flex justify-center gap-2 mb-6">
                {featuredStories.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === selectedIndex 
                        ? 'bg-primary w-8' 
                        : 'bg-border w-2 hover:bg-border-hover'
                    }`}
                    onClick={() => emblaApi?.scrollTo(index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>

              <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
                <div className="flex gap-6">
                  {featuredStories.map((story, index) => (
                    <motion.div 
                      key={story.id} 
                      className="min-w-[90%] sm:min-w-[80%] flex-shrink-0"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ 
                        opacity: index === selectedIndex ? 1 : 0.7,
                        scale: index === selectedIndex ? 1 : 0.95
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <StoryCard story={story} index={index} />
                    </motion.div>
                  ))}
                </div>
              </div>

              <CarouselControls
                emblaApi={emblaApi}
                canScrollPrev={canScrollPrev}
                canScrollNext={canScrollNext}
                isPlaying={isAutoplayActive}
                onPlayPause={toggleAutoplay}
              />
            </div>
          </div>
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          variants={dignifiedReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20 text-center space-y-8"
        >
          <div className="space-y-4">
            <h3 className="text-heading3 text-foreground">
              Every Story Matters
            </h3>
            <p className="text-body-base text-muted-foreground max-w-2xl mx-auto">
              Discover more inspiring journeys of transformation, resilience, and hope from communities around the world.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/stories"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Quote className="w-5 h-5" />
                Read All Stories
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/get-involved/share"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-card/80 backdrop-blur-sm border-2 border-border hover:border-primary/50 text-foreground hover:text-primary font-semibold rounded-2xl transition-all duration-300"
              >
                <Heart className="w-5 h-5" />
                Share Your Story
              </Link>
            </motion.div>
          </div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-8 pt-8 text-small-meta text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span>500+ Lives Transformed</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              <span>15 Countries Reached</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-primary" />
              <span>Ongoing Support</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}