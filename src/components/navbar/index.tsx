"use client";
import { AvatarDropdown } from "@/components/dropdown/avatar-dropdown";
import { LanguageDropdown } from "@/components/dropdown/language-dropdown";
import { ThemeToggle } from "@/components/navbar/theme-toggle";
import { Link, usePathname } from "@/i18n/navigation";
import { HIDDEN_BANNER_PREFIX, HIDDEN_NAV_PREFIX } from "@/lib/constants";
import { type ROUTE_ID, ROUTE_INFOS } from "@/lib/constants/route";
import { useTranslations } from "next-intl";
import { MenuDrawer } from "../drawer/menu-drawer";
import RouteLink from "../link/route-link";

export function Navbar() {
  const pathname = usePathname();
  const tBanner = useTranslations("banner");
  const tCommon = useTranslations("common");
  const tRoute = useTranslations("route");
  if (HIDDEN_NAV_PREFIX.some((prefix) => pathname.includes(prefix))) {
    return null;
  }
  return (
    <>
      {/* Test version banner */}
      {!HIDDEN_BANNER_PREFIX.some((prefix) => pathname.includes(prefix)) && (
        <div className="bg-yellow-500 dark:bg-yellow-800 py-2 text-center text-sm text-black dark:text-white font-medium">
          {tBanner("testVersion")}
          <a
            href="mailto:oscaryiu.lapsang@gmail.com"
            className="underline ml-1"
          >
            {tBanner("contactEmail", { email: "oscaryiu.lapsang@gmail.com" })}
          </a>
        </div>
      )}
      <header className="bg-background narbar px-4 container mx-auto">
        <div
          className={
            "flex md:grid h-14 grid-cols-3 justify-between items-center mx-auto container"
          }
        >
          <div className="md:hidden flex items-center gap-3">
            <MenuDrawer />
            <Link href="/" className="font-bold text-xl flex items-center ">
              {tCommon("appName")}
            </Link>
          </div>
          <Link
            href="/"
            className="font-bold text-xl  items-center gap-1 hidden md:flex"
          >
            {tCommon("appName")}
          </Link>
          <nav className="hidden md:flex gap-6 justify-center">
            {Object.entries(ROUTE_INFOS)
              .filter(([_, info]) => info.isShowInNav)
              .map(([key, info]) => {
                const isActive = pathname === info.href;
                if (info.isProtected) {
                  return (
                    <RouteLink
                      key={key}
                      routeId={key as ROUTE_ID}
                      className={`text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${
                        isActive ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {tRoute(`${key}.title`)}
                    </RouteLink>
                  );
                }
                return (
                  <Link
                    key={key}
                    href={info.href}
                    className={`text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {tRoute(`${key}.title`)}
                  </Link>
                );
              })}
          </nav>
          <div className="flex items-center gap-2 justify-end gap-x-2">
            <ThemeToggle />
            <LanguageDropdown />
            <AvatarDropdown />
          </div>
        </div>
      </header>
    </>
  );
}
