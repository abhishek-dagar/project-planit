"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import ListPage from "../../projects/_components/task-page/_components/list";
import moment from "moment";

interface Props {
  tasks: any;
  user: any;
}

const TasksList = ({ tasks, user }: Props) => {
  const dueTasks = tasks.filter((task: any) =>
    moment(task.dueDate).isBefore(moment().add(7, "days")) && task.status !== "COMPLETED"
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Due this week or Overdue</CardTitle>
      </CardHeader>
      <CardContent>
        <ListPage tasks={dueTasks} user={user}/>
      </CardContent>
    </Card>
  );
};

export default TasksList;
