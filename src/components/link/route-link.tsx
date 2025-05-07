import { type ROUTE_ID, ROUTE_INFOS } from "@/lib/constants/route";
import { DialogId, useDialogStore } from "@/lib/stores/useDialogStore";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import type { ComponentProps } from "react";

export default function RouteLink({
  routeId,
  children,
  className,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & {
  routeId: ROUTE_ID;
}) {
  const { status } = useSession();
  const { openDialog } = useDialogStore();
  const info = ROUTE_INFOS[routeId];
  return status === "authenticated" ? (
    <Link {...props} href={info.href} className={className}>
      {children}
    </Link>
  ) : (
    <button
      onClick={() => openDialog(DialogId.LOGIN)}
      className={cn("cursor-pointer text-left", className)}
    >
      {children}
    </button>
  );
}
