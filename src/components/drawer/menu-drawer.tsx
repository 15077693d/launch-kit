import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Link } from "@/i18n/navigation";
import { ROUTE_INFOS } from "@/lib/constants/route";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";

export function MenuDrawer() {
  const tRoute = useTranslations("route");
  return (
    <Drawer>
      <DrawerTrigger className="md:hidden cursor-pointer">
        <Menu width={24} height={24} />
      </DrawerTrigger>
      <DrawerTitle className="hidden">Menu</DrawerTitle>
      <DrawerContent className="min-h-[250px] overflow-auto p-6">
        {Object.entries(ROUTE_INFOS).map(([key, info]) => (
          <Link className="text-lg font-medium py-3" key={key} href={info.href}>
            {tRoute(key)}
          </Link>
        ))}
      </DrawerContent>
    </Drawer>
  );
}
