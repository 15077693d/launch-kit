import { LoginDialogWrapper } from "@/components/dialog/login-dialog/wrapper";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";
import { TRPCReactProvider } from "@/trpc/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { notFound } from "next/navigation";

// 添加動態 metadata
// 添加動態 metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // 默認英文
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  // how to get
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <SessionProvider>
      <TRPCReactProvider>
        <ReactQueryDevtools initialIsOpen={false} />{" "}
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LoginDialogWrapper />
            <Navbar />
            <main className="container mx-auto px-4">{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
        <Toaster />
      </TRPCReactProvider>
    </SessionProvider>
  );
}
