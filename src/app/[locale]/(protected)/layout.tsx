// src/app/[locale]/(protected)/layout.tsx
import { redirect } from "@/i18n/navigation";
import { auth } from "@/server/auth";

export default async function ProtectedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const session = await auth();
  const { locale } = await params;
  if (!session) {
    redirect({ href: "/sign-in", locale });
  }

  return <>{children}</>;
}
