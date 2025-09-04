// app/(public)/[locale]/page.tsx

import { createServerClient } from "@/supabase/server";
import { getTranslations } from "next-intl/server";
import { HomePageClientProps } from "@/types/homepage";
import { HomePageClient } from "./_components/home-page-client";
import {
  HeroContent,
  ImpactStat,
  Differentiator,
  InvolvementOption,
  SuccessStory,
} from "@/types/homepage";

type LocalizedContent<T> = { [locale: string]: T };

interface SupabaseHomepageContent {
  hero_content: LocalizedContent<HeroContent>;
  impact_stats: LocalizedContent<ImpactStat[]>;
  differentiators: LocalizedContent<Differentiator[]>;
  involvement_options: LocalizedContent<InvolvementOption[]>;
  section_titles: LocalizedContent<{
    impact: string;
    differentiators: string;
    stories: string;
    storiesSubtitle: string;
    involvement: string;
    newsletter: string;
    newsletterSubtitle: string;
  }>;
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params; // ✅ Next.js 15 requires awaiting params
  console.log("🌐 [HomePage] Current locale:", locale);

  const t = await getTranslations("HomePage");
  const supabase = await createServerClient();

  // ✅ Fixed Supabase queries
  const { data: rawContent, error: contentError } = await supabase
    .from("homepage_content")
    .select("*")
    .single();

  const { data: rawStories, error: storiesError } = await supabase
    .from("success_stories")
    .select("*, profile:profiles(full_name, avatar_url)")
    .eq("is_featured", true)
    .limit(3);

  if (contentError && contentError.code !== "PGRST116") {
    console.error(
      "❌ Supabase error fetching homepage content:",
      contentError.message
    );
  }

  if (storiesError) {
    console.error(
      "❌ Supabase error fetching success stories:",
      storiesError.message
    );
  }

  // Cast Supabase content safely
  const content = rawContent as SupabaseHomepageContent | null;

  // Localizer helper
  const getLocalized = <T,>(
    data: LocalizedContent<T> | undefined,
    fallback: T
  ): T => {
    return data?.[locale] || data?.["en"] || fallback;
  };

  // Build success stories with fallbacks
  const successStories: SuccessStory[] = (rawStories || []).map((story) => ({
    id: story.id,
    slug: story.slug,
    image_url: story.image_url,
    profile: story.profile,
    title: story.title?.[locale] || story.title?.["en"] || "A Story of Change",
    quote: story.quote?.[locale] || story.quote?.["en"] || "",
  }));

  // Prepare props for client component
  const props: HomePageClientProps = {
    heroContent: getLocalized(content?.hero_content, {
      headlinePrimary: t("hero.headlinePrimary"),
      headlineAccent: t("hero.headlineAccent"),
      subheadline: t("hero.subheadline"),
      primaryCta: t("hero.primaryCta"),
      secondaryCta: t("hero.secondaryCta"),
      trustIndicators: [
        { icon: "trust" as const, text: t("hero.trustIndicator1") },
        { icon: "award" as const, text: t("hero.trustIndicator2") },
      ],
    }),
    impactStats: getLocalized(content?.impact_stats, [
      {
        value: "500+",
        label: t("impact.stat1.label"),
        outcome: t("impact.stat1.outcome"),
      },
      {
        value: "300+",
        label: t("impact.stat2.label"),
        outcome: t("impact.stat2.outcome"),
      },
      {
        value: "5",
        label: t("impact.stat3.label"),
        outcome: t("impact.stat3.outcome"),
      },
      {
        value: "85%",
        label: t("impact.stat4.label"),
        outcome: t("impact.stat4.outcome"),
      },
    ]),
    differentiators: getLocalized(content?.differentiators, [
      {
        icon: "community",
        title: t("differentiators.item1.title"),
        description: t("differentiators.item1.description"),
      },
      {
        icon: "holistic",
        title: t("differentiators.item2.title"),
        description: t("differentiators.item2.description"),
      },
      {
        icon: "provenResults",
        title: t("differentiators.item3.title"),
        description: t("differentiators.item3.description"),
      },
      {
        icon: "culturalCompetency",
        title: t("differentiators.item4.title"),
        description: t("differentiators.item4.description"),
      },
    ]),
    involvementOptions: getLocalized(content?.involvement_options, [
      {
        title: t("involvement.option1.title"),
        description: t("involvement.option1.description"),
        cta: t("involvement.option1.cta"),
        link: `/${locale}/donate`,
      },
      {
        title: t("involvement.option2.title"),
        description: t("involvement.option2.description"),
        cta: t("involvement.option2.cta"),
        link: `/${locale}/partner`,
      },
      {
        title: t("involvement.option3.title"),
        description: t("involvement.option3.description"),
        cta: t("involvement.option3.cta"),
        link: `/${locale}/volunteer`,
      },
    ]),
    successStories,
    sectionTitles: getLocalized(content?.section_titles, {
      impact: t("sectionTitles.impact"),
      differentiators: t("sectionTitles.differentiators"),
      stories: t("sectionTitles.stories"),
      storiesSubtitle: t("sectionTitles.storiesSubtitle"),
      involvement: t("sectionTitles.involvement"),
      newsletter: t("sectionTitles.newsletter"),
      newsletterSubtitle: t("newsletter.subtitle"),
    }),
  };

  return <HomePageClient {...props} />;
}
