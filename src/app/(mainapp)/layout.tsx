// "use client";
import { ThemeProvider } from "@/components/provider/theme-provider";
import "../globals.css";
import { Poppins } from "next/font/google";
import { themes } from "@/lib/config/theme.config";
import AppSideBar from "@/components/navigation-bars/app-side-bar";
import AppBottomBar from "@/components/navigation-bars/app-bottom-bar";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProgressbarProviders from "@/components/provider/progress-bar-provider";
import { Toaster } from "@/components/ui/toaster";
import ReduxProvider from "@/components/provider/redux-provider";
import { fetchUser } from "@/lib/actions/user.actions";
import { cookies } from "next/headers";
import UserProvider from "@/components/provider/user-provider";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await fetchUser(cookies().get("token")?.value);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="shortcut icon" href="/logo.svg" />
      </head>
      <body className={poppins.className}>
        <ReduxProvider>
          <UserProvider user={user}>
            <ThemeProvider
              attribute="class"
              themes={themes}
              forcedTheme="theme-violet-dark"
              enableSystem
            >
              <ProgressbarProviders>
                <TooltipProvider>
                  <div className="flex bg-secondary-background h-screen flex-col md:flex-row relative overflow-hidden">
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
          </UserProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
