"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { dignifiedReveal, staggeredContainer } from "@/lib/animations";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const involvementOptions = [
  { title: "Donate", description: "Your gift provides skills training, mentorship, and the resources to build a self-reliant future.", link: "/get-involved/donate" },
  { title: "Become a Partner", description: "Align your organization with authentic, measurable impact and engage your team.", link: "/get-involved/partner" },
  { title: "Volunteer", description: "Use your professional skills to empower women and youth on their journey to success.", link: "/get-involved/volunteer" },
];

export const GetInvolvedSection = () => (
  <section className="py-20 bg-white sm:py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div variants={dignifiedReveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} className="text-center">
        <h2 className="text-3xl font-bold tracking-tight font-lora text-deep-charcoal sm:text-4xl">Be a Part of the Change</h2>
        <p className="max-w-2xl mx-auto mt-4 text-lg leading-8 text-medium-grey">Whether you give, partner, or volunteer, you are an essential part of our story.</p>
      </motion.div>
      <motion.div variants={staggeredContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-3">
        {involvementOptions.map((option, i) => (
          <motion.div key={i} variants={dignifiedReveal} className="h-full">
            <Link href={option.link} className="block h-full group">
              <Card className="flex flex-col h-full p-6 transition-all duration-300 border-gray-200 shadow-sm group-hover:border-hopeful-clay group-hover:shadow-lg">
                <h3 className="text-2xl font-lora text-deep-charcoal">{option.title}</h3>
                <p className="flex-grow mt-3 text-medium-grey">{option.description}</p>
                <div className="flex items-center mt-6 font-semibold text-hopeful-clay">Learn More <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" /></div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);