// src/app/[locale]/(protected)/layout.tsx
import { redirect } from "@/i18n/navigation";
import { auth } from "@/server/auth";

export default async function ProtectedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const session = await auth();

  if (!session) {
    redirect({ href: "/sign-in", locale: params.locale });
  }

  return <>{children}</>;
}
