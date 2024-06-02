import React from "react";
import CountCard from "./count-card";
import CustomPieChart from "./pie-chart";
import CustomBarChart from "./bar-chart";
import TasksList from "./tasks-list";

interface Props {
  tasks: any;
  user: any;
}
const LeftSection = ({ tasks, user }: Props) => {
  const groupTasks: any = {
    Total: tasks?.length,
    "TO DO": 0,
    "IN PROGRESS": 0,
    COMPLETED: 0,
    Others: 0,
  };
  tasks.map((task: any) => {
    if (task.status === "TODO") {
      groupTasks["TO DO"] += 1;
    } else if (task.status === "IN_PROGRESS") {
      groupTasks["IN PROGRESS"] += 1;
    } else if (task.status === "COMPLETED") {
      groupTasks["COMPLETED"] += 1;
    } else {
      groupTasks["Others"] += 1;
    }
  });
  return (
    <div className="px-6 flex flex-col gap-6">
      <div className="flex flex-wrap gap-8">
        {Object.entries(groupTasks)
          .filter(([key, _]) => key !== "Others")
          .map(([key, value]: any) => (
            <CountCard key={key} title={key} count={parseInt(value)} />
          ))}
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <CustomPieChart
          data={Object.keys(groupTasks)
            .filter((key) => key !== "Total")
            .map((key) => ({ name: key, count: groupTasks[key] }))}
        />
        <CustomBarChart
          data={Object.keys(groupTasks)
            .filter((key) => key !== "Total")
            .map((key) => ({ name: key, count: groupTasks[key] }))}
        />
      </div>
      <TasksList tasks={tasks} user={user} />
    </div>
  );
};

export default LeftSection;
