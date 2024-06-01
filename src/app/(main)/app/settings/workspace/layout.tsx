import { currentUser } from "@/lib/helpers/getTokenData";
import { redirect } from "next/navigation";

export default async function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user: any = await currentUser();
  if (user?.role?.name === "manager" && user.workspaces.length < 1)
    redirect("/workspace");
  return <>{children}</>;
}
