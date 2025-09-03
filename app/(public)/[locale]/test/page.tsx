// app/(public)/[locale]/test/page.tsx - Create this to test translations
import { getTranslations } from "next-intl/server";

export default async function TestPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("HomePage");

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Translation Test</h1>
      <div className="space-y-2">
        <p><strong>Current Locale:</strong> {locale}</p>
        <p><strong>Hero Headline:</strong> {t('hero.headline')}</p>
        <p><strong>Hero Subheadline:</strong> {t('hero.subheadline')}</p>
        <p><strong>Impact Section:</strong> {t('sectionTitles.impact')}</p>
      </div>
      
      <div className="mt-8 space-x-4">
        <a href="/en/test" className="text-blue-500 underline">English</a>
        <a href="/de/test" className="text-blue-500 underline">Deutsch</a>
        <a href="/fr/test" className="text-blue-500 underline">Français</a>
      </div>
    </div>
  );
}