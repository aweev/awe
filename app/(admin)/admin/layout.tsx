// app/(admin)/layout.tsx 

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { redirect } from "next/navigation";
import Script from "next/script";

// Placeholder for your actual authentication logic.
async function getAuthenticatedAdmin() {
  // SIMULATION: In a real app, you would validate a secure, httpOnly cookie.
  return {
    isLoggedIn: true,
    role: "admin",
    name: "Admin User",
    locale: "de", // Let's default the admin to German to demonstrate i18n
  };
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAuthenticatedAdmin();

  // This is a critical security step.
  if (!admin.isLoggedIn || admin.role !== "admin") {
    redirect("/login"); // Or an access-denied page
  }

  const locale = admin.locale || "en";
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Script
        id={`set-lang-admin-${locale}`}
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang = '${locale}';`,
        }}
      />
      <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
        <AdminSidebar />
        <div className="flex flex-col">
          <AdminHeader />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8 bg-muted/40">
            {children}
          </main>
        </div>
      </div>
    </NextIntlClientProvider>
  );
}