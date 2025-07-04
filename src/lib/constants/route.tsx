export enum ROUTE_ID {
  HOME = "home",
  PROTECTED = "protected",
}

export const ROUTE_INFOS: Record<
  ROUTE_ID,
  {
    icon: React.ReactNode;
    isComingSoon: boolean;
    href: string;
    isProtected: boolean;
    isShowInHome: boolean;
    isShowInNav: boolean;
    isShowInDrawer: boolean;
  }
> = {
  [ROUTE_ID.HOME]: {
    icon: undefined,
    isComingSoon: false,
    href: "/",
    isProtected: false,
    isShowInHome: true,
    isShowInNav: true,
    isShowInDrawer: true,
  },
  [ROUTE_ID.PROTECTED]: {
    icon: undefined,
    isComingSoon: false,
    href: "/protected",
    isProtected: true,
    isShowInHome: false,
    isShowInNav: true,
    isShowInDrawer: true,
  },
};
