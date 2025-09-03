// app/(public)/[locale]/offline/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WifiOff } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4">
      <div className="flex items-center justify-center w-24 h-24 rounded-full bg-medium-grey/10">
        <WifiOff className="w-12 h-12 text-medium-grey" />
      </div>
      <h1 className="mt-8 text-4xl font-bold tracking-tight font-lora text-deep-charcoal sm:text-5xl">
        You Are Offline
      </h1>
      <p className="mt-4 text-lg text-medium-grey max-w-xl">
        It looks like you&apos;ve lost your internet connection. The page you requested can&apos;t be loaded right now, but many parts of the site may still be available from your cache.
      </p>
      <div className="mt-10">
        <Button asChild>
          <Link href="/">Return to Homepage</Link>
        </Button>
      </div>
    </div>
  );
}