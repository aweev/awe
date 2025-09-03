// app/layout.tsx - Updated version
import type { Metadata, Viewport } from "next";
import { Inter, Lora } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { BrandConfigProvider } from "@/hooks/use-brand-config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AWE e.V. | Building Futures",
  description:
    "Transforming cycles of poverty and displacement into pathways of dignity, self-reliance, and lasting prosperity.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F9F8F6" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0B" },
  ],
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: Promise<{ locale?: string }>;
}) {
  // Extract locale from params, defaulting to 'en'
  let locale = "en";

  if (params) {
    try {
      const resolvedParams = await params;
      locale = resolvedParams.locale || "en";
    } catch {
      // If params resolution fails, stick with default
      locale = "en";
    }
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${lora.variable} antialiased`}>
        <BrandConfigProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </BrandConfigProvider>
      </body>
    </html>
  );
}
