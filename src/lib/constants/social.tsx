import { Facebook, Instagram, Link2 } from "lucide-react";

export enum SOCIAL_TYPE {
  INSTAGRAM = "instagram",
  FACEBOOK = "facebook",
  OTHER = "other",
}

export const SOCIAL_INFOS: Record<
  SOCIAL_TYPE,
  {
    label: string;
    icon: React.ReactNode;
  }
> = {
  [SOCIAL_TYPE.INSTAGRAM]: {
    label: "Instagram",
    icon: <Instagram />,
  },
  [SOCIAL_TYPE.FACEBOOK]: {
    label: "Facebook",
    icon: <Facebook />,
  },
  [SOCIAL_TYPE.OTHER]: {
    label: "Other",
    icon: <Link2 />,
  },
};
