// app/(public)/[locale]/_components/home-page-client.tsx

"use client";

import React from "react";
import { useTranslations } from "next-intl";

import { HomePageClientProps } from "@/types/homepage";
import { HeroSection } from "./homepage/hero-section";
import { ImpactSection } from "./homepage/impact-section";
import { DifferentiatorsSection } from "./homepage/differentiators-section";
import { SuccessStoriesSection } from "./homepage/success-stories-section";
import { GetInvolvedSection } from "./homepage/get-involved-section";
import { NewsletterSection } from "./homepage/newsletter-section";

export function HomePageClient({
  heroContent,
  impactStats,
  differentiators,
  successStories,
  involvementOptions,
  sectionTitles,
}: HomePageClientProps) {
  const t = useTranslations("HomePage");

  const newsletterSubtitle =
    sectionTitles.newsletterSubtitle ?? t("newsletter.subtitle");

  return (
    <main className="min-h-screen">
      <HeroSection content={heroContent} />
      <ImpactSection stats={impactStats} title={sectionTitles.impact} />
      <DifferentiatorsSection
        differentiators={differentiators}
        title={sectionTitles.differentiators}
      />
      <SuccessStoriesSection
        stories={successStories}
        title={sectionTitles.stories}
        subtitle={sectionTitles.storiesSubtitle}
      />
      <GetInvolvedSection
        options={involvementOptions}
        title={sectionTitles.involvement}
      />
      <NewsletterSection
        title={sectionTitles.newsletter}
        subtitle={newsletterSubtitle}
      />
    </main>
  );
}
