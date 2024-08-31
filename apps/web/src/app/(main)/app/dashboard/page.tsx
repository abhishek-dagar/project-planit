import Home from "@/components/icons/home";
import React from "react";
import RightSection from "./_components/right-section";
import LeftSection from "./_components/left-section";
import { fetchProjects } from "@/lib/actions/project.action";
import { fetchAllTasks, fetchTasks } from "@/lib/actions/task.action";
import { currentUser } from "@/lib/helpers/getTokenData";
import { fetchActivities } from "@/lib/actions/activity.action";

const Dashboard = async () => {
  const user = await currentUser();
  const { projects } = await fetchProjects();
  const { tasks } = await fetchAllTasks(projects?.map((project) => project.id));
  const { activities } = await fetchActivities();

  return (
    <div className="flex flex-col gap-4 relative">
      <div className="sticky top-0 z-[10] py-1 md:py-3 px-6 bg-background/50 backdrop-blur-lg flex items-center justify-between border-b">
        <h1 className="text-xl md:text-4xl flex items-center">
          <Home selected={true} size={30} className="mr-2" />
          Dashboard
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[4.2fr_2fr] gap-6 lg:gap-0 pb-5">
        <LeftSection
          tasks={
            user?.role?.name !== "member"
              ? tasks
              : tasks?.filter((task: any) => task?.assignee?.id === user?.id)
          }
          user={user}
        />
        <RightSection activities={activities} />
      </div>
    </div>
  );
};

export default Dashboard;
