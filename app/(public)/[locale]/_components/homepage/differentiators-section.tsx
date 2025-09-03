// app/(public)/[locale]/_components/homepage/differentiators-section.tsx

"use client";

import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { Differentiator } from "@/types/homepage";
import { staggeredContainer, dignifiedReveal } from "@/lib/animations";
import { Icon } from "@/components/ui/icon";
import {
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Award,
  Heart,
  Compass,
  Zap,
  ChevronRight,
} from "lucide-react";

interface DifferentiatorsSectionProps {
  differentiators: Differentiator[];
  title: string;
  locale?: string;
}

/* ---------------- Enhanced Feature Card ---------------- */
const FeatureCard: React.FC<{
  differentiator: Differentiator;
  index: number;
  isActive: boolean;
  onClick: () => void;
  locale?: string;
}> = ({ differentiator, index, isActive, onClick, locale = "en" }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  // Mock additional data for enhanced cards
  const enhancedData = {
    en: [
      {
        metrics: [
          "95% Community Satisfaction",
          "Local Leadership Training",
          "Sustainable Solutions",
        ],
        description:
          "Our programs are designed with community input from day one, ensuring cultural relevance and long-term sustainability through local ownership.",
        cta: "Learn Our Process",
      },
      {
        metrics: [
          "Health + Education + Economic",
          "360° Family Support",
          "Integrated Approach",
        ],
        description:
          "We don't just address symptoms. Our holistic model tackles root causes by connecting health, education, and economic opportunities in one comprehensive program.",
        cta: "See Full Model",
      },
      {
        metrics: [
          "Data-Driven Impact",
          "Continuous Improvement",
          "Evidence-Based Methods",
        ],
        description:
          "Every program is built on proven methodologies, tracked with real metrics, and continuously refined based on outcomes and community feedback.",
        cta: "View Results",
      },
      {
        metrics: [
          "Local Partnership",
          "Cultural Integration",
          "Respectful Engagement",
        ],
        description:
          "We work as partners, not outsiders. Our deep cultural understanding builds trust and ensures our programs resonate with local values and customs.",
        cta: "Meet Our Teams",
      },
    ],
    de: [
      {
        metrics: [
          "95% Gemeindezufriedenheit",
          "Lokale Führungsausbildung",
          "Nachhaltige Lösungen",
        ],
        description:
          "Unsere Programme werden von Anfang an mit Gemeindebeitrag gestaltet und gewährleisten kulturelle Relevanz und Nachhaltigkeit.",
        cta: "Unser Prozess",
      },
      {
        metrics: [
          "Gesundheit + Bildung + Wirtschaft",
          "360° Familienunterstützung",
          "Integrierter Ansatz",
        ],
        description:
          "Wir behandeln nicht nur Symptome. Unser ganzheitliches Modell geht die Grundursachen an.",
        cta: "Vollständiges Modell",
      },
      {
        metrics: [
          "Datengesteuerte Wirkung",
          "Kontinuierliche Verbesserung",
          "Evidenzbasierte Methoden",
        ],
        description:
          "Jedes Programm basiert auf bewährten Methoden und wird kontinuierlich verfeinert.",
        cta: "Ergebnisse ansehen",
      },
      {
        metrics: [
          "Lokale Partnerschaft",
          "Kulturelle Integration",
          "Respektvolle Zusammenarbeit",
        ],
        description:
          "Wir arbeiten als Partner, nicht als Außenstehende, mit tiefem kulturellem Verständnis.",
        cta: "Unsere Teams kennenlernen",
      },
    ],
    fr: [
      {
        metrics: [
          "95% Satisfaction Communautaire",
          "Formation Leadership Local",
          "Solutions Durables",
        ],
        description:
          "Nos programmes sont conçus avec la contribution communautaire dès le premier jour.",
        cta: "Notre Processus",
      },
      {
        metrics: [
          "Santé + Éducation + Économique",
          "Soutien Familial 360°",
          "Approche Intégrée",
        ],
        description:
          "Nous ne traitons pas seulement les symptômes. Notre modèle holistique s'attaque aux causes profondes.",
        cta: "Voir le Modèle Complet",
      },
      {
        metrics: [
          "Impact Basé sur les Données",
          "Amélioration Continue",
          "Méthodes Fondées sur les Preuves",
        ],
        description:
          "Chaque programme est construit sur des méthodologies éprouvées.",
        cta: "Voir les Résultats",
      },
      {
        metrics: [
          "Partenariat Local",
          "Intégration Culturelle",
          "Engagement Respectueux",
        ],
        description:
          "Nous travaillons en tant que partenaires avec une compréhension culturelle profonde.",
        cta: "Rencontrer nos Équipes",
      },
    ],
  };

  const content =
    enhancedData[locale as keyof typeof enhancedData]?.[index] ||
    enhancedData.en[index];

  return (
    <motion.div
      ref={cardRef}
      className={`group cursor-pointer transition-all duration-500 ${
        isActive ? "lg:col-span-2" : "lg:col-span-1"
      }`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay: index * 0.1, ease: "easeOut" },
        },
      }}
      onClick={onClick}
      layout
    >
      <motion.div
        className={`relative h-full p-8 rounded-3xl bg-gradient-to-br transition-all duration-500 border shadow-lg hover:shadow-2xl ${
          isActive
            ? "from-primary/5 via-accent/5 to-primary/10 border-primary/20 shadow-primary/10"
            : "from-card/90 to-card/70 border-border/40 hover:border-primary/30"
        } backdrop-blur-sm`}
        whileHover={{ y: -4 }}
        layout
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-texture-paper opacity-20 rounded-3xl" />

        <div
          className={`relative z-10 h-full flex flex-col transition-all duration-500 ${
            isActive ? "lg:flex-row lg:gap-8" : "flex-col"
          }`}
        >
          {/* Icon and Title Section */}
          <div className={`${isActive ? "lg:flex-1" : "mb-6"} space-y-6`}>
            <motion.div
              className={`flex items-center justify-center rounded-2xl shadow-lg transition-all duration-300 ${
                isActive
                  ? "w-20 h-20 bg-gradient-to-r from-primary to-accent"
                  : "w-16 h-16 bg-gradient-to-r from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20"
              }`}
              whileHover={{
                scale: 1.1,
                rotate: isActive ? [0, -5, 5, 0] : 0,
                transition: { duration: 0.3 },
              }}
            >
              <Icon
                name={differentiator.icon}
                className={`transition-all duration-300 ${
                  isActive
                    ? "w-10 h-10 text-white"
                    : "w-8 h-8 text-primary group-hover:text-accent"
                }`}
              />
            </motion.div>

            <div className="space-y-4">
              <h3
                className={`font-bold transition-all duration-300 ${
                  isActive
                    ? "text-2xl text-primary"
                    : "text-xl text-foreground group-hover:text-primary"
                }`}
              >
                {differentiator.title}
              </h3>

              <p
                className={`leading-relaxed transition-all duration-300 ${
                  isActive
                    ? "text-body-base text-foreground"
                    : "text-body-base text-muted-foreground"
                }`}
              >
                {isActive ? content?.description : differentiator.description}
              </p>
            </div>

            {!isActive && (
              <div className="flex items-center gap-2 text-primary/70 text-small-meta opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span>Click to expand</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            )}
          </div>

          {/* Expanded Content - Only visible when active */}
          {isActive && content && (
            <motion.div
              className="lg:flex-1 space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  Key Highlights
                </h4>

                <div className="grid gap-3">
                  {content.metrics.map((metric, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-xl bg-card/60 border border-border/20 backdrop-blur-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-small-meta font-medium text-foreground">
                        {metric}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.button
                className="w-full flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                {content.cta}
                <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Hover Effect Overlay */}
        {!isActive && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

/* ---------------- Main Differentiators Section ---------------- */
export function DifferentiatorsSection({
  differentiators,
  title,
  locale = "en",
}: DifferentiatorsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setActiveCard(activeCard === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gradient-to-b from-background via-muted/5 to-background overflow-hidden"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-16 w-96 h-96 bg-gradient-to-l from-accent/15 to-primary/15 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Geometric Elements */}
        <motion.div
          className="absolute top-32 right-32 w-24 h-24 border-2 border-primary/30 rounded-lg"
          animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-40 left-40 w-16 h-16 bg-accent/20 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.8, 0.4],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Texture Overlay */}
        <div className="absolute inset-0 bg-texture-paper opacity-30" />
      </div>

      <div className="container mx-auto max-w-7xl px-6 md:px-8 lg:px-12 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          variants={staggeredContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center max-w-4xl mx-auto mb-20 space-y-8"
        >
          <motion.div variants={dignifiedReveal} className="space-y-6">
            <motion.div
              className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-card/80 backdrop-blur-sm border border-border/40 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-6 h-6 text-primary" />
              </motion.div>
              <span className="text-small-meta font-medium text-foreground">
                What Sets Us Apart
              </span>
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 bg-accent rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            <h2 className="text-heading2 font-bold text-foreground">{title}</h2>

            <p className="text-body-large text-muted-foreground leading-relaxed">
              Our unique methodology combines proven development practices with
              innovative approaches, creating sustainable transformation that
              goes far beyond traditional aid work.
            </p>
          </motion.div>
        </motion.div>

        {/* Enhanced Cards Grid */}
        <motion.div
          variants={staggeredContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20"
        >
          {differentiators.map((item, index) => (
            <FeatureCard
              key={index}
              differentiator={item}
              index={index}
              isActive={activeCard === index}
              onClick={() => handleCardClick(index)}
              locale={locale}
            />
          ))}
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center space-y-8"
        >
          <div className="bg-gradient-to-r from-card/60 to-card/40 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-border/40 shadow-lg max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-center">
                <motion.div
                  className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl"
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  <Compass className="w-12 h-12 text-primary" />
                </motion.div>
              </div>

              <h3 className="text-heading3 font-bold text-foreground">
                Ready to Experience the Difference?
              </h3>

              <p className="text-body-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Join thousands of communities worldwide already transforming
                their futures with our proven, culturally-sensitive approach to
                sustainable development.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-6">
                <motion.a
                  href={`/${locale}/get-involved/partner`}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Heart className="w-5 h-5" />
                  Partner With Us
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </motion.a>

                <motion.a
                  href={`/${locale}/about/approach`}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 text-foreground hover:text-primary font-semibold rounded-xl transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Lightbulb className="w-5 h-5" />
                  Learn Our Approach
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
