import { PostHogProvider } from "@/lib/tools/posthog";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter, Nunito } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const quicksand = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quicksand",
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
    <html
      lang="en"
      className={cn(quicksand.variable, inter.variable)}
      suppressHydrationWarning
    >
      <body className="font-quicksand bg-background text-foreground min-h-screen">
        {/* Layout UI */}
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
