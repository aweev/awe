// lib/config/brand.ts
/**
 * Central brand configuration
 * This file contains all brand-related settings that can be updated from admin UI
 */

export interface BrandConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  logo: {
    icon: string; // Icon name from lucide-react or path to custom icon
    alt: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  social: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
  contact: {
    email: string;
    phone?: string;
    address?: string;
  };
}

// Default brand configuration
// This would typically be loaded from a CMS or admin panel
export const defaultBrandConfig: BrandConfig = {
  name: "AWE e.V.",
  shortName: "AWE",
  tagline: "Empowering communities through sustainable development and education",
  description: "AWE e.V. is dedicated to creating positive change through community-driven initiatives, sustainable development projects, and educational programs that empower individuals and strengthen communities across the globe.",
  logo: {
    icon: "HeartHandshake", // Lucide icon name
    alt: "AWE e.V. Logo"
  },
  colors: {
    primary: "#D95D39", // hopeful-clay
    secondary: "#1D2129", // deep-charcoal  
    accent: "#F0A202", // radiant-gold
  },
  social: {
    twitter: "https://twitter.com/awe_ev",
    linkedin: "https://linkedin.com/company/awe-ev",
    facebook: "https://facebook.com/awe.ev.official",
  },
  contact: {
    email: "info@awe-ev.org",
    phone: "+49 (0) 123 456789",
    address: "Berlin, Germany"
  }
};

/**
 * Get brand configuration
 * In a real app, this would fetch from your CMS/admin API
 */
export async function getBrandConfig(): Promise<BrandConfig> {
  // In production, this would be:
  // const response = await fetch('/api/admin/brand-config');
  // return response.json();
  
  return defaultBrandConfig;
}

/**
 * Update brand configuration (admin function)
 * This would be called from your admin panel
 */
export async function updateBrandConfig(config: Partial<BrandConfig>): Promise<BrandConfig> {
  // In production, this would be:
  // const response = await fetch('/api/admin/brand-config', {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(config)
  // });
  // return response.json();
  
  console.log('Brand config would be updated:', config);
  return { ...defaultBrandConfig, ...config };
}

/**
 * Utility function to get brand name for components
 */
export function getBrandName(locale?: string): string {
  // In a real app, you might have different names per locale
  return defaultBrandConfig.name;
}