import InfoBar from "@/components/navbars/info-bar";
import MobileBottomBar from "@/components/navbars/mobile-bottom-bar";
import Sidebar from "@/components/navbars/sidebar";
import { currentUser } from "@/lib/helpers/getTokenData";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  if (!user) redirect("/signin");
  return (
    <div className="flex flex-col md:flex-row overflow-hidden h-screen">
      <Sidebar user={user} />
      <div className="w-full">
        <InfoBar />
        {children}
      </div>
      <MobileBottomBar user={user}/>
    </div>
  );
}
