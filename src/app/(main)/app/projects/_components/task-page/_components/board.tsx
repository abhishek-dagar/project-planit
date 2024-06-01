import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  TaskPriority,
  TaskPriorityColor,
  TaskPriorityIcon,
  TaskStatus,
  TaskStatusColor,
  TaskStatusIcon,
} from "@/lib/types/task.type";
import { LucideIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import EditTaskModal from "./edit-task-modal";
import { useSearchParams } from "next/navigation";
import StatusDropdown from "./status-dropdown";
import PriorityDropdown from "./priority-dropdown";
import { CalendarForm } from "./calender-dropdown";
import AssigneeDropdown from "./assignee-dropdown";
import { cn } from "@/lib/utils";
import { UserRoundIcon } from "@/components/icons/user-round";
import {
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
} from "react-beautiful-dnd";

type Props = {
  tasks: any;
  project: any;
  searchQuery?: string;
};

const statuses = Object.keys(TaskStatus)
  .filter((key) => isNaN(Number(key)))
  .map((key) => key);
const priorities = Object.keys(TaskPriority)
  .filter((key) => isNaN(Number(key)))
  .map((key) => key);
const BoardPage = ({ tasks, project, searchQuery = "" }: Props) => {
  const searchParams = useSearchParams();
  const [group, setGroup] = useState<any>();
  useEffect(() => {
    if (searchParams.get("groupBy") === "status") {
      setGroup(statuses);
    } else {
      setGroup(priorities);
    }
  }, [searchParams.get("groupBy")]);
  return (
    <div className="h-[calc(100vh-222px)] max-w-[calc(100vw-260px)] p-5 pt-0 overflow-auto flex relative">
      {tasks?.length ? (
        <div className="flex flex-col gap-2">
          {tasks
            .filter((task: any) =>
              task.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((task: any) => (
              <BoardCard key={task.id} task={task} project={project} />
            ))}
        </div>
      ) : (
        <div className="flex gap-8 mb-5">
          {tasks &&
            group &&
            group?.map((key: any) => {
              const Icon: LucideIcon =
                TaskStatusIcon[key] || TaskPriorityIcon[key];
              const filterTasks = tasks[key]?.filter((task: any) =>
                task.title.toLowerCase().includes(searchQuery.toLowerCase())
              );

              return (
                <Droppable key={key} droppableId={key} type="DATA">
                  {(provided: DroppableProvided, snapshot) => {
                    return (
                      <BoardColumn
                        key={key}
                        tasks={filterTasks}
                        stat={key}
                        Icon={Icon}
                        project={project}
                        snapshot={snapshot}
                        provided={provided}
                      />
                    );
                  }}
                </Droppable>
              );
            })}
        </div>
      )}
    </div>
  );
};

const BoardColumn = ({
  tasks,
  stat,
  Icon,
  project,
  provided,
  snapshot,
}: any) => {
  return (
    <div ref={provided.innerRef} {...provided.droppableProps}>
      <div className={cn("w-[250px] flex flex-col gap-2 pt-5")}>
        <div
          className={`text-sm flex items-center gap-2 px-5 py-2 bg-muted rounded-t-lg border-t-4 z-[10] sticky top-0 shadow-lg`}
          style={{
            borderColor: TaskStatusColor[stat] || TaskPriorityColor[stat],
          }}
        >
          <Icon
            size={16}
            color={TaskStatusColor[stat] || TaskPriorityColor[stat]}
          />
          <span>{stat}</span>
          <span className="px-1.5 rounded-full border border-primary bg-background">
            {tasks ? tasks.length : "0"}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {tasks?.map((task: any, index: number) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided: DraggableProvided, snapshot) => (
                <BoardCard
                  key={task.id}
                  task={task}
                  project={project}
                  snapshot={snapshot}
                  provided={provided}
                />
              )}
            </Draggable>
          ))}
          <div className="h-20 bg-transparent" />
        </div>
      </div>
      {provided.placeholder}
    </div>
  );
};

const BoardCard = ({ task, project, provided, snapshot }: any) => {
  // console.log(provided.draggableProps?.style);
  const [open, setOpen] = useState(false);

  const getItemStyle = (draggableStyle: any) => {
    const transform = draggableStyle.transform;
    return {
      ...draggableStyle,
      userSelect: "none",
      opacity: snapshot.isDragging && "0.7",
      pointerEvents: "auto",
      cursor: snapshot.isDragging ? "all-scroll" : "auto",
      overflow: "hidden",
      transform: transform,
    };
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className={`flex flex-col gap-2 py-3 px-5 cursor-pointer bg-muted rounded-lg`}
          ref={provided?.innerRef}
          {...provided?.draggableProps}
          style={provided && getItemStyle(provided?.draggableProps?.style)}
          {...provided?.dragHandleProps}
        >
          <div className="flex-1 flex gap-2">
            <p className="max-w-[180px] flex gap-1 items-center text-sm text-muted-foreground truncate">
              <UserRoundIcon selected size={16} />{" "}
              {project?.team?.name || "No team assigned"}
            </p>
          </div>
          <div className="flex-1 flex gap-2">
            <p onClick={(e) => e.stopPropagation()}>
              <StatusDropdown taskId={task.id} status={task.status} isIcon />
            </p>
            <p className="max-w-[180px] truncate">{task.title}</p>
          </div>
          <div className="flex-1 flex gap-1 justify-end">
            <div onClick={(e) => e.stopPropagation()}>
              <PriorityDropdown
                taskId={task.id}
                priority={task.priority}
                isIcon
              />
            </div>
            <div onClick={(e) => e.stopPropagation()}>
              <CalendarForm
                taskId={task.id}
                dueDate={task.dueDate}
                createdAt={task.createdAt}
              />
            </div>
            <div onClick={(e) => e.stopPropagation()}>
              <AssigneeDropdown
                taskId={task.id}
                assignee={task.assignee}
                team={project.team}
                isIcon
              />
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[100vw] w-[75vw] max-h-[100vh] h-[75vh] flex flex-col gap-0">
        <DialogHeader className="block h-10">
          <span className="border bg-muted px-3 py-1 rounded-md">
            {project?.name}
          </span>
        </DialogHeader>
        <EditTaskModal task={task} project={project} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default BoardPage;
