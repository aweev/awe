// components/public/language-switcher.tsx
"use client";

import { Globe, Check } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  buttonVariants,
  dropdownVariants,
  itemVariants,
} from "@/lib/animations";

const locales = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
    shortCode: "EN",
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    shortCode: "DE",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    shortCode: "FR",
  },
];

interface LanguageSwitcherProps {
  variant?: "default" | "compact" | "minimal";
  showFlag?: boolean;
  showNativeName?: boolean;
}

export function LanguageSwitcher({
  variant = "default",
  showFlag = true,
  showNativeName = false,
}: LanguageSwitcherProps) {
  // const t = useTranslations("LanguageSwitcher");
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentLocale = locales.find((l) => l.code === locale);

  const handleLocaleChange = async (newLocale: string) => {
    if (newLocale === locale || isTransitioning) return;

    setIsTransitioning(true);

    // Get the path without the current locale
    const pathSegments = pathname.split("/").filter(Boolean);

    // Remove the current locale if it exists as the first segment
    if (["en", "de", "fr"].includes(pathSegments[0])) {
      pathSegments.shift();
    }

    // Build the new path with the new locale
    const newPath = `/${newLocale}${
      pathSegments.length > 0 ? "/" + pathSegments.join("/") : ""
    }`;

    console.log(`Switching from ${locale} to ${newLocale}`);
    console.log(`Current path: ${pathname} -> New path: ${newPath}`);

    // Close dropdown
    setIsOpen(false);

    // Add a small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 150));

    router.replace(newPath);

    // Reset transitioning state
    setTimeout(() => setIsTransitioning(false), 500);
  };

  if (variant === "minimal") {
    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <motion.div
            variants={buttonVariants}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full hover:bg-primary/10 relative"
              disabled={isTransitioning}
            >
              <motion.div
                animate={isTransitioning ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Globe className="h-4 w-4" />
              </motion.div>
              <span className="sr-only">Change language</span>
            </Button>
          </motion.div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[120px]">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {locales.map((localeOption) => (
                  <motion.div key={localeOption.code} variants={itemVariants}>
                    <DropdownMenuItem
                      onClick={() => handleLocaleChange(localeOption.code)}
                      className={`cursor-pointer transition-colors duration-200 ${
                        locale === localeOption.code
                          ? "bg-primary/10 text-primary"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <span>{localeOption.flag}</span>
                        <span className="flex-1">{localeOption.shortCode}</span>
                        {locale === localeOption.code && (
                          <Check className="h-3 w-3" />
                        )}
                      </div>
                    </DropdownMenuItem>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (variant === "compact") {
    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <motion.div
            variants={buttonVariants}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3 gap-2 font-medium hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              disabled={isTransitioning}
            >
              <motion.div
                animate={isTransitioning ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 0.5 }}
              >
                {showFlag && currentLocale?.flag && (
                  <span className="text-sm">{currentLocale.flag}</span>
                )}
                {!showFlag && <Globe className="h-4 w-4" />}
              </motion.div>
              <span className="text-xs font-semibold tracking-wide">
                {currentLocale?.shortCode || "EN"}
              </span>
            </Button>
          </motion.div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[160px]">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {locales.map((localeOption) => (
                  <motion.div key={localeOption.code} variants={itemVariants}>
                    <DropdownMenuItem
                      onClick={() => handleLocaleChange(localeOption.code)}
                      className={`cursor-pointer transition-all duration-200 hover:bg-primary/5 ${
                        locale === localeOption.code
                          ? "bg-primary/10 text-primary border-l-2 border-primary"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-3 w-full py-1">
                        <span className="text-lg">{localeOption.flag}</span>
                        <div className="flex-1">
                          <div className="font-medium text-sm">
                            {localeOption.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {localeOption.nativeName}
                          </div>
                        </div>
                        {locale === localeOption.code && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", duration: 0.3 }}
                          >
                            <Check className="h-4 w-4 text-primary" />
                          </motion.div>
                        )}
                      </div>
                    </DropdownMenuItem>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Default variant
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <motion.div
          variants={buttonVariants}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            variant="outline"
            size="icon"
            className="border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 relative overflow-hidden group"
            disabled={isTransitioning}
          >
            <motion.div
              animate={isTransitioning ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <Globe className="h-[1.2rem] w-[1.2rem] transition-transform duration-300 group-hover:scale-110" />
            </motion.div>
            <span className="sr-only">Change language</span>

            {/* Animated background effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </Button>
        </motion.div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-[200px] p-1">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {locales.map((localeOption) => (
                <motion.div key={localeOption.code} variants={itemVariants}>
                  <DropdownMenuItem
                    onClick={() => handleLocaleChange(localeOption.code)}
                    className={`cursor-pointer transition-all duration-200 rounded-md p-3 hover:bg-primary/5 group ${
                      locale === localeOption.code
                        ? "bg-gradient-to-r from-primary/10 to-accent/5 text-primary border border-primary/20"
                        : "hover:border hover:border-primary/10"
                    }`}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <motion.span
                        className="text-lg"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", duration: 0.3 }}
                      >
                        {localeOption.flag}
                      </motion.span>
                      <div className="flex-1">
                        <div className="font-medium text-sm group-hover:text-primary transition-colors duration-200">
                          {localeOption.name}
                        </div>
                        {showNativeName && (
                          <div className="text-xs text-muted-foreground">
                            {localeOption.nativeName}
                          </div>
                        )}
                      </div>
                      <AnimatePresence>
                        {locale === localeOption.code && (
                          <motion.div
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 90 }}
                            transition={{ type: "spring", duration: 0.4 }}
                          >
                            <Check className="h-4 w-4 text-primary" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </DropdownMenuItem>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
