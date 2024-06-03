import { currentUser } from "@/lib/helpers/getTokenData";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user: any = await currentUser();
  if (user?.role?.name === "manager" && user.workspaces &&user?.workspaces?.length < 1)
    redirect("/workspace");
  return (
    <div className="border-l-[1px] border-t-[1px] h-[calc(100vh-3.5rem)] rounded-tl-3xl border-muted-foreground/20 overflow-auto">
      {children}
    </div>
  );
}
