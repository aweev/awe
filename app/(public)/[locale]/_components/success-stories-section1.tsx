// // app/(public)/[locale]/_components/success-stories-section.tsx

// "use client";

// import { motion } from "framer-motion";
// import useEmblaCarousel from "embla-carousel-react";
// import Autoplay from "embla-carousel-autoplay";
// import { dignifiedReveal } from "@/lib/animations";
// import { SuccessStory } from "@/types/homepage";
// import { StoryCard } from "./story-card";
// import { Heart, ArrowRight } from "lucide-react";
// import Link from "next/link";

// interface SuccessStoriesSectionProps {
//   stories: SuccessStory[];
//   title: string;
//   subtitle: string;
// }

// export function SuccessStoriesSection({ stories, title, subtitle }: SuccessStoriesSectionProps) {
//   const featuredStories = stories.slice(0, 6);
//   const [emblaRef] = useEmblaCarousel(
//     { loop: true, align: "start" },
//     [Autoplay({ delay: 6000, stopOnInteraction: true })]
//   );

//   return (
//     <section className="relative bg-gradient-to-b from-background via-background/95 to-muted/20 section-spacing overflow-hidden">
//       {/* floating accents */}
//       <motion.div
//         className="absolute -top-20 right-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl"
//         animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
//         transition={{ duration: 8, repeat: Infinity }}
//       />
//       <motion.div
//         className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-accent/10 blur-3xl"
//         animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.2, 0.5, 0.2] }}
//         transition={{ duration: 10, repeat: Infinity }}
//       />

//       <div className="container-brand relative z-10">
//         {/* Header */}
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.5 }}
//           variants={dignifiedReveal}
//           className="max-w-4xl mx-auto text-center space-y-6"
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/60 shadow-sm">
//             <Heart className="w-4 h-4 text-primary" />
//             <span className="text-small-meta font-medium text-foreground">
//               Stories of Transformation
//             </span>
//           </div>
//           <h2 className="text-heading2 text-foreground">{title}</h2>
//           <p className="text-body-base text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
//         </motion.div>

//         {/* Grid on desktop, carousel on mobile */}
//         <div className="mt-20">
//           <div className="hidden md:grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//             {featuredStories.map((story, index) => (
//               <StoryCard key={story.id} story={story} index={index} />
//             ))}
//           </div>

//           <div className="md:hidden overflow-hidden" ref={emblaRef}>
//             <div className="flex gap-6">
//               {featuredStories.map((story, index) => (
//                 <div key={story.id} className="min-w-[85%] flex-shrink-0">
//                   <StoryCard story={story} index={index} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* CTA */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, delay: 0.5 }}
//           className="mt-20 text-center"
//         >
//           <Link
//             href="/stories"
//             className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary border border-primary/20 hover:border-primary/40 transition-all duration-300 font-medium group"
//           >
//             Read More Stories
//             <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
//           </Link>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
