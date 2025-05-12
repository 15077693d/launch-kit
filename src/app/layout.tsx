import { PostHogProvider } from "@/lib/tools/posthog";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata = {
  title: "launch-kit",
  description: "launch-kit",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans bg-background text-foreground min-h-screen">
        {/* Layout UI */}
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
