// app/(public)/[locale]/_components/homepage/newsletter-section.tsx

"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { dignifiedReveal, staggeredContainer } from "@/lib/animations";
import {
  ArrowRight,
  Mail,
  Check,
  Globe,
  Users,
  Heart,
  Bell,
  Send,
  Shield,
  Star,
} from "lucide-react";

interface NewsletterSectionProps {
  title: string;
  subtitle: string;
  locale?: string;
}

// Floating particle component (no changes needed for mobile)
const FloatingParticle: React.FC<{
  delay: number;
  duration: number;
  size: number;
  color: string;
  initialX: number;
  initialY: number;
}> = ({ delay, duration, size, color, initialX, initialY }) => (
  <motion.div
    className={`absolute ${color} rounded-full blur-sm`}
    style={{
      width: size,
      height: size,
      left: `${initialX}%`,
      top: `${initialY}%`,
    }}
    animate={{
      y: [-20, -60, -20],
      x: [-10, 10, -10],
      opacity: [0, 0.6, 0],
      scale: [0.8, 1.2, 0.8],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Success animation component (no changes needed for mobile)
const SuccessAnimation: React.FC = () => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0, opacity: 0 }}
    className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-2xl border border-green-500/30"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      className="flex flex-col items-center gap-4 text-center p-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center"
      >
        <Check className="w-8 h-8 text-white" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-2"
      >
        <h3 className="text-lg font-bold text-foreground">Success!</h3>
        <p className="text-body-base text-muted-foreground">
          Welcome to our community of changemakers.
        </p>
      </motion.div>
    </motion.div>
  </motion.div>
);

// Enhanced stats component
const NewsletterStats: React.FC<{ locale: string }> = ({ locale }) => {
  const stats = [
    {
      icon: Users,
      value: "15K+",
      label:
        locale === "fr"
          ? "Abonnés"
          : locale === "de"
          ? "Abonnenten"
          : "Subscribers",
    },
    {
      icon: Globe,
      value: "45",
      label:
        locale === "fr" ? "Pays" : locale === "de" ? "Länder" : "Countries",
    },
    {
      icon: Heart,
      value: "98%",
      label:
        locale === "fr"
          ? "Satisfaction"
          : locale === "de"
          ? "Zufriedenheit"
          : "Satisfaction",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="flex flex-wrap items-center justify-center gap-4 mt-8"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          className="flex items-center gap-3 px-4 py-2 rounded-xl bg-card/40 backdrop-blur-md border border-border/30"
          whileHover={{ y: -2, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
            <stat.icon className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export function NewsletterSection({
  title,
  subtitle,
  locale = "en",
}: NewsletterSectionProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (newEmail === "" || validateEmail(newEmail)) {
      setIsValidEmail(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsValidEmail(email === "" || validateEmail(email));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setIsValidEmail(false);
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setEmail("");

    setTimeout(() => setIsSuccess(false), 4000);
  };

  const content = {
    en: {
      badge: "Join Our Impact Newsletter",
      placeholder: "Your email address",
      button: "Subscribe",
      submitting: "Subscribing...",
      privacy: "We respect your privacy. Unsubscribe anytime.",
      benefits: [
        "Weekly impact updates",
        "Exclusive community stories",
        "Early access to programs",
      ],
      socialProof: "Join thousands of changemakers worldwide",
    },
    de: {
      badge: "Treten Sie unserem Impact Newsletter bei",
      placeholder: "E-Mail-Adresse eingeben",
      button: "Abonnieren",
      submitting: "Abonniere...",
      privacy: "Wir respektieren Ihre Privatsphäre. Jederzeit abbestellbar.",
      benefits: [
        "Wöchentliche Updates",
        "Exklusive Geschichten",
        "Früher Zugang",
      ],
      socialProof: "Schließen Sie sich Tausenden von Changemakern weltweit an",
    },
    fr: {
      badge: "Rejoignez notre newsletter d'impact",
      placeholder: "Entrez votre adresse e-mail",
      button: "S'abonner",
      submitting: "Abonnement...",
      privacy:
        "Nous respectons votre vie privée. Désabonnez-vous à tout moment.",
      benefits: [
        "Mises à jour hebdomadaires",
        "Histoires exclusives",
        "Accès anticipé",
      ],
      socialProof:
        "Rejoignez des milliers de créateurs de changement dans le monde",
    },
  };

  const localContent = content[locale as keyof typeof content] || content.en;

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-background via-muted/10 to-background"
    >
      {/* Background elements are fine, but let's ensure they don't cause performance issues on mobile */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-50"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, hsl(var(--primary)/0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, hsl(var(--accent)/0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 30% 60%, hsl(var(--accent)/0.15) 0%, transparent 50%), radial-gradient(circle at 70% 40%, hsl(var(--primary)/0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 30%, hsl(var(--primary)/0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, hsl(var(--accent)/0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="absolute top-20 left-1/4 w-32 h-32 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-primary/10 to-accent/20 backdrop-blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 right-1/4 w-24 h-24 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-accent/15 to-primary/10 backdrop-blur-3xl"
          animate={{
            scale: [1.1, 0.9, 1.1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -25, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
        {isInView &&
          [...Array(6)].map(
            (
              _,
              i // Reduced particle count for performance
            ) => (
              <FloatingParticle
                key={i}
                delay={i}
                duration={10 + Math.random() * 5}
                size={4 + Math.random() * 6}
                color={i % 2 === 0 ? "bg-primary/30" : "bg-accent/30"}
                initialX={10 + Math.random() * 80}
                initialY={20 + Math.random() * 60}
              />
            )
          )}
        <div className="absolute inset-0 bg-texture-paper opacity-20" />
      </div>

      <div className="container-brand relative z-10">
        <motion.div
          variants={staggeredContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-center space-y-10"
        >
          {/* Header Section */}
          <motion.div variants={dignifiedReveal} className="space-y-4">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 backdrop-blur-md border border-border/40 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <Bell className="w-4 h-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-foreground">
                {localContent.badge}
              </span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-heading2 font-serif text-foreground px-4">
              {title}
            </h2>

            <p className="text-base md:text-body-large text-muted-foreground max-w-2xl mx-auto px-4">
              {subtitle}
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div
            variants={dignifiedReveal}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4"
          >
            {localContent.benefits.map((benefit, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl bg-card/40 backdrop-blur-md border border-border/30"
                whileHover={{ y: -2, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground text-left">
                  {benefit}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Glassmorphism Form */}
          <motion.div
            variants={dignifiedReveal}
            className="relative max-w-lg mx-auto px-4"
          >
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${
                isFocused
                  ? "bg-card/70 backdrop-blur-xl border-2 border-primary/40 shadow-2xl shadow-primary/10"
                  : "bg-card/50 backdrop-blur-md border border-border/40 shadow-xl"
              } ${!isValidEmail ? "border-red-500/50" : ""}`}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative p-2">
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <div className="w-full flex items-center gap-3 px-4 py-3">
                    <Mail
                      className={`w-5 h-5 transition-colors duration-300 ${
                        isFocused ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={handleEmailChange}
                      onFocus={() => setIsFocused(true)}
                      onBlur={handleBlur}
                      placeholder={localContent.placeholder}
                      disabled={isSubmitting}
                      className="w-full bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting || !email || !isValidEmail}
                    className="w-full sm:w-auto group relative overflow-hidden px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-accent to-primary"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                          {localContent.submitting}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          {localContent.button}
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 hidden sm:inline" />
                        </>
                      )}
                    </span>
                  </motion.button>
                </div>
                <AnimatePresence>
                  {!isValidEmail && email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      className="px-4 pb-2 text-sm text-red-500 text-left"
                    >
                      Please enter a valid email address.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {isSuccess && <SuccessAnimation />}
              </AnimatePresence>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground"
            >
              <Shield className="w-3 h-3" />
              <span>{localContent.privacy}</span>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <NewsletterStats locale={locale} />

          {/* Social Proof */}
          <motion.div
            variants={dignifiedReveal}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-muted-foreground"
          >
            <div className="flex -space-x-3">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent border-2 border-background flex items-center justify-center"
                  initial={{ scale: 0, x: -20 }}
                  animate={{ scale: 1, x: 0 }}
                  transition={{ delay: 1.2 + i * 0.1, type: "spring" }}
                >
                  <span className="text-xs font-bold text-white">
                    {String.fromCharCode(65 + i)}
                  </span>
                </motion.div>
              ))}
            </div>
            <span>{localContent.socialProof}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
