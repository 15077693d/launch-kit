export enum ROUTE_ID {
  HOME = "home",
}

export const ROUTE_INFOS: Record<
  ROUTE_ID,
  {
    icon: React.ReactNode;
    isComingSoon: boolean;
    href: string;
  }
> = {
  [ROUTE_ID.HOME]: {
    icon: undefined,
    isComingSoon: false,
    href: "/",
  },
};
