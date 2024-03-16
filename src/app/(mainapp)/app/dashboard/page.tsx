"use client";
import ProjectDescCard from "@/components/cards/project-desc-card";
import TaskCountCard from "@/components/cards/task-count-card";
import useProjects from "@/components/custom-hooks/projects";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CountTasks } from "@/lib/helpers/count-tasks";
import { Project } from "@/lib/interfacesOrEnum/teams-group";
import {
  CheckCircleIcon,
  CopyXIcon,
  LucideIcon,
  RotateCwIcon,
  TargetIcon,
} from "lucide-react";

interface TaskCountCardProps {
  Icon: LucideIcon;
  title: string;
  count: string;
  iconColor: string;
  iconBgColor: string;
}

const tasksCount: TaskCountCardProps[] = [
  {
    Icon: TargetIcon,
    title: "Ongoing",
    count: "4",
    iconColor: "#a9b5e8",
    iconBgColor: "#e9ebff",
  },
  {
    Icon: RotateCwIcon,
    title: "Process",
    count: "4",
    iconColor: "#59ac50",
    iconBgColor: "#e5ffec",
  },
  {
    Icon: CheckCircleIcon,
    title: "Completed",
    count: "4",
    iconColor: "#20b5ec",
    iconBgColor: "#e4f7ff",
  },
  {
    Icon: CopyXIcon,
    title: "Cancel",
    count: "4",
    iconColor: "#f63559",
    iconBgColor: "#ffecf0",
  },
];

const Home = () => {
  const [projects] = useProjects({});
  const countTasks: any = CountTasks(projects);

  return (
    <div className="w-full h-full p-4 px-10 overflow-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-h-[calc(100%-2rem)]">
        {/* <div className="col-span-3 grid grid-rows-2"> */}
        <div className="flex flex-col col-span-3 md:grid md:grid-rows-3 md:max-h-[calc(100vh-2rem)] gap-10">
          <div className="flex flex-col gap-3">
            <div>
              <span>Tasks</span>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6">
              {tasksCount.map((taskCount: TaskCountCardProps) => (
                <TaskCountCard key={taskCount.title} {...taskCount} />
              ))}
            </div>
          </div>
          <div className=" row-span-2 w-full pb-2">
            <div className="mb-3 flex justify-between items-end">
              <span>Projects In Progress</span>
              <Button className="rounded-full">+ Project</Button>
            </div>
            <ScrollArea className="bg-background rounded-lg h-[120px] md:h-3/4 px-4 py-2">
              <div className="flex flex-wrap flex-col">
                {Object.values(projects).map((project: any) =>
                  project.map((p: any) => {
                    return <ProjectDescCard key={p.id} project={p} />;
                  })
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
        {/* </div> */}
        <div className="flex flex-col col-span-3 md:col-span-1 md:grid md:grid-rows-2 md:max-h-[calc(100vh-2rem)] gap-10 overflow-auto">
          <Calendar
            mode="single"
            selected={new Date()}
            className="bg-background w-full overflow-auto flex justify-center items-center rounded-2xl [&_.flex]:ml-4"
          />
          <div className="w-full">
            <div className="mb-3">
              <span className="text-subtitle uppercase">Today activities</span>
            </div>
            <div className="w-full bg-background mb-4 md:m-0 rounded-xl">
              <ScrollArea className="w-full h-[220px] md:h-[270px] px-4 py-2">
                <div className="flex flex-col gap-3">
                  <div className="bg-secondary-background rounded-lg p-4 ml-12 relative">
                    <div className="flex gap-2">
                      <Avatar>
                        <AvatarFallback className="bg-background">
                          AB
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="font-bold">Abhishek</span> :
                        <span className="text-[14px]">
                          {" "}
                          Task updated from in progress to completed
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] absolute bottom-2 right-2">
                      11:00 pm
                    </span>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
