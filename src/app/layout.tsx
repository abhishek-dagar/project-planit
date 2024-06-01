import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ProgressBar from "@/components/common/progressbar";
import { Toaster } from "@/components/ui/sonner";
import ReduxProvider from "@/components/providers/redux-provider";
import { Suspense } from "react";

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project planit",
  description: "A place where you can manage teams and tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
            <ProgressBar />
            <Suspense>{children}</Suspense>
            <Toaster />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
