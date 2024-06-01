import { currentUser } from "@/lib/helpers/getTokenData";
import { redirect } from "next/navigation";
import SubSidebar from "./_components/sub-sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { RocketIcon } from "@/components/icons/rocket";
import { CreateNewProjectModal } from "./_components/new-project-model";
import { fetchProjects } from "@/lib/actions/project.action";

export default async function projectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user: any = await currentUser();
  if (user.role.name === "manager" && user.workspaces.length < 1)
    redirect("/workspace");
  const { projects } = await fetchProjects();
  return (
    <div className="h-full relative">
      <div className="sticky top-0 z-[10] py-3 px-6 bg-background/50 backdrop-blur-lg flex items-center justify-between border-b">
        <div>
          <h1 className="text-4xl flex items-center">
            <RocketIcon selected={true} size={30} className="mr-2" />
            Projects
          </h1>
        </div>
        <CreateNewProjectModal />
      </div>
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel maxSize={20} defaultSize={20}>
          <SubSidebar projects={projects} />
        </ResizablePanel>
        <ResizableHandle withHandle className="hover:bg-primary" />
        <ResizablePanel defaultSize={80}>{children}</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}