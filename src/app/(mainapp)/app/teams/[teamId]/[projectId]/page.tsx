import ProjectSettingsPage from "@/components/settings-pages/project-setting-page";
import TaskPage from "@/components/tables/tasks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchProject } from "@/lib/actions/project.action";
import { getTeam } from "@/lib/actions/team.action";
import { ListTodo, Settings } from "lucide-react";
import Link from "next/link";

const Projects = async ({
  params,
}: {
  params: { teamId: string; projectId: string };
}) => {
  const team: any = await getTeam(params.teamId, true);

  const project: any = await fetchProject(params.projectId);

  return (
    <div className="flex-1 w-full relative">
      <Tabs defaultValue="tasks" className="flex flex-col h-full w-full">
        <div className="flex flex-col gap-4 px-5 pt-5 sticky top-0 z-40 md:bg-background">
          <div className="flex md:justify-between md:items-end md:border-b-2 flex-col-reverse md:flex-row">
            <div className="">
              <TabsList className="grid w-full grid-cols-2 bg-background">
                <TabsTrigger
                  value="tasks"
                  className="data-[state=active]:bg-secondary-background  data-[state=active]:text-foreground rounded-none border-b-0 data-[state=active]:border-background rounded-t-lg"
                >
                  <ListTodo size={16} className="mr-2" />
                  Tasks
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:bg-secondary-background data-[state=active]:text-foreground rounded-none border-b-0 data-[state=active]:border-background rounded-t-lg"
                >
                  <Settings size={16} className="mr-2" />
                  Project Setting
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
        </div>
        <div className="sticky top-0 z-20 flex items-center justify-between px-8 py-4">
          <p className="uppercase truncate text-slate-400">
            <Link href={"/app/teams"} className="hover:underline">
              Teams
            </Link>
            {" > "}
            {team.icon}
            <Link href={`/app/teams/${team.id}`} className="hover:underline">
              {team?.name}
            </Link>
            {" > "}
            {project.name}
          </p>
        </div>
        <TabsContent value="tasks" className="relative">
          <TaskPage tasks={project?.tasks} project={project} />
        </TabsContent>
        <TabsContent value="settings">
          <ProjectSettingsPage project={project} teamId={params.teamId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Projects;
