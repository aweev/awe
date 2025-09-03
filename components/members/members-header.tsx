// components/members/members-header.tsx
"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  CircleUser, 
  Menu, 
  Search, 
  LayoutDashboard, 
  HandHeart, 
  BookOpenCheck, 
  Users,
  HeartHandshake 
} from "lucide-react";
import { useTranslations } from "next-intl";

export function MembersHeader() {
  const t = useTranslations("MembersHeader");
  const tSidebar = useTranslations("MembersSidebar");

  // We define the nav items here again for the mobile menu
  const navItems = [
    { href: "/dashboard", label: tSidebar("nav.dashboard"), icon: LayoutDashboard },
    { href: "/my-impact", label: tSidebar("nav.myImpact"), icon: HandHeart },
    { href: "/resources", label: tSidebar("nav.resources"), icon: BookOpenCheck },
    { href: "/community", label: tSidebar("nav.community"), icon: Users },
  ];

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      {/* Mobile Sidebar (Sheet) */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">{t("toggleNavigation")}</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-lg font-semibold mb-4"
            >
              <HeartHandshake className="h-6 w-6 text-primary" />
              <span>{tSidebar("brandName")}</span>
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Search Bar & User Menu */}
      <div className="w-full flex-1">
        {/* We can add Breadcrumbs here later if needed */}
      </div>
      <form>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("searchPlaceholder")}
            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
          />
        </div>
      </form>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">{t("toggleUserMenu")}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t("myAccount")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{t("settings")}</DropdownMenuItem>
          <DropdownMenuItem>{t("support")}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{t("logout")}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}