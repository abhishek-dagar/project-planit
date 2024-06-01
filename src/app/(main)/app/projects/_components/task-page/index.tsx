import React, { useEffect, useState } from "react";
import ListPage from "./_components/list";
import { fetchTasks, updateTask } from "@/lib/actions/task.action";
import { useSearchParams } from "next/navigation";
import BoardPage from "./_components/board";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { CreateTaskModal } from "./_components/create-task-modal";
import { Filter } from "./_components/filter";
import { TaskPriority, TaskStatus } from "@/lib/types/task.type";
import GroupByDropdown from "./_components/groupby-dropdown";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { toast } from "sonner";

type Props = {
  project: any;
};

const TaskPage = ({ project }: Props) => {
  const [tasks, setTasks] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<{
    status: string[];
    priority: string[];
    assignee: string[] | null[];
    dueDate: Date | null;
  }>({
    status: Object.keys(TaskStatus)
      .filter((key) => isNaN(Number(key)))
      .map((key) => key),
    priority: Object.keys(TaskPriority)
      .filter((key) => isNaN(Number(key)))
      .map((key) => key),
    assignee: [],
    dueDate: null,
  });
  const searchParams = useSearchParams();
  const getTasks = async () => {
    let groupBy = searchParams.get("groupBy") || "";
    if (groupBy !== "status" && groupBy !== "priority") groupBy = "";
    const { tasks } = await fetchTasks(
      project.id,
      groupBy,
      filter.status,
      filter.priority,
      filter.dueDate,
      filter.assignee
    );
    setTasks(tasks);
  };

  const handleDragEnd = async(result: DropResult) => {
    const { destination, source } = result;
    let groupBy:string|null = searchParams.get("groupBy");
    if (!destination) return;
    if (destination.droppableId === source.droppableId) {
      // same list movement
      setTasks((task: any) => {
        const tempTask = JSON.parse(JSON.stringify(task));
        const [removed] = tempTask[source.droppableId].splice(source.index, 1);
        tempTask[destination.droppableId].splice(destination.index, 0, removed);
        return tempTask;
      });
    } else if(groupBy){
      // different list movement
      let removed:any;
      setTasks((task: any) => {
        const tempTask = JSON.parse(JSON.stringify(task));
        [removed] = tempTask[source.droppableId].splice(source.index, 1);
        removed[groupBy] = destination.droppableId;
        if (
          tempTask[destination.droppableId] &&
          tempTask[destination.droppableId].length
        ) {
          tempTask[destination.droppableId].splice(
            destination.index,
            0,
            removed
          );
        } else {
          tempTask[destination.droppableId] = [removed];
        }
        return tempTask;
      });
      if(removed){
        const {updatedTask} = await updateTask(removed?.id, {[groupBy]:removed[groupBy]});
        if(updatedTask){
          toast.success("Task moved successfully");
        }
      }
    }
  };

  const handleFilter = (key: string, value: any) => {
    setFilter({ ...filter, [key]: value });
  };

  useEffect(() => {
    getTasks();
  }, [
    project.id,
    searchParams.get("projectId"),
    searchParams.get("tab"),
    searchParams.get("groupBy"),
    searchParams.get("view"),
    searchParams.get("refresh"),
    filter,
  ]);

  return (
    <div>
      {/* heading */}
      <div className="flex items-center justify-between border-b px-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="search..."
            className="h-8 bg-muted !rounded-full"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            frontIcon={
              <SearchIcon size={14} className="text-muted-foreground" />
            }
          />
          <Filter filter={filter} handleFilter={handleFilter} />
          <GroupByDropdown />
        </div>
        <CreateTaskModal />
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        {searchParams.get("view") === "board" ? (
          <BoardPage tasks={tasks} project={project} searchQuery={search} />
        ) : (
          <ListPage tasks={tasks} project={project} searchQuery={search} />
        )}
      </DragDropContext>
    </div>
  );
};

export default TaskPage;
