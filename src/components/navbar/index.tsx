"use client";
import { Link, usePathname } from "@/i18n/navigation";
import { HIDDEN_NAV_PREFIX } from "@/lib/constants";
import { User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const session = useSession();
  const pathname = usePathname();
  const t = useTranslations();
  if (HIDDEN_NAV_PREFIX.some((prefix) => pathname.includes(prefix as string))) {
    return null;
  }
  return (
    <header className="bg-background narbar">
      <div className="container flex h-16 items-center justify-between px-4 m-auto">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="font-bold text-xl flex items-center gap-1">
            {t("appName")}
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href={"/"}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname.split("/").length === 2
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {t("navigation.home")}
            </Link>
            {session.status === "authenticated" && (
              <Link
                href={"timetable"}
                className={`text-sm font-medium transition-colors  hover:text-primary ${
                  pathname.includes("/timetable")
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {t("navigation.timetable")}
              </Link>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
          {session.status === "authenticated" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage
                    className="h-8 w-8"
                    src={session?.data?.user?.image ?? ""}
                    alt={t("navigation.userAvatar")}
                  />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">
                      {session?.data?.user?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {session?.data?.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/api/auth/signout">
                    {t("navigation.signOut")}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {session.status === "unauthenticated" && (
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={"/api/auth/signin"}
            >
              <Button variant="outline" className="md:inline-flex">
                {t("navigation.signIn")}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
