import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TaskPriority, TaskStatus } from "@/lib/interfacesOrEnum/teams-group";
import { XIcon } from "lucide-react";
import React, { useState } from "react";

interface Props {
  setNewTaskOpen: (value: boolean) => void;
  table: any;
}

const NewTaskRow = ({ setNewTaskOpen, table }: Props) => {
  const [newTask, setNewTask] = useState<any>();

  const handleNewTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    if (newTask) {
      newTask.status = TaskStatus.TODO;
      newTask.priority = TaskPriority.NONE;
      setNewTask(null);
      table.options.meta?.addDate(newTask);
      setNewTaskOpen(false);
    }
  };
  return (
    <form onSubmit={handleSave}>
      <div className="flex items-center">
        <div className="flex-1">
          <input
            value={newTask ? newTask?.title : ""}
            name="title"
            autoFocus
            onChange={handleNewTask}
            placeholder="Type your task title here..."
            className="flex h-full w-full rounded-md bg-transparent px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div className="flex items-center rounded-sm text-[14px]">
          <Button className="py-0 h-6" type="submit">
            SAVE
          </Button>
          <Button
            variant={"ghost"}
            className="hover:bg-transparent hover:text-primary"
            onClick={() => setNewTaskOpen(false)}
          >
            <XIcon size={20} />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default NewTaskRow;
