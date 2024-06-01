"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import ListPage from "../../projects/_components/task-page/_components/list";
import moment from "moment";

interface Props {
  tasks: any;
}

const TasksList = ({ tasks }: Props) => {
  const dueTasks = tasks.filter((task: any) =>
    moment(task.dueDate).isBefore(moment().add(7, "days"))
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Due this week or Overdue</CardTitle>
      </CardHeader>
      <CardContent>
        <ListPage tasks={dueTasks} />
      </CardContent>
    </Card>
  );
};

export default TasksList;
