import { currentUser } from "@/lib/helpers/getTokenData";
import { redirect } from "next/navigation";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import SubSidebar from "./_components/sub-sidebar";

export default async function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  if (
    user?.role?.name === "manager" &&
    user.workspaces &&
    user?.workspaces?.length < 1
  )
    redirect("/workspace");
  return (
    <div className="h-full relative">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel
          maxSize={20}
          defaultSize={20}
          className="hidden md:block"
        >
          <SubSidebar user={user} />
        </ResizablePanel>
        <ResizableHandle withHandle className="hover:bg-primary" />
        <ResizablePanel defaultSize={80}>{children}</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
