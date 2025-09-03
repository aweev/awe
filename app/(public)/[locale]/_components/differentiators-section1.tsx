// // app/(public)/[locale]/_components/differentiators-section.tsx

// "use client";

// import { motion } from "framer-motion";
// import { Differentiator } from "@/types/homepage";
// import { staggeredContainer, dignifiedReveal } from "@/lib/animations";
// import { Icon } from "@/components/ui/icon"; 

// interface DifferentiatorsSectionProps {
//   differentiators: Differentiator[];
//   title: string;
// }

// export function DifferentiatorsSection({ differentiators, title }: DifferentiatorsSectionProps) {
//   return (
//     <section className="relative py-24 bg-background">
//       <div className="container-brand">
//         {/* Section Header */}
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.5 }}
//           variants={dignifiedReveal}
//           className="text-center max-w-2xl mx-auto mb-16"
//         >
//           <h2 className="text-heading2 font-serif text-foreground">{title}</h2>
//           <p className="text-body-base text-muted-foreground mt-4">
//             Why our approach stands apart and creates lasting change.
//           </p>
//         </motion.div>

//         {/* Differentiator Cards */}
//         <motion.div
//           variants={staggeredContainer}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.2 }}
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
//         >
//           {differentiators.map((item, i) => {
//             // 2. The old dynamic import logic is no longer needed.
//             // const Icon = Icons[item.icon] || Icons.Star; // <-- DELETE THIS

//             return (
//               <motion.div
//                 key={i}
//                 variants={dignifiedReveal}
//                 whileHover={{ rotateX: 6, rotateY: -6, scale: 1.03 }}
//                 transition={{ type: "spring", stiffness: 200, damping: 15 }}
//                 className="relative group"
//               >
//                 <div
//                   className="p-8 rounded-2xl bg-card/70 backdrop-blur-sm shadow-lg transition-all duration-500
//                              border border-transparent bg-clip-padding overflow-hidden"
//                 >
//                   {/* Glow background on hover */}
//                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 
//                                   bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 blur-xl rounded-2xl" />

//                   <div className="relative z-10 flex flex-col items-center text-center space-y-6">
//                     {/* Icon with branded gradient */}
//                     <div className="w-16 h-16 rounded-full flex items-center justify-center
//                                     bg-gradient-to-r from-primary to-accent text-white shadow-lg">
                      
//                       {/* 3. Use the custom Icon component with the `name` prop */}
//                       <Icon name={item.icon} className="w-8 h-8" />

//                     </div>

//                     {/* Title */}
//                     <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
//                       {item.title}
//                     </h3>

//                     {/* Description */}
//                     <p className="text-body-base text-muted-foreground">
//                       {item.description}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </motion.div>
//       </div>
//     </section>
//   );
// }