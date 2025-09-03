// types/homepage.ts

import { IconName } from "@/components/ui/icon"; // Import our type-safe icon names

/**
 * ==================================================================
 * Data Contracts for the AWE e.V. Homepage
 * ==================================================================
 */

// --- Data structures for localized content sections ---

export interface HeroContent {
  headlinePrimary: string;
  headlineAccent: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  trustIndicators: Array<{
    icon: IconName; // Uses our centralized icon system
    text: string;
  }>;
}

export interface ImpactStat {
  value: string;
  label: string;
  outcome: string; // The narrative part of the stat
}

export interface ImpactSection {
  title: string;
  subtitle: string;
  stats: ImpactStat[];
  ctaSection: {
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
}

export interface Differentiator {
  icon: IconName;
  title: string;
  description: string;
}

export interface InvolvementOption {
  title: string;
  description: string;
  cta: string;
  link: string;
}

// --- Data structures for relational content ---

export interface SuccessStory {
  id: string;
  slug: string;
  image_url: string;
  title: string;
  quote: string;
  profile: {
    full_name: string;
    avatar_url?: string;
  } | null;
}

// --- Testimonial structure for hero section ---
export interface Testimonial {
  text: string;
  author: string;
  location: string;
  program?: string;
}

// --- The Main Prop Type for the entire Homepage Client Component ---

export interface HomePageClientProps {
  heroContent: HeroContent;
  impactStats: ImpactStat[];
  successStories: SuccessStory[];
  differentiators: Differentiator[];
  involvementOptions: InvolvementOption[];
  sectionTitles: {
    impact: string;
    differentiators: string;
    stories: string;
    involvement: string;
    newsletter: string;
    storiesSubtitle: string;
    newsletterSubtitle: string;
  };
}

// --- Props for individual section components ---

export interface HeroSectionProps {
  content: HeroContent;
  locale?: string;
}

export interface ImpactSectionProps {
  stats: ImpactStat[];
  title: string;
}

export interface DifferentiatorsSectionProps {
  differentiators: Differentiator[];
  title: string;
}

export interface SuccessStoriesSectionProps {
  stories: SuccessStory[];
  title: string;
  subtitle: string;
}

export interface GetInvolvedSectionProps {
  options: InvolvementOption[];
  title: string;
}

export interface NewsletterSectionProps {
  title: string;
  subtitle: string;
}

// --- Data structures for Supabase integration ---

export type LocalizedContent<T> = { [locale: string]: T };

export interface SupabaseHomepageContent {
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

// --- Form submission types ---

export interface NewsletterSubscription {
  email: string;
  locale?: string;
  source?: "homepage" | "footer" | "popup";
}

export interface ContactFormSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: "general" | "partnership" | "volunteer" | "donation";
}
