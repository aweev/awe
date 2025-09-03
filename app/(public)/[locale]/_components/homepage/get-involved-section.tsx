// app/(public)/[locale]/_components/homepage/get-involved-section.tsx

"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useRef } from "react";
import { InvolvementOption } from "@/types/homepage";
import { dignifiedReveal, staggeredContainer } from "@/lib/animations";
import {
  ArrowRight,
  Heart,
  Users,
  HandHeart,
  Share2,
  Target,
  TrendingUp,
  Globe,
  Award,
  DollarSign,
  Calendar,
  MessageCircle,
  CheckCircle,
  Sparkles,
  Clock,
} from "lucide-react";

interface GetInvolvedSectionProps {
  options: InvolvementOption[];
  title: string;
  locale?: string;
}

// Floating elements for background
const BackgroundElement: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  delay: number;
  color: string;
  size: string;
  position: { x: string; y: string };
}> = ({ icon: Icon, delay, color, size, position }) => (
  <motion.div
    className={`absolute ${color} ${size} opacity-20`}
    style={{ left: position.x, top: position.y }}
    animate={{
      y: [-20, 20, -20],
      rotate: [0, 180, 360],
      scale: [0.8, 1.2, 0.8],
    }}
    transition={{
      duration: 8 + delay,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  >
    <Icon className="w-full h-full" />
  </motion.div>
);

// Enhanced card with better interactivity
const InvolvementCard: React.FC<{
  option: InvolvementOption;
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
  locale: string;
}> = ({ option, index, isHovered, onHover }) => {
  const [showDetails, setShowDetails] = useState(false);

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    heart: Heart,
    users: Users,
    "hand-heart": HandHeart,
    share2: Share2,
    target: Target,
    "dollar-sign": DollarSign,
    calendar: Calendar,
    "message-circle": MessageCircle,
  };

  const IconComponent = iconMap[option.icon || "heart"] || Heart;

  const colorSchemes = [
    {
      primary: "from-blue-500 to-indigo-600",
      secondary: "from-blue-50 to-indigo-50",
      accent: "bg-blue-500",
      text: "text-blue-600",
      shadow: "shadow-blue-500/25",
    },
    {
      primary: "from-emerald-500 to-green-600",
      secondary: "from-emerald-50 to-green-50",
      accent: "bg-emerald-500",
      text: "text-emerald-600",
      shadow: "shadow-emerald-500/25",
    },
    {
      primary: "from-orange-500 to-red-500",
      secondary: "from-orange-50 to-red-50",
      accent: "bg-orange-500",
      text: "text-orange-600",
      shadow: "shadow-orange-500/25",
    },
  ];

  const scheme = colorSchemes[index % colorSchemes.length];

  // Mock engagement data
  const engagementData = [
    { donors: "2.4K", impact: "Lives Changed", satisfaction: "98%" },
    { donors: "1.8K", impact: "Communities Served", satisfaction: "96%" },
    { donors: "950", impact: "Volunteers Active", satisfaction: "99%" },
  ];

  const data = engagementData[index % engagementData.length];

  return (
    <motion.div
      className="group relative h-full"
      onHoverStart={() => onHover(index)}
      onHoverEnd={() => onHover(null)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.div
        className={`
          relative h-full overflow-hidden rounded-3xl transition-all duration-500
          bg-card/80 backdrop-blur-sm border border-border/40 
          hover:shadow-2xl ${scheme.shadow}
        `}
        animate={isHovered ? { y: -8 } : { y: 0 }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Gradient overlay on hover */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${scheme.primary} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
          />

          {/* Animated background pattern */}
          <motion.div
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-10"
            style={{
              background: `conic-gradient(from 0deg, rgb(59, 130, 246), rgb(147, 51, 234), rgb(59, 130, 246))`,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          {/* Texture overlay */}
          <div className="absolute inset-0 bg-texture-paper opacity-30" />
        </div>

        <div className="relative z-10 p-8 h-full flex flex-col">
          {/* Icon and Header */}
          <div className="flex items-start justify-between mb-6">
            <motion.div
              className={`w-16 h-16 rounded-2xl ${scheme.accent} flex items-center justify-center shadow-lg`}
              whileHover={{
                rotate: [0, -10, 10, 0],
                scale: 1.1,
              }}
              transition={{ duration: 0.6 }}
            >
              <IconComponent className="w-8 h-8 text-white" />
            </motion.div>

            {/* Quick stats */}
            <motion.div
              className="text-right opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: 20 }}
              animate={isHovered ? { x: 0 } : { x: 20 }}
            >
              <p className="text-xs text-muted-foreground">Active</p>
              <p className={`text-sm font-bold ${scheme.text}`}>
                {data.donors}
              </p>
            </motion.div>
          </div>

          {/* Content */}
          <div className="flex-grow space-y-4">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              {option.title}
            </h3>

            <p className="text-body-base text-muted-foreground group-hover:text-foreground transition-colors duration-300 leading-relaxed">
              {option.description}
            </p>

            {/* Expandable details */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3 pt-4 border-t border-border/20"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Impact:
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {data.impact}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Satisfaction:
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {data.satisfaction}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-muted-foreground">
                      Trusted by community
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action buttons */}
          <div className="space-y-3 pt-6">
            <motion.button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted/70 text-muted-foreground hover:text-foreground transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm font-medium">
                {showDetails ? "Hide Details" : "View Details"}
              </span>
              <motion.div
                animate={{ rotate: showDetails ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.button>

            <Link href={option.link}>
              <motion.div
                className={`
                  group/btn w-full flex items-center justify-center gap-3 p-4
                  bg-gradient-to-r ${scheme.primary} text-white font-semibold rounded-2xl 
                  shadow-lg hover:shadow-xl transition-all duration-300
                `}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{option.cta}</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Hover particles */}
        <AnimatePresence>
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-primary/40 rounded-full"
                  initial={{
                    x: Math.random() * 100 + "%",
                    y: "100%",
                    scale: 0,
                  }}
                  animate={{
                    y: "-100%",
                    scale: [0, 1, 0],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

// Main component
export function GetInvolvedSection({
  options,
  title,
  locale = "en",
}: GetInvolvedSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const backgroundElements = [
    {
      icon: Heart,
      color: "text-red-400/20",
      size: "w-16 h-16",
      position: { x: "10%", y: "20%" },
    },
    {
      icon: Users,
      color: "text-blue-400/20",
      size: "w-20 h-20",
      position: { x: "85%", y: "30%" },
    },
    {
      icon: Globe,
      color: "text-green-400/20",
      size: "w-14 h-14",
      position: { x: "15%", y: "70%" },
    },
    {
      icon: Award,
      color: "text-yellow-400/20",
      size: "w-18 h-18",
      position: { x: "80%", y: "75%" },
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-background via-muted/5 to-background"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        {/* Gradient mesh */}
        <motion.div
          className="absolute inset-0 opacity-40"
          animate={{
            background: [
              "radial-gradient(circle at 25% 25%, hsl(var(--primary) / 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, hsl(var(--accent) / 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 75% 25%, hsl(var(--accent) / 0.1) 0%, transparent 50%), radial-gradient(circle at 25% 75%, hsl(var(--primary) / 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 25% 25%, hsl(var(--primary) / 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, hsl(var(--accent) / 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating background elements */}
        {backgroundElements.map((element, index) => (
          <BackgroundElement
            key={index}
            icon={element.icon}
            delay={index * 2}
            color={element.color}
            size={element.size}
            position={element.position}
          />
        ))}

        {/* Texture overlay */}
        <div className="absolute inset-0 bg-texture-paper opacity-20" />
      </div>

      <div className="container mx-auto max-w-7xl px-6 md:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          variants={staggeredContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center max-w-4xl mx-auto mb-20 space-y-8"
        >
          <motion.div variants={dignifiedReveal} className="space-y-6">
            {/* Animated badge */}
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card/80 backdrop-blur-sm border border-border/40 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <HandHeart className="w-5 h-5 text-primary" />
              </motion.div>
              <span className="text-small-meta font-medium text-foreground">
                Make Your Impact
              </span>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 bg-accent rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            <h2 className="text-heading2 font-bold text-foreground">{title}</h2>

            <p className="text-body-large text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Every contribution matters. Choose the path that resonates with
              you and join thousands of others creating meaningful change in
              communities around the world.
            </p>
          </motion.div>

          {/* Impact preview stats */}
          <motion.div
            variants={dignifiedReveal}
            className="flex flex-wrap items-center justify-center gap-8 text-small-meta"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span>Growing Daily</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4 text-blue-500" />
              <span>Global Community</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Target className="w-4 h-4 text-purple-500" />
              <span>Proven Impact</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>Start Today</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={staggeredContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {options.map((option, index) => (
            <motion.div
              key={index}
              variants={dignifiedReveal}
              transition={{ delay: index * 0.15 }}
            >
              <InvolvementCard
                option={option}
                index={index}
                isHovered={hoveredCard === index}
                onHover={setHoveredCard}
                locale={locale}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          variants={dignifiedReveal}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center space-y-8"
        >
          <div className="bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-border/40 shadow-xl max-w-4xl mx-auto relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0">
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary/10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-accent/10"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-center">
                <motion.div
                  className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl"
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Sparkles className="w-12 h-12 text-primary" />
                </motion.div>
              </div>

              <h3 className="text-heading3 font-bold text-foreground">
                Ready to Create Lasting Change?
              </h3>

              <p className="text-body-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Join a movement that&apos;s transforming lives across the globe.
                Your involvement, no matter how big or small, contributes to
                real, measurable impact.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-6">
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={`/${locale}/get-involved`}
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <Target className="w-5 h-5" />
                    Explore All Options
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={`/${locale}/contact`}
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 text-foreground hover:text-primary font-semibold rounded-xl transition-all duration-300"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Get Personal Guidance
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
