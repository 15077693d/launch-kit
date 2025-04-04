"use client";

import { locales } from "@/i18n/routing";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  // Simple locale detection from URL
  const currentLocale = pathname.startsWith("/zh") ? "zh" : "en";

  // Get the path without the locale prefix
  let pathnameWithoutLocale = pathname.replace(`/${currentLocale}`, "") || "/";

  // Ensure the path starts with a slash
  if (!pathnameWithoutLocale.startsWith("/")) {
    pathnameWithoutLocale = "/" + pathnameWithoutLocale;
  }

  const handleLocaleChange = (newLocale: string) => {
    // Navigate to the same page but with a different locale
    router.push(`/${newLocale}${pathnameWithoutLocale}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => handleLocaleChange(l)}
            className={l === currentLocale ? "bg-accent" : ""}
          >
            {l === "en" ? "English" : "繁體中文"}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
