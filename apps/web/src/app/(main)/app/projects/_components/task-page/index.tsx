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
import { currentUser } from "@/lib/helpers/getTokenData";

type Props = {
  project: any;
};

const TaskPage = ({ project }: Props) => {
  const [tasks, setTasks] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [isDragging, setIsDragging] = useState(false);
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
  const [user, setUser] = useState<any>();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getUser = async () => {
      const fetUser = await currentUser();
      if (fetUser) setUser(fetUser);
    };
    getUser();
  }, []);
  const getTasks = async () => {
    let groupBy = searchParams.get("groupBy") || "";
    if (searchParams.get("view") === "board" && groupBy == "")
      groupBy = "status";
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

  const handleDragEnd = async (result: DropResult) => {
    setIsDragging(false);
    const { destination, source } = result;
    let groupBy: string | null = searchParams.get("groupBy");

    const ta = tasks[source.droppableId][source.index];
    if (
      user?.role?.name === "member" &&
      project?.team?.teamLead?.id !== user?.id &&
      user?.id !== ta?.assignee?.id
    ) {
      toast.error("You are not authorized to perform this action", {
        description:
          "Only the assignee, team lead or manager can edit this task",
      });
      return;
    }
    if (!destination) return;
    if (destination.droppableId === source.droppableId) {
      // same list movement
      setTasks((task: any) => {
        const tempTask = JSON.parse(JSON.stringify(task));
        const [removed] = tempTask[source.droppableId].splice(source.index, 1);
        tempTask[destination.droppableId].splice(destination.index, 0, removed);
        return tempTask;
      });
    } else if (groupBy) {
      // different list movement
      let removed: any;
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
      if (removed) {
        const { updatedTask } = await updateTask(removed?.id, {
          [groupBy]: removed[groupBy],
        });
        if (updatedTask) {
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
      <div className="flex items-center justify-between border-b px-4 flex-wrap py-2">
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
        {(user?.role?.name !== "member" ||
          project?.team?.teamLead?.id === user?.id) && <CreateTaskModal />}
      </div>
      <DragDropContext
        onDragEnd={handleDragEnd}
        onDragStart={() => {
          setIsDragging(true);
        }}
      >
        {searchParams.get("view") === "board" ? (
          <BoardPage
            tasks={tasks}
            project={project}
            searchQuery={search}
            user={user}
            isDragging={isDragging}
          />
        ) : (
          <ListPage
            tasks={tasks}
            project={project}
            searchQuery={search}
            user={user}
          />
        )}
      </DragDropContext>
    </div>
  );
};

export default TaskPage;
