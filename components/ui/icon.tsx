// components/ui/icon.tsx

import {
  Users,
  HeartHandshake,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Award,
  BookOpenCheck,
  LayoutDashboard,
  HandHeart,
  Settings,
  LucideProps,
  Home,
  FileText,
  BarChart3,
//   LucideIcon, // Import the LucideIcon type for type safety
} from "lucide-react";
import React from "react";

/**
 * ==================================================================
 * Iconography System for AWE e.V.
 * ==================================================================
 *
 * This component centralizes all icons used in the application.
 * It maps semantic names to specific Lucide icons, ensuring consistency
 * and making it easy to manage the icon set from a single source of truth.
 *
 * All icons inherit a default strokeWidth of 1.5px to align with the
 * brand's "Lineal" style.
 */

// Define the IconName type from the keys of the iconMap
export type IconName = keyof typeof iconMap;

// 1. The Icon Map: Maps conceptual names to Lucide icon components.
const iconMap = {
  // Brand Differentiators
  community: Users,
  holistic: HeartHandshake,
  provenResults: TrendingUp,
  culturalCompetency: Sparkles,

  // Trust & Credibility
  trust: ShieldCheck,
  award: Award,

  // Member Hub Navigation
  dashboard: LayoutDashboard,
  myImpact: HandHeart,
  resources: BookOpenCheck,
  settings: Settings,

  // Admin Hub Navigation
  adminDashboard: Home,
  content: FileText,
  users: Users,
  partners: HeartHandshake,
  analytics: BarChart3,
};

// 2. The Icon Component Props
interface IconProps extends LucideProps {
  name: IconName;
}

// 3. The Dynamic Icon Component
export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const LucideIcon = iconMap[name];

  if (!LucideIcon) {
    // Fallback for cases where an icon name is invalid
    console.warn(`Icon with name "${name}" not found.`);
    return null; // Or return a default fallback icon
  }

  // Enforce the brand's 1.5px stroke width by default
  const defaultProps: LucideProps = {
    strokeWidth: 1.5,
  };

  return <LucideIcon {...defaultProps} {...props} />;
};