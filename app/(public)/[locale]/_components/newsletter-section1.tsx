// // app/(public)/[locale]/_components/newsletter-section.tsx

// "use client";

// import { motion } from "framer-motion";
// import { useState } from "react";
// import { dignifiedReveal } from "@/lib/animations";
// import { ArrowRight, Mail } from "lucide-react";

// interface NewsletterSectionProps {
//   title: string;
//   subtitle: string;
// }

// export function NewsletterSection({ title, subtitle }: NewsletterSectionProps) {
//   const [email, setEmail] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // TODO: hook up Supabase or external email service
//     console.log("Subscribed with:", email);
//     setEmail("");
//   };

//   return (
//     <section className="relative py-24 overflow-hidden">
//       {/* Floating blobs */}
//       <motion.div
//         className="absolute top-10 left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"
//         animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
//         transition={{ duration: 8, repeat: Infinity }}
//       />
//       <motion.div
//         className="absolute bottom-10 right-20 w-48 h-48 bg-accent/20 rounded-full blur-3xl"
//         animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.2, 0.5, 0.2] }}
//         transition={{ duration: 10, repeat: Infinity }}
//       />

//       <div className="container-brand relative z-10">
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.5 }}
//           variants={dignifiedReveal}
//           className="max-w-2xl mx-auto text-center space-y-6"
//         >
//           <h2 className="text-heading2 text-foreground">
//             {title}
//           </h2>
//           <p className="text-body-base text-muted-foreground">
//             { subtitle} Join our community — get inspiring stories, project updates, and opportunities to make a difference.
//           </p>

//           {/* Glassmorphism form */}
//           <form
//             onSubmit={handleSubmit}
//             className="relative flex items-center justify-between p-2 rounded-2xl
//                        bg-card/40 backdrop-blur-md border border-border/40 shadow-lg mt-8"
//           >
//             <div className="flex items-center gap-2 flex-grow px-3">
//               <Mail className="w-5 h-5 text-muted-foreground" />
//               <input
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 className="w-full bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground"
//               />
//             </div>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               type="submit"
//               className="inline-flex items-center gap-2 px-5 py-3 rounded-xl
//                          bg-gradient-to-r from-primary to-accent text-white font-medium shadow-md
//                          transition-all"
//             >
//               Subscribe
//               <ArrowRight className="w-4 h-4" />
//             </motion.button>
//           </form>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
