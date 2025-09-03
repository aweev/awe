// components/members/members-sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { 
  LayoutDashboard, 
  HandHeart, 
  BookOpenCheck, 
  Users, 
  HeartHandshake 
} from "lucide-react";

export function MembersSidebar() {
  const pathname = usePathname();
  const t = useTranslations("MembersSidebar");

  const navItems = [
    { href: "/dashboard", label: t("nav.dashboard"), icon: LayoutDashboard },
    { href: "/my-impact", label: t("nav.myImpact"), icon: HandHeart },
    { href: "/resources", label: t("nav.resources"), icon: BookOpenCheck },
    { href: "/community", label: t("nav.community"), icon: Users },
  ];

  return (
    <aside className="hidden lg:block w-64 border-r bg-muted/40">
      <div className="flex h-full max-h-screen flex-col">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-serif font-bold text-lg">
            <HeartHandshake className="h-6 w-6 text-primary" />
            <span>{t("brandName")}</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="grid items-start px-4 text-sm font-medium">
            {navItems.map((item) => (
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
      </div>
    </aside>
  );
}