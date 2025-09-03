// app/manifest.ts
import { MetadataRoute } from 'next';
import { getBrandConfig } from '@/lib/config/brand';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const brandConfig = await getBrandConfig();

  return {
    name: brandConfig.name,
    short_name: brandConfig.shortName,
    description: brandConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#F9F8F6', // This could also come from config
    theme_color: brandConfig.colors.primary,
    icons: [
      {
        src: '/favicon.ico', // Update with your icon paths
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}