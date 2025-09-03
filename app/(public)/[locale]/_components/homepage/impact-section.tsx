// app/(public)/[locale]/_components/homepage/impact-section.tsx

"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ImpactStat } from "@/types/homepage";
import { TrendingUp, Users, Target, Award } from "lucide-react";

interface ImpactSectionProps {
  stats: ImpactStat[];
  title: string;
}

// Animation variants for the section
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2
    }
  }
};

const statVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

// Counter hook for animated numbers
const useCounter = (end: number, start: number = 0, duration: number = 2000) => {
  const [count, setCount] = useState(start);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(start + (end - start) * easeOutCubic));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setIsComplete(true);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, start, duration]);

  return { count, isComplete };
};

// Extract numeric value from stat value string
const extractNumber = (value: string): number => {
  const match = value.match(/\d+/);
  return match ? parseInt(match[0]) : 0;
};

// Get icon for stat based on content or index
const getStatIcon = (stat: ImpactStat, index: number) => {
  const iconClass = "w-8 h-8 text-primary";
  
  // You can customize this logic based on your stat content
  if (stat.label.toLowerCase().includes('individual') || stat.label.toLowerCase().includes('people')) {
    return <Users className={iconClass} />;
  }
  if (stat.label.toLowerCase().includes('business') || stat.label.toLowerCase().includes('project')) {
    return <TrendingUp className={iconClass} />;
  }
  if (stat.label.toLowerCase().includes('rate') || stat.label.toLowerCase().includes('success')) {
    return <Award className={iconClass} />;
  }
  
  // Default icons by index
  const icons = [Users, TrendingUp, Target, Award];
  const IconComponent = icons[index % icons.length];
  return <IconComponent className={iconClass} />;
};

// Individual stat card component
const StatCard: React.FC<{ stat: ImpactStat; index: number; isInView: boolean }> = ({ 
  stat, 
  index, 
  isInView 
}) => {
  const numericValue = extractNumber(stat.value);
  const { count } = useCounter(isInView ? numericValue : 0, 0, 2000 + (index * 200));
  
  // Format the count back to the original format
  const formatValue = (originalValue: string, currentCount: number): string => {
    if (originalValue.includes('%')) {
      return `${currentCount}%`;
    }
    if (originalValue.includes('+')) {
      return `${currentCount}+`;
    }
    return currentCount.toString();
  };

  return (
    <motion.div
      variants={statVariants}
      className="relative group"
    >
      <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 border border-border/40 shadow-lg hover:shadow-2xl transition-all duration-500 theme-transition group-hover:-translate-y-2 group-hover:border-primary/20">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-texture-paper opacity-20 rounded-3xl" />
        
        {/* Icon */}
        <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl mb-6 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300">
          {getStatIcon(stat, index)}
        </div>

        {/* Value */}
        <div className="relative z-10 mb-4">
          <motion.h3 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            initial={{ scale: 0.5 }}
            animate={isInView ? { scale: 1 } : { scale: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
          >
            {formatValue(stat.value, count)}
          </motion.h3>
        </div>

        {/* Label */}
        <h4 className="relative z-10 text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
          {stat.label}
        </h4>

        {/* Outcome */}
        <p className="relative z-10 text-muted-foreground leading-relaxed">
          {stat.outcome}
        </p>

        {/* Hover Effect Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />
      </div>
    </motion.div>
  );
};

export const ImpactSection: React.FC<ImpactSectionProps> = ({ stats, title }) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref}
      className="relative py-24 md:py-32 bg-gradient-to-br from-muted/20 via-background to-accent/10 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Geometric patterns */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-l from-accent/15 to-transparent rounded-full blur-3xl opacity-40" />
        
        {/* Texture overlay */}
        <div className="absolute inset-0 bg-texture-bogolan opacity-20" />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div 
            variants={statVariants}
            className="text-center space-y-6"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent flex-1 max-w-32" />
              <TrendingUp className="w-8 h-8 text-primary" />
              <div className="h-px bg-gradient-to-r from-primary via-transparent to-transparent flex-1 max-w-32" />
            </div>
            
            <h2 className="text-heading2 font-bold text-center text-foreground">
              {title}
            </h2>
            
            <p className="text-body-large text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our data-driven approach ensures measurable, lasting impact in the communities we serve. 
              Every number represents real lives transformed and futures reimagined.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                stat={stat}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>

          {/* Bottom CTA Section */}
          <motion.div
            variants={statVariants}
            className="text-center pt-12"
          >
            <div className="bg-card/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-border/40 shadow-lg theme-transition max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-center justify-center">
                  <Award className="w-12 h-12 text-accent" />
                </div>
                
                <h3 className="text-heading4 font-semibold text-foreground">
                  Every Number Tells a Story
                </h3>
                
                <p className="text-body-base text-muted-foreground leading-relaxed">
                  Behind each statistic is a person whose life has been transformed through our holistic approach. 
                  Join us in creating more success stories and building stronger communities together.
                </p>
                
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
                  variants={statVariants}
                >
                  <motion.a
                    href="#get-involved"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Be Part of Our Impact
                    <TrendingUp className="w-5 h-5" />
                  </motion.a>
                  
                  <motion.a
                    href="/impact/reports"
                    className="inline-flex items-center gap-2 bg-card hover:bg-card/80 text-foreground font-semibold px-8 py-4 rounded-xl border border-border/40 hover:border-primary/40 shadow-sm hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Detailed Reports
                    <Target className="w-5 h-5" />
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg 
          className="relative block w-full h-12" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            fill="currentColor"
            className="text-background"
          />
        </svg>
      </div>
    </section>
  );
};
