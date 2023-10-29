"use client";
import { ThemeProvider } from "@/components/provider/theme-provider";
import "../globals.css";
import { Poppins } from "next/font/google";
import { themes } from "@/lib/config/theme.config";
import { Provider } from "react-redux";
import store from "@/redux/store";
import AppSideBar from "@/components/navigation-bars/app-side-bar";
import AppBottomBar from "@/components/navigation-bars/app-bottom-bar";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProgressbarProviders from "@/components/provider/progress-bar-provider";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="shortcut icon" href="/logo.svg" />
      </head>
      <body className={poppins.className}>
        <Provider store={store}>
          <ThemeProvider
            attribute="class"
            themes={themes}
            forcedTheme="theme-violet-dark"
            enableSystem
          >
            <ProgressbarProviders>
              <TooltipProvider>
                <div className="flex h-screen flex-col md:flex-row relative overflow-hidden">
                  <AppSideBar />
                  <div className="flex-1 w-full h-full overflow-hidden">
                    {children}
                  </div>
                  <AppBottomBar />
                </div>
                <Toaster />
              </TooltipProvider>
            </ProgressbarProviders>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
