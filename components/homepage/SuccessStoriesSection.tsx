"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { dignifiedReveal, staggeredContainer } from "@/lib/animations";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Story {
  id: string | number;
  slug: string;
  image_url: string;
  title: string;
  quote: string;
  name?: string;
}

interface SuccessStoriesSectionProps {
  stories: Story[];
  title: string;
  subtitle: string;
}

export const SuccessStoriesSection: React.FC<SuccessStoriesSectionProps> = ({ stories, title, subtitle }) => (
  <section className="py-20 bg-white sm:py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div variants={dignifiedReveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} className="text-center">
        <h2 className="text-3xl font-bold tracking-tight font-lora text-deep-charcoal sm:text-4xl">{title}</h2>
        <p className="max-w-2xl mx-auto mt-4 text-lg leading-8 text-medium-grey">{subtitle}</p>
      </motion.div>
      <motion.div variants={staggeredContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid max-w-md grid-cols-1 gap-8 mx-auto mt-16 lg:max-w-none lg:grid-cols-3">
        {stories.map((story) => (
          <motion.div key={story.id} variants={dignifiedReveal}>
            <Link href={`/stories/${story.slug}`} className="block h-full">
              <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1">
                <CardHeader className="p-0">
                  <AspectRatio ratio={4 / 3}>
                    <Image src={story.image_url} alt={`Portrait of ${story.title}`} fill className="object-cover" />
                  </AspectRatio>
                </CardHeader>
                <CardContent className="flex-grow p-6"><blockquote className="italic text-medium-grey">&quot;{story.quote}&quot;</blockquote></CardContent>
                <CardFooter className="p-6 pt-0"><div><p className="font-semibold text-deep-charcoal">{story.name || 'Anonymous'}</p><p className="mt-2 font-semibold text-radiant-gold">Read Story &rarr;</p></div></CardFooter>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);