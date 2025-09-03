// app/(members)/layout.tsx
import { MembersSidebar } from "@/components/members/members-sidebar";
import { MembersHeader } from "@/components/members/members-header";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Script from "next/script";

// This is a placeholder for your actual authentication logic.
// In a real app, this would check a cookie or session and hit the database.
async function getAuthenticatedUser() {
  // SIMULATION: Replace with your actual user session logic.
  return {
    isLoggedIn: true,
    name: "Alex Doe",
    email: "alex.doe@example.com",
    locale: "en", // The user's preferred language from their profile
  };
}

export default async function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthenticatedUser();
  const locale = user?.locale || "en"; // Fallback to English
  const messages = await getMessages({ locale });

  // In a real app, you would add a check here:
  // if (!user.isLoggedIn) { redirect('/login'); }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Script
        id={`set-lang-members-${locale}`}
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang = '${locale}';`,
        }}
      />
      <div className="grid min-h-screen w-full lg:grid-cols-[256px_1fr]">
        <MembersSidebar />
        <div className="flex flex-col">
          <MembersHeader />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-8 lg:p-8 bg-muted/10">
            {children}
          </main>
        </div>
      </div>
    </NextIntlClientProvider>
  );
}