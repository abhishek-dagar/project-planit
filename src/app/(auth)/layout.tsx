import { ThemeProvider } from "@/components/provider/theme-provider";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./common.css";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
// import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { themes } from "@/lib/config/theme.config";
import ReduxProvider from "@/components/provider/redux-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Login/SignUp",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const pathname = usePathname();
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="shortcut icon" href="/logo.svg" />
      </head>
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            themes={themes}
            forcedTheme="theme-rose-dark"
            enableSystem
          >
            <div className="h-screen bg-[#0c0a09]">
              <div className="flex relative h-screen overflow-hidden flex-col items-center justify-center lg:grid max-w-none lg:grid-cols-2 md:px-0">
                <div className="relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex overflow-hidden">
                  <div className="absolute inset-0 bg-hero-pattern bg-cover" />
                  <div id="stars"></div>
                  <div id="stars2"></div>
                  <Link
                    href={"/"}
                    className="relative z-20 flex items-center text-lg font-medium"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-6 w-6"
                    >
                      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                    </svg>
                    ProjectPlanIt
                  </Link>
                  <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                      <p className="text-lg">
                        &ldquo;This library has saved me countless hours of work
                        and helped me deliver stunning designs to my clients
                        faster than ever before.&rdquo;
                      </p>
                      <footer className="text-sm">Sofia Davis</footer>
                    </blockquote>
                  </div>
                </div>
                {children}
              </div>
            </div>
            <Toaster />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
