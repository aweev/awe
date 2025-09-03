// import Image from "next/image";
// import React, { useState, useRef, useCallback, useEffect } from "react";
// import { motion, useInView, AnimatePresence } from "framer-motion";
// import {
//   ArrowRight,
//   Quote,
//   MapPin,
//   Calendar,
//   Heart,
//   Star,
//   ChevronLeft,
//   ChevronRight,
//   Play,
//   Pause,
//   ExternalLink,
//   Users,
//   BookOpen,
//   Award,
//   Sparkles,
//   Globe,
// } from "lucide-react";

// // Mock data structure
// const mockStories = [
//   {
//     id: "1",
//     title: "From Refugee to Community Leader",
//     slug: "amara-community-leader",
//     quote:
//       "AWE didn't just give me skills—they gave me the confidence to believe in myself. Now I run three small businesses and have trained over 50 women in my community.",
//     image_url:
//       "https://images.unsplash.com/photo-1594824406741-7d5c5b0c6c00?w=600&h=400&fit=crop",
//     profile: {
//       full_name: "Amara Diallo",
//       avatar_url:
//         "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=100&h=100&fit=crop&crop=face",
//     },
//     category: "Women's Empowerment",
//     location: "Kakuma Camp, Kenya",
//     impact: "Started 3 businesses, trained 50+ women",
//     duration: "18 months",
//     tags: ["Leadership", "Entrepreneurship", "Community"],
//     achievements: ["Business Owner", "Community Trainer", "Mentor"],
//     fullQuote:
//       "AWE didn't just give me skills—they gave me the confidence to believe in myself. Now I run three small businesses and have trained over 50 women in my community. We've created a network of support that extends far beyond what I ever imagined possible.",
//   },
//   {
//     id: "2",
//     title: "Building Hope Through Education",
//     slug: "james-youth-center",
//     quote:
//       "When AWE came to our village, everything changed. They didn't just bring programs—they brought hope. Today, our youth center serves over 200 children.",
//     image_url:
//       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
//     profile: {
//       full_name: "James Okello",
//       avatar_url:
//         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
//     },
//     category: "Youth Development",
//     location: "Kampala, Uganda",
//     impact: "Youth center serving 200+ children",
//     duration: "2 years",
//     tags: ["Education", "Leadership", "Innovation"],
//     achievements: ["Youth Leader", "Education Advocate", "Changemaker"],
//     fullQuote:
//       "When AWE came to our village, everything changed. They didn't just bring programs—they brought hope. Today, our youth center serves over 200 children, and we've sent 15 young people to university. This is what real transformation looks like.",
//   },
//   {
//     id: "3",
//     title: "Never Too Late to Learn",
//     slug: "fatima-education-advocate",
//     quote:
//       "Education was something I thought we had lost forever. AWE showed us that learning never stops, no matter where you are.",
//     image_url:
//       "https://images.unsplash.com/photo-1582233479366-6d38bc390a08?w=600&h=400&fit=crop",
//     profile: {
//       full_name: "Fatima Al-Rashid",
//       avatar_url:
//         "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
//     },
//     category: "Child Education",
//     location: "Zaatari Camp, Jordan",
//     impact: "40 children now in school",
//     duration: "3 years",
//     tags: ["Education", "Resilience", "Future"],
//     achievements: ["Education Advocate", "Parent Leader", "Community Voice"],
//     fullQuote:
//       "Education was something I thought we had lost forever. AWE showed us that learning never stops, no matter where you are. My children are not just in school—they're thriving, dreaming, and building a future I once thought impossible.",
//   },
//   {
//     id: "4",
//     title: "Healing Through Art",
//     slug: "maria-art-therapy",
//     quote:
//       "Art became my language when words failed me. Through AWE's programs, I learned to heal myself and help others find their voice.",
//     image_url:
//       "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop",
//     profile: {
//       full_name: "Maria Santos",
//       avatar_url:
//         "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
//     },
//     category: "Arts & Healing",
//     location: "Lima, Peru",
//     impact: "Art therapy for 30+ trauma survivors",
//     duration: "14 months",
//     tags: ["Art", "Healing", "Community"],
//     achievements: ["Art Therapist", "Workshop Leader", "Healer"],
//     fullQuote:
//       "Art became my language when words failed me. Through AWE's programs, I learned to heal myself and help others find their voice. Now I run weekly art therapy sessions that have helped over 30 trauma survivors reclaim their stories.",
//   },
//   {
//     id: "5",
//     title: "Digital Dreams Made Real",
//     slug: "ahmed-tech-innovator",
//     quote:
//       "I never imagined I could code from a refugee camp. AWE's digital literacy program opened doors I didn't know existed.",
//     image_url:
//       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
//     profile: {
//       full_name: "Ahmed Hassan",
//       avatar_url:
//         "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face",
//     },
//     category: "Technology & Innovation",
//     location: "Cox's Bazar, Bangladesh",
//     impact: "Built app used by 1000+ refugees",
//     duration: "20 months",
//     tags: ["Technology", "Innovation", "Digital Literacy"],
//     achievements: ["App Developer", "Tech Mentor", "Innovation Leader"],
//     fullQuote:
//       "I never imagined I could code from a refugee camp. AWE's digital literacy program opened doors I didn't know existed. The app I built now helps over 1000 refugees access essential services and stay connected with their families.",
//   },
//   {
//     id: "6",
//     title: "Growing Hope",
//     slug: "priya-sustainable-farming",
//     quote:
//       "The soil here was barren, but AWE taught us that with patience and knowledge, anything can grow.",
//     image_url:
//       "https://images.unsplash.com/photo-1559825481-12a05cc00344?w=600&h=400&fit=crop",
//     profile: {
//       full_name: "Priya Sharma",
//       avatar_url:
//         "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
//     },
//     category: "Sustainable Agriculture",
//     location: "Rohingya Camps, Bangladesh",
//     impact: "Feeds 100+ families through farming",
//     duration: "2.5 years",
//     tags: ["Agriculture", "Sustainability", "Food Security"],
//     achievements: [
//       "Master Farmer",
//       "Agricultural Trainer",
//       "Food Security Advocate",
//     ],
//     fullQuote:
//       "The soil here was barren, but AWE taught us that with patience and knowledge, anything can grow. Our community farm now feeds over 100 families and has become a model for other settlements.",
//   },
// ];

// // Animation variants
// const staggeredContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.2,
//       delayChildren: 0.1,
//     },
//   },
// };

// const dignifiedReveal = {
//   hidden: { opacity: 0, y: 30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.6,
//       ease: "easeOut",
//     },
//   },
// };

// // Story Statistics Component
// const StoryStatistics = ({ stories }) => {
//   const stats = [
//     { value: stories.length, label: "Stories", icon: Quote },
//     { value: 15, label: "Countries", icon: Globe },
//     { value: 500, label: "Lives Changed", icon: Users },
//   ];

//   return (
//     <div className="flex items-center justify-center gap-8 mb-12">
//       {stats.map((stat, index) => (
//         <motion.div
//           key={index}
//           className="text-center"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: index * 0.1 }}
//         >
//           <div className="flex items-center justify-center mb-2">
//             <stat.icon className="w-5 h-5 text-blue-600 mr-2" />
//             <span className="text-2xl font-bold text-blue-600">
//               {stat.value}+
//             </span>
//           </div>
//           <p className="text-sm text-gray-600">{stat.label}</p>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// // Typewriter Quote Component
// const TypewriterQuote = ({ text, isActive }) => {
//   const [displayText, setDisplayText] = useState("");
//   const [isComplete, setIsComplete] = useState(false);

//   useEffect(() => {
//     if (!isActive) {
//       setDisplayText("");
//       setIsComplete(false);
//       return;
//     }

//     let index = 0;
//     const timer = setInterval(() => {
//       if (index <= text.length) {
//         setDisplayText(text.slice(0, index));
//         index++;
//       } else {
//         setIsComplete(true);
//         clearInterval(timer);
//       }
//     }, 50);

//     return () => clearInterval(timer);
//   }, [text, isActive]);

//   return (
//     <div className="min-h-[3rem] flex items-center justify-center">
//       <motion.p
//         className="text-lg italic text-gray-800 text-center max-w-3xl"
//         animate={isComplete ? { opacity: [0.7, 1, 0.7] } : {}}
//         transition={{ duration: 2, repeat: Infinity }}
//       >
//         "{displayText}"
//         {!isComplete && (
//           <motion.span
//             className="inline-block w-0.5 h-5 bg-blue-600 ml-1"
//             animate={{ opacity: [0, 1, 0] }}
//             transition={{ duration: 1, repeat: Infinity }}
//           />
//         )}
//       </motion.p>
//     </div>
//   );
// };

// // Story Card Component
// const StoryCard = ({ story, index, isActive, onClick }) => {
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const cardRef = useRef(null);
//   const isInView = useInView(cardRef, { once: true, amount: 0.3 });

//   return (
//     <motion.div
//       ref={cardRef}
//       className={`group cursor-pointer transition-all duration-500 ${
//         isActive ? "lg:col-span-2 lg:row-span-2" : "lg:col-span-1"
//       }`}
//       initial="hidden"
//       animate={isInView ? "visible" : "hidden"}
//       variants={{
//         hidden: { opacity: 0, y: 30, scale: 0.95 },
//         visible: {
//           opacity: 1,
//           y: 0,
//           scale: 1,
//           transition: { duration: 0.6, delay: index * 0.15, ease: "easeOut" },
//         },
//       }}
//       onClick={onClick}
//       layout
//     >
//       <motion.div
//         className={`relative h-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border bg-white ${
//           isActive
//             ? "border-blue-300 shadow-blue-100"
//             : "border-gray-200 hover:border-blue-200"
//         }`}
//         whileHover={{ y: isActive ? 0 : -4 }}
//         layout
//       >
//         {/* Image Section */}
//         <div
//           className={`relative overflow-hidden ${isActive ? "h-64" : "h-48"}`}
//         >
//           <Image
//             src={story.image_url}
//             alt={story.title}
//             className={`w-full h-full object-cover transition-all duration-500 ${
//               imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
//             }`}
//             onLoad={() => setImageLoaded(true)}
//           />
//           {!imageLoaded && (
//             <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-blue-50 animate-pulse" />
//           )}

//           {/* Image Overlay */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

//           {/* Category Badge */}
//           <div className="absolute top-4 left-4">
//             <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-800 border border-gray-200">
//               <div className="w-2 h-2 bg-blue-600 rounded-full" />
//               {story.category}
//             </span>
//           </div>

//           {/* Location */}
//           <div className="absolute top-4 right-4">
//             <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs text-gray-600 border border-gray-200">
//               <MapPin className="w-3 h-3" />
//               {story.location}
//             </div>
//           </div>

//           {/* Play Button for Active Card */}
//           {isActive && (
//             <motion.div
//               className="absolute inset-0 flex items-center justify-center"
//               initial={{ opacity: 0, scale: 0.5 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.3 }}
//             >
//               <motion.button
//                 className="p-4 bg-white/90 backdrop-blur-sm rounded-full shadow-xl text-blue-600 hover:bg-white transition-colors"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <Play className="w-8 h-8" />
//               </motion.button>
//             </motion.div>
//           )}
//         </div>

//         {/* Content Section */}
//         <div
//           className={`p-6 bg-white/95 backdrop-blur-sm transition-all duration-500 ${
//             isActive ? "space-y-6" : "space-y-4"
//           }`}
//         >
//           {/* Quote */}
//           <div className="space-y-3">
//             <Quote className="w-8 h-8 text-blue-600/60" />
//             <blockquote
//               className={`italic leading-relaxed transition-all duration-300 text-gray-800 ${
//                 isActive ? "text-base" : "text-base line-clamp-3"
//               }`}
//             >
//               &quot;
//               {isActive && story.fullQuote ? story.fullQuote : story.quote}
//               &quot;
//             </blockquote>
//           </div>

//           {/* Profile */}
//           {story.profile && (
//             <div className="flex items-center gap-3">
//               {story.profile.avatar_url ? (
//                 <Image
//                   src={story.profile.avatar_url}
//                   alt={story.profile.full_name}
//                   className="w-12 h-12 rounded-full border-2 border-blue-200"
//                 />
//               ) : (
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center border-2 border-blue-200">
//                   <Users className="w-6 h-6 text-blue-600" />
//                 </div>
//               )}
//               <div>
//                 <p className="font-semibold text-gray-800">
//                   {story.profile.full_name}
//                 </p>
//                 {isActive && story.impact && (
//                   <p className="text-sm text-gray-600">{story.impact}</p>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Extended Content for Active Card */}
//           {isActive && (
//             <motion.div
//               className="space-y-4 pt-4 border-t border-gray-200"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4, duration: 0.5 }}
//             >
//               {/* Tags */}
//               <div className="flex flex-wrap gap-2">
//                 {story.tags.map((tag, i) => (
//                   <span
//                     key={i}
//                     className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>

//               {/* Achievements */}
//               <div className="space-y-2">
//                 <h4 className="font-semibold text-gray-800 flex items-center gap-2">
//                   <Award className="w-4 h-4 text-yellow-500" />
//                   Key Achievements
//                 </h4>
//                 <div className="grid gap-2">
//                   {story.achievements.map((achievement, i) => (
//                     <div
//                       key={i}
//                       className="flex items-center gap-2 text-sm text-gray-600"
//                     >
//                       <Star className="w-3 h-3 text-yellow-500" />
//                       {achievement}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Program Duration */}
//               <div className="flex items-center gap-2 text-sm text-gray-600">
//                 <Calendar className="w-4 h-4" />
//                 Program Duration: {story.duration}
//               </div>

//               {/* Read More Button */}
//               <motion.a
//                 href={`/stories/${story.slug}`}
//                 className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all group"
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.6 }}
//               >
//                 Read Full Story
//                 <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
//               </motion.a>
//             </motion.div>
//           )}

//           {/* Expand Indicator for Inactive Cards */}
//           {!isActive && (
//             <div className="flex items-center justify-between pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
//               <span className="text-xs text-blue-600 font-medium">
//                 Click to expand
//               </span>
//               <ChevronRight className="w-4 h-4 text-blue-600 transition-transform group-hover:translate-x-1" />
//             </div>
//           )}
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// // Carousel Controls Component
// const CarouselControls = ({
//   currentSlide,
//   totalSlides,
//   onPrev,
//   onNext,
//   isPlaying,
//   onPlayPause,
// }) => {
//   return (
//     <div className="flex items-center justify-center gap-4 mt-8">
//       <motion.button
//         onClick={onPrev}
//         className="p-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-blue-300 text-gray-600 hover:text-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         <ChevronLeft className="w-5 h-5" />
//       </motion.button>

//       <motion.button
//         onClick={onPlayPause}
//         className="p-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         {isPlaying ? (
//           <Pause className="w-5 h-5" />
//         ) : (
//           <Play className="w-5 h-5" />
//         )}
//       </motion.button>

//       <motion.button
//         onClick={onNext}
//         className="p-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-blue-300 text-gray-600 hover:text-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         <ChevronRight className="w-5 h-5" />
//       </motion.button>
//     </div>
//   );
// };

// // Main Component
// export default function SuccessStoriesSection() {
//   const [activeStory, setActiveStory] = useState(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isAutoplayActive, setIsAutoplayActive] = useState(true);
//   const sectionRef = useRef(null);
//   const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

//   const handleStoryClick = (index) => {
//     setActiveStory(activeStory === index ? null : index);
//   };

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % mockStories.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide(
//       (prev) => (prev - 1 + mockStories.length) % mockStories.length
//     );
//   };

//   const toggleAutoplay = () => {
//     setIsAutoplayActive(!isAutoplayActive);
//   };

//   // Auto-advance slides
//   useEffect(() => {
//     if (!isAutoplayActive) return;

//     const interval = setInterval(() => {
//       nextSlide();
//     }, 6000);

//     return () => clearInterval(interval);
//   }, [isAutoplayActive, currentSlide]);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative py-24 md:py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden"
//     >
//       {/* Enhanced Background */}
//       <div className="absolute inset-0">
//         <motion.div
//           className="absolute top-16 left-16 w-64 h-64 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"
//           animate={{
//             scale: [1, 1.3, 1],
//             opacity: [0.3, 0.6, 0.3],
//             x: [0, 30, 0],
//             y: [0, -20, 0],
//           }}
//           transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
//         />

//         <motion.div
//           className="absolute bottom-32 right-20 w-80 h-80 bg-gradient-to-l from-purple-200/40 to-blue-200/40 rounded-full blur-3xl"
//           animate={{
//             scale: [1.2, 1, 1.2],
//             opacity: [0.4, 0.7, 0.4],
//             x: [0, -50, 0],
//             y: [0, 30, 0],
//           }}
//           transition={{
//             duration: 16,
//             repeat: Infinity,
//             ease: "easeInOut",
//             delay: 2,
//           }}
//         />

//         {/* Floating Quote Marks */}
//         {[...Array(3)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute opacity-20"
//             style={{
//               left: `${20 + i * 30}%`,
//               top: `${30 + i * 20}%`,
//             }}
//             animate={{
//               y: [-20, 20, -20],
//               rotate: [0, 10, 0],
//               opacity: [0.1, 0.3, 0.1],
//             }}
//             transition={{
//               duration: 6 + i * 2,
//               repeat: Infinity,
//               ease: "easeInOut",
//               delay: i * 2,
//             }}
//           >
//             <Quote className="w-16 h-16 text-blue-600" />
//           </motion.div>
//         ))}
//       </div>

//       <div className="container mx-auto max-w-7xl px-6 md:px-8 lg:px-12 relative z-10">
//         {/* Enhanced Header */}
//         <motion.div
//           variants={staggeredContainer}
//           initial="hidden"
//           animate={isInView ? "visible" : "hidden"}
//           className="text-center max-w-4xl mx-auto mb-20 space-y-8"
//         >
//           <motion.div variants={dignifiedReveal} className="space-y-6">
//             <motion.div
//               className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg"
//               whileHover={{ scale: 1.05 }}
//             >
//               <motion.div
//                 className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full"
//                 animate={{ rotate: [0, 360] }}
//                 transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//               >
//                 <Heart className="w-5 h-5 text-blue-600" />
//               </motion.div>
//               <span className="text-sm font-medium text-gray-800">
//                 Real Stories, Real Impact
//               </span>
//               <div className="flex gap-1">
//                 {[...Array(4)].map((_, i) => (
//                   <motion.div
//                     key={i}
//                     className="w-1 h-1 bg-purple-500 rounded-full"
//                     animate={{
//                       scale: [1, 2, 1],
//                       opacity: [0.3, 1, 0.3],
//                     }}
//                     transition={{
//                       duration: 2,
//                       repeat: Infinity,
//                       delay: i * 0.2,
//                     }}
//                   />
//                 ))}
//               </div>
//             </motion.div>

//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
//               Stories of Transformation
//             </h2>

//             <p className="text-xl text-gray-600 leading-relaxed">
//               Discover inspiring journeys of resilience, hope, and empowerment
//               from communities around the world
//             </p>
//           </motion.div>

//           <motion.div variants={dignifiedReveal}>
//             <StoryStatistics stories={mockStories} />
//           </motion.div>
//         </motion.div>

//         {/* Featured Quote Section */}
//         <motion.div
//           variants={dignifiedReveal}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="max-w-4xl mx-auto mb-20"
//         >
//           <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-2xl overflow-hidden">
//             <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50" />
//             <motion.div
//               className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/40 to-transparent rounded-full blur-2xl"
//               animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
//               transition={{ duration: 4, repeat: Infinity }}
//             />

//             <div className="relative z-10 text-center space-y-6">
//               <div className="text-6xl text-blue-600/20 font-serif">"</div>
//               <TypewriterQuote
//                 text={
//                   mockStories[currentSlide]?.quote ||
//                   "Every story is a testament to the power of hope and community support."
//                 }
//                 isActive={true}
//               />
//               <div className="flex items-center justify-center gap-4">
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
//                   <Heart className="w-6 h-6 text-white" />
//                 </div>
//                 <div className="text-left">
//                   <p className="font-semibold text-gray-800">
//                     {mockStories[currentSlide]?.profile?.full_name ||
//                       "Community Member"}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Story #{currentSlide + 1} of {mockStories.length}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Stories Grid */}
//         <motion.div
//           variants={staggeredContainer}
//           initial="hidden"
//           animate={isInView ? "visible" : "hidden"}
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
//         >
//           {mockStories.map((story, index) => (
//             <StoryCard
//               key={story.id}
//               story={story}
//               index={index}
//               isActive={activeStory === index}
//               onClick={() => handleStoryClick(index)}
//             />
//           ))}
//         </motion.div>

//         {/* Navigation and CTA */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
//           transition={{ delay: 1.2, duration: 0.8 }}
//           className="text-center space-y-8"
//         >
//           {/* Story Navigation */}
//           <div className="flex items-center justify-center gap-4">
//             <motion.button
//               onClick={prevSlide}
//               className="p-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full hover:border-blue-300 transition-all group"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
//             </motion.button>

//             <div className="flex gap-2">
//               {mockStories.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentSlide(index)}
//                   className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                     index === currentSlide
//                       ? "bg-blue-600 w-8"
//                       : "bg-gray-300 hover:bg-blue-400"
//                   }`}
//                 />
//               ))}
//             </div>

//             <motion.button
//               onClick={nextSlide}
//               className="p-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full hover:border-blue-300 transition-all group"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
//             </motion.button>
//           </div>

//           {/* Enhanced CTA */}
//           <div className="bg-gradient-to-r from-white/60 to-white/40 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-200 shadow-lg max-w-4xl mx-auto">
//             <div className="space-y-6">
//               <div className="flex items-center justify-center">
//                 <motion.div
//                   className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl"
//                   whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <Sparkles className="w-12 h-12 text-blue-600" />
//                 </motion.div>
//               </div>

//               <h3 className="text-3xl font-bold text-gray-900">
//                 Every Story Starts with Hope
//               </h3>

//               <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
//                 These are just six examples of transformation happening in
//                 communities worldwide. Behind each story are countless others
//                 waiting to be written. Will you help us write the next chapter?
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-6">
//                 <motion.a
//                   href="/stories"
//                   className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
//                   whileHover={{ scale: 1.02, y: -2 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   <BookOpen className="w-5 h-5" />
//                   View All Stories
//                   <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
//                 </motion.a>

//                 <motion.a
//                   href="/get-involved"
//                   className="group inline-flex items-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-blue-300 text-gray-800 hover:text-blue-600 font-semibold rounded-xl transition-all duration-300"
//                   whileHover={{ scale: 1.02, y: -2 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   <Heart className="w-5 h-5" />
//                   Start Your Story
//                 </motion.a>
//               </div>
//             </div>
//           </div>

//           {/* Social proof */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.5 }}
//             className="flex flex-wrap items-center justify-center gap-8 pt-8 text-sm text-gray-600"
//           >
//             <div className="flex items-center gap-2">
//               <Users className="w-4 h-4 text-blue-600" />
//               <span>500+ Lives Transformed</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Globe className="w-4 h-4 text-blue-600" />
//               <span>15 Countries Reached</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Heart className="w-4 h-4 text-blue-600" />
//               <span>Ongoing Support</span>
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* Section Divider Wave */}
//       <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
//         <svg
//           className="relative block w-full h-16 transform"
//           viewBox="0 0 1200 120"
//           preserveAspectRatio="none"
//         >
//           <motion.path
//             d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
//             fill="white"
//             animate={{
//               d: [
//                 "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z",
//                 "M0,0V56.29c47.79,12.2,103.59,22.17,158,18,70.36-5.37,136.33-23.31,206.8-27.5C438.64,42.43,512.34,43.67,583,62.05c69.27,28,138.3,34.88,209.4,23.08,36.15-6,69.85-7.84,104.45-19.34C989.49,35,1113-4.29,1200,62.47V0Z",
//                 "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z",
//               ],
//             }}
//             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//           />
//         </svg>
//       </div>
//     </section>
//   );
// }
