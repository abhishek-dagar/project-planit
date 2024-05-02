import {
  CheckCircleIcon,
  CopyXIcon,
  LucideIcon,
  RotateCwIcon,
  TargetIcon,
} from "lucide-react";
import { Project } from "../interfacesOrEnum/teams-group";
import { TaskCountCardProps } from "@/components/cards/task-count-card";
import moment, { Moment } from "moment";

export const tasksCount: TaskCountCardProps[] = [
  {
    Icon: TargetIcon,
    title: "Ongoing",
    count: 0,
    iconColor: "#a9b5e8",
    iconBgColor: "#e9ebff",
  },
  {
    Icon: RotateCwIcon,
    title: "Process",
    count: 0,
    iconColor: "#59ac50",
    iconBgColor: "#e5ffec",
  },
  {
    Icon: CheckCircleIcon,
    title: "Completed",
    count: 0,
    iconColor: "#20b5ec",
    iconBgColor: "#e4f7ff",
  },
  {
    Icon: CopyXIcon,
    title: "Cancel",
    count: 0,
    iconColor: "#f63559",
    iconBgColor: "#ffecf0",
  },
];
export const CountTasks = (projects: Project[]) => {
  Object.values(projects).map((projectPerTeam: any) => {
    projectPerTeam.map((project: any) => {
      project.tasks.map((task: any) => {
        if (task.status === "TODO" || task.status === "PLANNING")
          tasksCount[0].count += 1;
        if (task.status === "IN PROGRESS") tasksCount[1].count += 1;
        if (task.status === "COMPLETED") tasksCount[2].count += 1;
        if (task.status === "CANCELED") tasksCount[3].count += 1;
      });
    });
  });
  return tasksCount;
};

export const fetchActivity = (projects: Project[], date: Moment) => {
  const result: any[] = [];
  Object.values(projects).map((projectPerTeam: any) => {
    projectPerTeam.map((project: any) => {
      project.tasks.map((task: any) => {
        task.comments.map((comment: any) => {
          if (
            moment(date).format("YYYY-MM-DD") ===
            moment(comment.createdAt).format("YYYY-MM-DD")
          )
            result.push({ ...comment, task: task });
        });
      });
    });
  });
  return result;
};
