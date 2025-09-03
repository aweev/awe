// components/public/public-header.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Menu,
  ArrowRight,
  Heart,
  Users,
  Target,
  Lightbulb,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/public/language-switcher";
import { HeaderLogo, MobileLogo } from "@/components/brand-logo";

interface NavLink {
  href: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
}

export function PublicHeader() {
  const t = useTranslations("PublicHeader");
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    {
      href: "/about",
      label: t("nav.about"),
      icon: <Users className="h-4 w-4" />,
      description: "Learn about our mission and team",
    },
    {
      href: "/our-work",
      label: t("nav.ourWork"),
      icon: <Lightbulb className="h-4 w-4" />,
      description: "Discover our programs and initiatives",
    },
    {
      href: "/impact",
      label: t("nav.impact"),
      icon: <Target className="h-4 w-4" />,
      description: "See the difference we're making",
    },
  ];

  // Dynamic header variants for light/dark mode
  const headerVariants = {
    top: {
      // backgroundColor:
      //   theme === "dark"
      //     ? "rgba(30, 41, 59, 0.8)" // Changed to match footer's muted color
      //     : "rgba(255, 255, 255, 0.85)",
      backdropFilter: "blur(12px)",
      boxShadow: "none",
    },
    scrolled: {
      // backgroundColor:
      //   theme === "dark"
      //     ? "rgba(30, 41, 59, 0.9)" // Changed to match footer's muted color
      //     : "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(24px)", // Increased blur for a glossier look
      boxShadow:
        theme === "dark"
          ? "0 1px 3px 0 rgb(255 255 255 / 0.05), 0 1px 2px -1px rgb(255 255 255 / 0.02)"
          : "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <motion.header
        className="sticky top-0 z-50 w-full border-b border-border/40 mt-0 overflow-hidden"
        initial="top"
        animate={isScrolled ? "scrolled" : "top"}
        variants={headerVariants}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Background layers to match footer */}
        <div className="absolute inset-0 bg-gradient-to-br from-muted/40 via-muted/30 to-muted/20" />
        <div className="absolute inset-0 bg-texture-paper opacity-30 dark:opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/2 via-transparent to-accent/3" />

        {/* Header Content */}
        <div className="relative container mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Enhanced Brand Logo with animation */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <HeaderLogo brandName={t("brandName")} />
            </motion.div>

            {/* Enhanced Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="group relative flex items-center gap-2 text-muted-foreground transition-all duration-300 hover:text-primary py-3 px-4 rounded-lg hover:bg-primary/5 dark:hover:bg-primary/10"
                  >
                    {link.icon}
                    <span className="font-medium">{link.label}</span>
                    <motion.span
                      className="absolute inset-x-2 bottom-1 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Enhanced Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              {/* CTA Buttons with enhanced animations */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  asChild
                  variant="secondary"
                  size="default"
                  className="font-medium transition-all duration-300 hover:shadow-md group bg-secondary/80 dark:bg-secondary/60 hover:bg-secondary dark:hover:bg-secondary/80 border border-border/50 dark:border-border/30"
                >
                  <Link
                    href="/get-involved/volunteer"
                    className="flex items-center gap-2"
                  >
                    <Users className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    {t("cta.volunteer")}
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  asChild
                  size="default"
                  className="font-medium transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary dark:from-primary dark:to-primary/90 dark:hover:from-primary/95 dark:hover:to-primary group relative overflow-hidden"
                >
                  <Link
                    href="/get-involved/donate"
                    className="flex items-center gap-2 relative z-10"
                  >
                    <Heart className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    {t("cta.donate")}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>

              {/* Enhanced Utility Controls */}
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-border/60 dark:border-border/40">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LanguageSwitcher />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ThemeToggle />
                </motion.div>
              </div>
            </div>

            {/* Enhanced Mobile Navigation */}
            <div className="md:hidden flex items-center gap-3">
              <LanguageSwitcher />
              <ThemeToggle />
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-border/60 dark:border-border/40 hover:border-primary/40 dark:hover:border-primary/30 hover:bg-primary/5 dark:hover:bg-primary/10 relative overflow-hidden"
                    >
                      <motion.div
                        animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Menu className="h-5 w-5" />
                      </motion.div>
                      <span className="sr-only">{t("nav.openMenu")}</span>
                    </Button>
                  </motion.div>
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className="w-full sm:w-96 bg-gradient-to-br from-background via-background to-background/95 dark:from-background dark:via-background dark:to-background/95 border-border dark:border-border/40 shadow-2xl backdrop-blur-sm"
                >
                  <SheetHeader className="sr-only">
                    <SheetTitle>{t("nav.mobileTitle")}</SheetTitle>
                  </SheetHeader>

                  {/* Enhanced Mobile Menu Content */}
                  <motion.div
                    className="flex flex-col h-full px-2"
                    variants={mobileMenuVariants}
                    initial="hidden"
                    animate={isOpen ? "visible" : "hidden"}
                  >
                    {/* Header with Brand */}
                    <motion.div
                      className="flex items-center py-6 border-b border-border/20 dark:border-border/10"
                      variants={mobileItemVariants}
                    >
                      <MobileLogo
                        brandName={t("brandName")}
                        onClick={() => setIsOpen(false)}
                      />
                    </motion.div>

                    {/* Enhanced Navigation Links */}
                    <motion.nav
                      className="py-6 space-y-2"
                      variants={mobileItemVariants}
                    >
                      {navLinks.map((link) => (
                        <motion.div
                          key={link.href}
                          variants={mobileItemVariants}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="group flex items-start gap-4 py-4 px-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/8 hover:to-accent/5 dark:hover:from-primary/15 dark:hover:to-accent/10 hover:border-primary/15 dark:hover:border-primary/20 border border-transparent"
                          >
                            <div className="mt-0.5 p-2 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary group-hover:bg-primary/15 dark:group-hover:bg-primary/30 transition-colors duration-300">
                              {link.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                                  {link.label}
                                </span>
                                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:translate-x-1" />
                              </div>
                              {link.description && (
                                <p className="text-sm text-muted-foreground mt-1 group-hover:text-muted-foreground/80 transition-colors duration-300">
                                  {link.description}
                                </p>
                              )}
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </motion.nav>

                    {/* Enhanced Call-to-Action Buttons */}
                    <motion.div
                      className="mt-auto pt-6 border-t border-border/20 dark:border-border/10 space-y-4"
                      variants={mobileItemVariants}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          asChild
                          size="lg"
                          className="w-full bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/95 hover:via-primary/90 hover:to-primary/85 dark:from-primary dark:via-primary dark:to-primary/90 dark:hover:from-primary/95 dark:hover:via-primary/90 dark:hover:to-primary/85 text-primary-foreground font-semibold shadow-lg hover:shadow-xl dark:shadow-primary/20 dark:hover:shadow-primary/30 transition-all duration-300 group h-14 relative overflow-hidden"
                        >
                          <Link
                            href="/get-involved/donate"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center gap-3 relative z-10"
                          >
                            <Heart className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                            <span>{t("cta.donate")}</span>
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />

                            {/* Animated background effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 dark:from-accent/30 dark:to-primary/30"
                              initial={{ x: "-100%" }}
                              whileHover={{ x: "100%" }}
                              transition={{ duration: 0.8 }}
                            />
                          </Link>
                        </Button>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          asChild
                          size="lg"
                          variant="outline"
                          className="w-full border-primary/20 dark:border-primary/30 bg-primary/5 dark:bg-primary/10 hover:bg-primary/10 dark:hover:bg-primary/20 text-foreground hover:text-primary hover:border-primary/30 dark:hover:border-primary/40 font-medium transition-all duration-300 h-14 group"
                        >
                          <Link
                            href="/get-involved/volunteer"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center gap-3"
                          >
                            <Users className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                            <span>{t("cta.volunteer")}</span>
                          </Link>
                        </Button>
                      </motion.div>
                    </motion.div>

                    {/* Enhanced Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/8 via-primary/4 to-transparent dark:from-primary/15 dark:via-primary/8 dark:to-transparent rounded-full -mr-16 -mt-16 blur-2xl" />
                    <div className="absolute bottom-32 left-0 w-24 h-24 bg-gradient-to-tr from-accent/8 via-accent/4 to-transparent dark:from-accent/15 dark:via-accent/8 dark:to-transparent rounded-full -ml-12 blur-xl" />
                  </motion.div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Enhanced progress indicator */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isScrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: "left" }}
        />
      </motion.header>

      {/* Enhanced animations for mobile menu items */}
      <style jsx global>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .animate-pulse-soft {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Smooth theme transitions */
        .theme-transition {
          transition: background-color 0.3s ease, border-color 0.3s ease,
            color 0.3s ease;
        }
      `}</style>
    </>
  );
}
