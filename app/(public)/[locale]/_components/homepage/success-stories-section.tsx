// app/(public)/[locale]/_components/homepage/success-stories-section.tsx

"use client";

import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { SuccessStory } from "@/types/homepage";
import { staggeredContainer, dignifiedReveal } from "@/lib/animations";
import {
  ArrowRight,
  Quote,
  MapPin,
  Calendar,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  Play,
  ExternalLink,
  Users,
  BookOpen,
  Award,
  Sparkles,
} from "lucide-react";

interface SuccessStoriesSectionProps {
  stories: SuccessStory[];
  title: string;
  subtitle: string;
  locale?: string;
}

/* ---------------- Story Card Component ---------------- */
const StoryCard: React.FC<{
  story: SuccessStory;
  index: number;
  isActive: boolean;
  onClick: () => void;
  locale?: string;
}> = ({ story, index, isActive, onClick, locale = "en" }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  // Mock additional data for richer stories
  const enhancedStories = {
    en: [
      {
        category: "Women's Empowerment",
        location: "Kakuma Camp, Kenya",
        impact: "Started 3 businesses, trained 50+ women",
        duration: "18 months",
        tags: ["Leadership", "Entrepreneurship", "Community"],
        fullQuote:
          "AWE didn't just give me skills—they gave me the confidence to believe in myself. Now I run three small businesses and have trained over 50 women in my community. We've created a network of support that extends far beyond what I ever imagined possible.",
        achievements: ["Business Owner", "Community Trainer", "Mentor"],
      },
      {
        category: "Youth Development",
        location: "Kampala, Uganda",
        impact: "Youth center serving 200+ children",
        duration: "2 years",
        tags: ["Education", "Leadership", "Innovation"],
        fullQuote:
          "When AWE came to our village, everything changed. They didn't just bring programs—they brought hope. Today, our youth center serves over 200 children, and we've sent 15 young people to university. This is what real transformation looks like.",
        achievements: ["Youth Leader", "Education Advocate", "Changemaker"],
      },
      {
        category: "Child Education",
        location: "Zaatari Camp, Jordan",
        impact: "40 children now in school",
        duration: "3 years",
        tags: ["Education", "Resilience", "Future"],
        fullQuote:
          "Education was something I thought we had lost forever. AWE showed us that learning never stops, no matter where you are. My children are not just in school—they're thriving, dreaming, and building a future I once thought impossible.",
        achievements: [
          "Education Advocate",
          "Parent Leader",
          "Community Voice",
        ],
      },
    ],
    de: [
      {
        category: "Frauenförderung",
        location: "Kakuma Lager, Kenia",
        impact: "3 Unternehmen gegründet, 50+ Frauen ausgebildet",
        duration: "18 Monate",
        tags: ["Führung", "Unternehmertum", "Gemeinschaft"],
        fullQuote:
          "AWE hat mir nicht nur Fähigkeiten gegeben—sie haben mir das Vertrauen gegeben, an mich selbst zu glauben.",
        achievements: ["Unternehmerin", "Gemeinde-Trainerin", "Mentorin"],
      },
      {
        category: "Jugendentwicklung",
        location: "Kampala, Uganda",
        impact: "Jugendzentrum für 200+ Kinder",
        duration: "2 Jahre",
        tags: ["Bildung", "Führung", "Innovation"],
        fullQuote:
          "Als AWE in unser Dorf kam, änderte sich alles. Sie brachten nicht nur Programme—sie brachten Hoffnung.",
        achievements: ["Jugendleiter", "Bildungsanwalt", "Veränderer"],
      },
      {
        category: "Kinderbildung",
        location: "Zaatari Lager, Jordanien",
        impact: "40 Kinder jetzt in der Schule",
        duration: "3 Jahre",
        tags: ["Bildung", "Widerstandsfähigkeit", "Zukunft"],
        fullQuote:
          "Bildung war etwas, das wir für immer verloren zu haben glaubten. AWE zeigte uns, dass das Lernen niemals aufhört.",
        achievements: ["Bildungsanwalt", "Elternführer", "Gemeindestimme"],
      },
    ],
    fr: [
      {
        category: "Autonomisation des Femmes",
        location: "Camp Kakuma, Kenya",
        impact: "3 entreprises créées, 50+ femmes formées",
        duration: "18 mois",
        tags: ["Leadership", "Entrepreneuriat", "Communauté"],
        fullQuote:
          "AWE ne m'a pas seulement donné des compétences—ils m'ont donné la confiance de croire en moi-même.",
        achievements: [
          "Propriétaire d'entreprise",
          "Formatrice communautaire",
          "Mentore",
        ],
      },
      {
        category: "Développement Jeunesse",
        location: "Kampala, Ouganda",
        impact: "Centre jeunesse servant 200+ enfants",
        duration: "2 ans",
        tags: ["Éducation", "Leadership", "Innovation"],
        fullQuote:
          "Quand AWE est arrivé dans notre village, tout a changé. Ils n'ont pas seulement apporté des programmes—ils ont apporté l'espoir.",
        achievements: [
          "Leader Jeunesse",
          "Avocat de l'Éducation",
          "Acteur du Changement",
        ],
      },
      {
        category: "Éducation des Enfants",
        location: "Camp Zaatari, Jordanie",
        impact: "40 enfants maintenant à l'école",
        duration: "3 ans",
        tags: ["Éducation", "Résilience", "Avenir"],
        fullQuote:
          "L'éducation était quelque chose que je pensais avoir perdu pour toujours. AWE nous a montré que l'apprentissage ne s'arrête jamais.",
        achievements: [
          "Avocat de l'Éducation",
          "Leader Parent",
          "Voix Communautaire",
        ],
      },
    ],
  };

  const enhanced =
    enhancedStories[locale as keyof typeof enhancedStories]?.[index] ||
    enhancedStories.en[index];

  return (
    <motion.div
      ref={cardRef}
      className={`group cursor-pointer transition-all duration-500 ${
        isActive ? "lg:col-span-2 lg:row-span-2" : "lg:col-span-1"
      }`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.6, delay: index * 0.15, ease: "easeOut" },
        },
      }}
      onClick={onClick}
      layout
    >
      <motion.div
        className={`relative h-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border ${
          isActive
            ? "border-primary/30 shadow-primary/10"
            : "border-border/40 hover:border-primary/20"
        }`}
        whileHover={{ y: isActive ? 0 : -4 }}
        layout
      >
        {/* Image Section */}
        <div
          className={`relative overflow-hidden ${isActive ? "h-64" : "h-48"}`}
        >
          {story.image_url ? (
            <>
              <motion.img
                src={story.image_url}
                alt={story.title}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
                }`}
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-muted to-accent/20 animate-pulse" />
              )}
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/20 flex items-center justify-center">
              <Users className="w-16 h-16 text-primary/60" />
            </div>
          )}

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-card/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground border border-border/40">
              <div className="w-2 h-2 bg-primary rounded-full" />
              {enhanced?.category}
            </span>
          </div>

          {/* Location */}
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-card/90 backdrop-blur-sm rounded-full text-xs text-muted-foreground border border-border/40">
              <MapPin className="w-3 h-3" />
              {enhanced?.location}
            </div>
          </div>

          {/* Play Button for Active Card */}
          {isActive && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                className="p-4 bg-white/90 backdrop-blur-sm rounded-full shadow-xl text-primary hover:bg-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Play className="w-8 h-8" />
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Content Section */}
        <div
          className={`p-6 bg-card/95 backdrop-blur-sm transition-all duration-500 ${
            isActive ? "space-y-6" : "space-y-4"
          }`}
        >
          {/* Quote */}
          <div className="space-y-3">
            <Quote className="w-8 h-8 text-primary/60" />
            <blockquote
              className={`italic leading-relaxed transition-all duration-300 ${
                isActive ? "text-body-base" : "text-body-base line-clamp-3"
              } text-foreground`}
            >
              &quot;
              {isActive && enhanced?.fullQuote
                ? enhanced.fullQuote
                : story.quote}
              &quot;
            </blockquote>
          </div>

          {/* Profile */}
          {story.profile && (
            <div className="flex items-center gap-3">
              {story.profile.avatar_url ? (
                <Image
                  src={story.profile.avatar_url}
                  alt={story.profile.full_name}
                  className="w-12 h-12 rounded-full border-2 border-primary/20"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center border-2 border-primary/20">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              )}
              <div>
                <p className="font-semibold text-foreground">
                  {story.profile.full_name}
                </p>
                {isActive && enhanced?.impact && (
                  <p className="text-small-meta text-muted-foreground">
                    {enhanced.impact}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Extended Content for Active Card */}
          {isActive && enhanced && (
            <motion.div
              className="space-y-4 pt-4 border-t border-border/40"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {enhanced.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Achievements */}
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Award className="w-4 h-4 text-accent" />
                  Key Achievements
                </h4>
                <div className="grid gap-2">
                  {enhanced.achievements.map((achievement, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-small-meta text-muted-foreground"
                    >
                      <Star className="w-3 h-3 text-yellow-500" />
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>

              {/* Program Duration */}
              <div className="flex items-center gap-2 text-small-meta text-muted-foreground">
                <Calendar className="w-4 h-4" />
                Program Duration: {enhanced.duration}
              </div>

              {/* Read More Button */}
              <motion.a
                href={`/${locale}/stories/${story.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent text-white text-small-meta font-semibold rounded-lg hover:shadow-lg transition-all group/link"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Read Full Story
                <ExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" />
              </motion.a>
            </motion.div>
          )}

          {/* Expand Indicator for Inactive Cards */}
          {!isActive && (
            <div className="flex items-center justify-between pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs text-primary font-medium">
                Click to expand
              </span>
              <ChevronRight className="w-4 h-4 text-primary transition-transform group-hover:translate-x-1" />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ---------------- Main Success Stories Section ---------------- */
export function SuccessStoriesSection({
  stories,
  title,
  subtitle,
  locale = "en",
}: SuccessStoriesSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeStory, setActiveStory] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleStoryClick = (index: number) => {
    setActiveStory(activeStory === index ? null : index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % stories.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gradient-to-br from-muted/30 via-background to-accent/10 overflow-hidden"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        {/* Animated Story Elements */}
        <motion.div
          className="absolute top-16 left-16 w-64 h-64 bg-gradient-to-r from-primary/15 to-accent/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-32 right-20 w-80 h-80 bg-gradient-to-l from-accent/20 to-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Story-themed Decorative Elements */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-20 h-20 border-2 border-primary/30 rounded-full"
          animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="absolute bottom-1/3 left-1/3 w-12 h-12 bg-accent/30 rounded-lg"
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating Quote Marks */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-20"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 10, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          >
            <Quote className="w-16 h-16 text-primary" />
          </motion.div>
        ))}

        {/* Texture Overlay */}
        <div className="absolute inset-0 bg-texture-paper opacity-20" />
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
                className="p-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Heart className="w-5 h-5 text-primary" />
              </motion.div>
              <span className="text-small-meta font-medium text-foreground">
                Real Stories, Real Impact
              </span>
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 bg-accent rounded-full"
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            <h2 className="text-heading2 font-bold text-foreground">{title}</h2>

            <p className="text-body-large text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          </motion.div>
        </motion.div>

        {/* Stories Grid */}
        <motion.div
          variants={staggeredContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {stories.map((story, index) => (
            <StoryCard
              key={story.id}
              story={story}
              index={index}
              isActive={activeStory === index}
              onClick={() => handleStoryClick(index)}
              locale={locale}
            />
          ))}
        </motion.div>

        {/* Navigation and CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center space-y-8"
        >
          {/* Story Navigation */}
          <div className="flex items-center justify-center gap-4">
            <motion.button
              onClick={prevSlide}
              className="p-3 bg-card/80 backdrop-blur-sm border border-border/40 rounded-full hover:border-primary/40 transition-all group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.button>

            <div className="flex gap-2">
              {stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-primary w-8"
                      : "bg-border hover:bg-primary/40"
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextSlide}
              className="p-3 bg-card/80 backdrop-blur-sm border border-border/40 rounded-full hover:border-primary/40 transition-all group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.button>
          </div>

          {/* Enhanced CTA */}
          <div className="bg-gradient-to-r from-card/60 to-card/40 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-border/40 shadow-lg max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-center">
                <motion.div
                  className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl"
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  <Sparkles className="w-12 h-12 text-primary" />
                </motion.div>
              </div>

              <h3 className="text-heading3 font-bold text-foreground">
                Every Story Starts with Hope
              </h3>

              <p className="text-body-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                These are just three examples of transformation happening in
                communities worldwide. Behind each story are countless others
                waiting to be written. Will you help us write the next chapter?
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-6">
                <motion.a
                  href={`/${locale}/stories`}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <BookOpen className="w-5 h-5" />
                  View All Stories
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </motion.a>

                <motion.a
                  href={`/${locale}/get-involved`}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 text-foreground hover:text-primary font-semibold rounded-xl transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Heart className="w-5 h-5" />
                  Start Your Story
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Section Divider Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-16 transform"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="currentColor"
            className="text-background"
            animate={{
              d: [
                "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z",
                "M0,0V56.29c47.79,12.2,103.59,22.17,158,18,70.36-5.37,136.33-23.31,206.8-27.5C438.64,42.43,512.34,43.67,583,62.05c69.27,28,138.3,34.88,209.4,23.08,36.15-6,69.85-7.84,104.45-19.34C989.49,35,1113-4.29,1200,62.47V0Z",
                "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </section>
  );
}
