"use client";
import ActivityCard, {
  ActivityCardSkeleton,
} from "@/components/cards/activity-card";
import ProjectDescCard, {
  ProjectDescCardSkeleton,
} from "@/components/cards/project-desc-card";
import TaskCountCard, {
  TaskCountCardProps,
  TaskCountCardSkeleton,
} from "@/components/cards/task-count-card";
import useProjects from "@/components/custom-hooks/projects";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CountTasks,
  fetchActivity,
  tasksCount,
} from "@/lib/helpers/count-tasks";
import moment, { Moment } from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home = () => {
  const [projects] = useProjects({});
  // const countTasks: any = CountTasks(projects);
  const [countTasks, setCountTasks] = useState<TaskCountCardProps[]>();
  const [activities, setActivities] = useState<any[]>();
  const [selectedDate, setSelectedDate] = useState<any>(moment());

  useEffect(() => {
    if (projects) setCountTasks(CountTasks(projects));
  }, [projects]);
  useEffect(() => {
    if (projects) {
      const act: any = fetchActivity(projects, selectedDate);
      setActivities(act);
    }
  }, [projects, selectedDate]);

  return (
    <div className="w-full h-full p-4 px-4 lg:px-10 overflow-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[4.2fr_2fr] gap-10 max-h-[calc(100%-2rem)]">
        {/* <div className="col-span-3 grid grid-rows-2"> */}
        <div className="flex flex-col md:grid md:grid-rows-3 md:max-h-[calc(100vh-2rem)] gap-10">
          <div className="flex flex-col gap-3">
            <div>
              <span>Tasks</span>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6">
              {countTasks ? (
                countTasks.map((taskCount: TaskCountCardProps) => (
                  <TaskCountCard key={taskCount.title} {...taskCount} />
                ))
              ) : (
                <>
                  {tasksCount.map((taskCount: TaskCountCardProps) => (
                    <TaskCountCardSkeleton key={taskCount.title} />
                  ))}
                </>
              )}
            </div>
          </div>
          <div className=" row-span-2 w-full pb-2">
            <div className="mb-3 flex justify-between items-end">
              <span>Projects In Progress</span>
              {/* <Button className="rounded-full">+ Project</Button> */}
            </div>
            <ScrollArea className="bg-background rounded-lg h-[120px] md:h-3/4 px-4 py-2 border border-gray-500">
              <div className="flex flex-wrap flex-col">
                {/* {Object.} */}
                {projects && Object.keys(projects).length > 0 ? (
                  Object.keys(projects).map((projectWithTeamAsLey: any) =>
                    projects[projectWithTeamAsLey].map((project: any) => {
                      return (
                        <Link
                          key={project.id}
                          href={`/app/teams/${projectWithTeamAsLey}/${project.id}`}
                        >
                          <ProjectDescCard project={project} />
                        </Link>
                      );
                    })
                  )
                ) : (
                  <div className="flex flex-col gap-1">
                    <ProjectDescCardSkeleton />
                    <ProjectDescCardSkeleton />
                    <ProjectDescCardSkeleton />
                    <ProjectDescCardSkeleton />
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
        {/* </div> */}
        <div className="flex flex-col lg:col-span-1 md:grid md:grid-rows-2 md:max-h-[calc(100vh-2rem)] gap-2 overflow-auto">
          <Calendar
            mode="single"
            selected={new Date(selectedDate?.toString())}
            onSelect={setSelectedDate}
            disabled={{ after: new Date() }}
            className="bg-background flex justify-center items-center rounded-2xl"
          />
          <div className="w-full">
            <div className="mb-3">
              <span className="text-subtitle uppercase">Today activities</span>
            </div>
            <div className="w-full bg-background mb-4 md:m-0 rounded-xl">
              <ScrollArea className="w-full h-[220px] md:h-[270px] px-4 py-2">
                <div className="flex flex-col gap-3">
                  {activities ? (
                    activities.length > 0 ? (
                      activities.map(
                        (activity: any) =>
                          activity.changedBy && (
                            <ActivityCard
                              key={activity.id}
                              activity={activity}
                            />
                          )
                      )
                    ) : (
                      <div>
                        No activities on{" "}
                        <span className="text-primary">{moment(selectedDate).format("MMM DD")}</span>
                      </div>
                    )
                  ) : (
                    <>
                      <ActivityCardSkeleton />
                      <ActivityCardSkeleton />
                      <ActivityCardSkeleton />
                    </>
                  )}
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
