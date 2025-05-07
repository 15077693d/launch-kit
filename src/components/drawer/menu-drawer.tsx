import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Link } from "@/i18n/navigation";
import { ROUTE_ID, ROUTE_INFOS } from "@/lib/constants/route";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import RouteLink from "../link/route-link";

export function MenuDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const handleContentClick = () => {
    // Close the drawer when content is clicked
    setIsOpen(false);
  };

  const tRoute = useTranslations("route");
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger className=" cursor-pointer">
        <Menu width={24} height={24} />
      </DrawerTrigger>
      <DrawerTitle className="hidden">Menu</DrawerTitle>
      <DrawerContent
        className="min-h-[250px] overflow-auto p-6"
        onClick={handleContentClick}
      >
        {Object.entries(ROUTE_INFOS)
          .filter(([_, info]) => info.isShowInDrawer)
          .map(([key, info]) => {
            if (info.isProtected) {
              return (
                <RouteLink
                  key={key}
                  routeId={key as ROUTE_ID}
                  className="text-lg font-medium py-3"
                >
                  {tRoute(`${key}.title`)}
                </RouteLink>
              );
            }
            return (
              <Link
                key={key}
                href={info.href}
                className="text-lg font-medium py-3"
              >
                {tRoute(`${key}.title`)}
              </Link>
            );
          })}
      </DrawerContent>
    </Drawer>
  );
}
