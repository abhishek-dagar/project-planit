import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import ReduxProvider from "@/components/providers/redux-provider";
import { Suspense } from "react";
import ProgressbarProviders from "../components/providers/progress-bar-provider";
import { removeExpiredPlans } from "@/lib/actions/payment.action";
import { SocketProvider } from "@/context/SocketProvider";

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project planit",
  description: "A place where you can manage teams and tasks",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await removeExpiredPlans();
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="shortcut icon" href="/logo.svg" />
      </head>
      <body className={font.className}>
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark-violet"
            themes={["light", "dark-violet"]}
            enableSystem
          >
            {/* <ProgressBar /> */}
            <ProgressbarProviders>
              <SocketProvider>
                <Suspense>{children}</Suspense>
              </SocketProvider>
            </ProgressbarProviders>
            <Toaster closeButton />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
