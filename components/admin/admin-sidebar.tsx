// components/admin/admin-sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { 
  Home, 
  FileText, 
  Users, 
  Handshake, 
  BarChart3, 
  Settings, 
  HeartHandshake
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();
  const t = useTranslations("AdminSidebar");

  const adminNavItems = [
    { href: "/admin/dashboard", label: t("nav.dashboard"), icon: Home },
    { href: "/admin/content", label: t("nav.contentManagement"), icon: FileText },
    { href: "/admin/users", label: t("nav.userManagement"), icon: Users },
    { href: "/admin/partners", label: t("nav.partnerships"), icon: Handshake },
    { href: "/admin/analytics", label: t("nav.analytics"), icon: BarChart3 },
  ];

  return (
    <aside className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin" className="flex items-center gap-2 font-serif font-semibold">
            <HeartHandshake className="h-6 w-6 text-primary" />
            <span>{t("brandName")}</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="grid items-start px-4 text-sm font-medium">
            {adminNavItems.map((item) => (
               <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  pathname.startsWith(item.href) && "bg-primary/10 text-primary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4 border-t">
           <Link
            href="/admin/settings"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              pathname.startsWith("/admin/settings") && "bg-primary/10 text-primary"
            )}
          >
            <Settings className="h-4 w-4" />
            {t("settings")}
          </Link>
        </div>
      </div>
    </aside>
  );
}