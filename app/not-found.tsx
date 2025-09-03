// app/[locale]/not-found.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SearchX } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('NotFound'); // Namespace: messages/[locale].json

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-canvas-white px-4">
      {/* Icon */}
      <div className="flex items-center justify-center w-24 h-24 rounded-full bg-hopeful-clay/10">
        <SearchX className="w-12 h-12 text-hopeful-clay" aria-hidden="true" />
      </div>

      {/* Title */}
      <h1 className="mt-8 text-4xl font-bold tracking-tight font-lora text-deep-charcoal sm:text-5xl">
        {t('title')}
      </h1>

      {/* Description */}
      <p className="mt-4 text-lg text-medium-grey">
        {t('description')}
      </p>

      {/* Button */}
      <div className="mt-10">
        <Button asChild>
          <Link href="/">{t('homeButton')}</Link>
        </Button>
      </div>
    </div>
  );
}
