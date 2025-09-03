// app/(public)/[locale]/_components/homepage/story-card.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { dignifiedReveal } from "@/lib/animations";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { SuccessStory } from "@/types/homepage";
import { ArrowRight, Quote, Heart } from "lucide-react";

interface StoryCardProps {
  story: SuccessStory;
  index: number;
}

export function StoryCard({ story, index }: StoryCardProps) {
  return (
    <motion.div 
      variants={dignifiedReveal} 
      className="h-full group"
    >
      <Link href={`/stories/${story.slug}`} className="block h-full">
        <Card className="flex flex-col h-full overflow-hidden bg-card/90 backdrop-blur-sm border border-border/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:border-primary/40">
          {/* Image Container with Enhanced Overlay */}
          <div className="relative overflow-hidden">
            <AspectRatio ratio={4 / 3}>
              <Image
                src={story.image_url}
                alt={`Portrait of ${story.profile?.full_name || 'AWE Participant'}`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </AspectRatio>
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            <div className="absolute top-4 right-4 p-2 rounded-full bg-card/90 backdrop-blur-sm shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
              <Quote className="w-4 h-4 text-primary" />
            </div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Content Section */}
          <CardContent className="flex-grow p-6 space-y-4">
            <div className="relative">
              <div className="absolute -top-2 -left-2 text-4xl text-primary/20 font-serif leading-none">&quot;</div>
              <blockquote className="text-body-base italic text-muted-foreground leading-relaxed pl-4 group-hover:text-foreground transition-colors duration-500">
                {story.quote}
              </blockquote>
              <div className="absolute -bottom-2 -right-2 text-4xl text-primary/20 font-serif leading-none rotate-180">&quot;</div>
            </div>
          </CardContent>

          {/* Enhanced Footer */}
          <CardFooter className="p-6 pt-0 space-y-4">
            <div className="flex items-center gap-3">
              {story.profile?.avatar_url ? (
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
                  <Image
                    src={story.profile.avatar_url}
                    alt={story.profile.full_name || 'AWE Participant'}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
              )}
              <div>
                <p className="font-semibold text-foreground text-sm">{story.profile?.full_name || 'AWE Participant'}</p>
                <p className="text-xs text-muted-foreground">Community Member</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border/40">
              <span className="text-small-meta text-muted-foreground">Impact Story #{index + 1}</span>
              <div className="flex items-center font-semibold text-primary group-hover:text-accent transition-colors duration-300">
                <span className="text-sm">Read Story</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}