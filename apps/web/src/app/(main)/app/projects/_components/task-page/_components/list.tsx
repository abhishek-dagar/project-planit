import { ChevronDownCircle, GripVerticalIcon, LucideIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  TaskPriority,
  TaskPriorityColor,
  TaskPriorityIcon,
  TaskStatus,
  TaskStatusColor,
  TaskStatusIcon,
} from "@/lib/types/task.type";
import { Checkbox } from "@/components/ui/checkbox";
import StatusDropdown from "./status-dropdown";
import PriorityDropdown from "./priority-dropdown";
import AssigneeDropdown from "./assignee-dropdown";
import { CalendarForm } from "./calender-dropdown";
import moment from "moment";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditTaskModal from "./edit-task-modal";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import {
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
} from "react-beautiful-dnd";
// import { currentUser } from "@/lib/helpers/getTokenData";
import { toast } from "sonner";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

type Props = {
  tasks: any;
  project?: any;
  searchQuery?: string;
  user: any;
};

const statuses = Object.keys(TaskStatus)
  .filter((key) => isNaN(Number(key)))
  .map((key) => key);
const priorities = Object.keys(TaskPriority)
  .filter((key) => isNaN(Number(key)))
  .map((key) => key);

const ListPage = ({ tasks, project, user, searchQuery = "" }: Props) => {
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
    <div
      className={cn(
        "h-[calc(100vh-222px)] overflow-auto flex flex-col gap-10 bg-[radial-gradient(rgb(var(--muted))_1px,transparent_1px)] [background-size:16px_16px]",
        !tasks?.length && "p-5"
      )}
    >
      {tasks?.length ? (
        <div className="flex flex-col gap-2">
          {tasks
            .filter((task: any) =>
              task.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((task: any) => (
              <Row
                key={task.id}
                task={task}
                project={project}
                border
                user={user}
              />
            ))}
        </div>
      ) : tasks["TODO"] ||
        tasks["IN_PROGRESS"] ||
        tasks["COMPLETED"] ||
        tasks["CANCELLED"] ||
        tasks["BACKLOG"] ||
        tasks["LOW"] ||
        tasks["MEDIUM"] ||
        tasks["HIGH"] ||
        tasks["URGENT"] ||
        tasks["NONE"] ? (
        group &&
        group?.map((key: any) => {
          const Icon: LucideIcon = TaskStatusIcon[key] || TaskPriorityIcon[key];
          const filterTasks = tasks[key]?.filter((task: any) =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
          return (
            <Droppable key={key} droppableId={key} type="DATA">
              {(provided: DroppableProvided, snapshot) => {
                return (
                  <Column
                    key={key}
                    tasks={filterTasks}
                    stat={key}
                    Icon={Icon}
                    project={project}
                    snapshot={snapshot}
                    provided={provided}
                    user={user}
                  />
                );
              }}
            </Droppable>
          );
        })
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">No Tasks Available</p>
        </div>
      )}
    </div>
  );
};

const Column = ({
  tasks,
  stat,
  Icon,
  project,
  provided,
  snapshot,
  user,
}: any) => {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(true);
  return (
    <div
      ref={provided?.innerRef}
      {...provided?.droppableProps}
      className={cn({ hidden: !tasks })}
    >
      <Collapsible open={open} onOpenChange={setOpen} className="space-y-2">
        <div
          className={cn(
            "text-sm flex items-center gap-2 px-5 pl-2 py-2 bg-muted rounded-lg"
          )}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-5 w-5 bg-muted text-muted-foreground hover:text-foreground"
              onClick={() => setOpen(!open)}
            >
              <ChevronDownCircle
                size={14}
                className={cn("rotate-180 transition-all duration-300", {
                  "rotate-0": open,
                })}
              />
            </Button>
          </CollapsibleTrigger>
          <div className="flex items-center gap-2">
            <Icon
              size={16}
              color={TaskStatusColor[stat] || TaskPriorityColor[stat]}
            />
            <span>{stat}</span>
            <span>{tasks ? tasks.length : "0"}</span>
          </div>
        </div>
        <CollapsibleContent className="" style={{ marginTop: 0 }}>
          <div>
            {tasks ? (
              tasks.map((task: any, index: number) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided: DraggableProvided, snapshot) => (
                    <Row
                      key={task.id}
                      task={task}
                      project={project}
                      border
                      snapshot={snapshot}
                      provided={provided}
                      user={user}
                    />
                  )}
                </Draggable>
              ))
            ) : (
              <p className="text-muted-foreground text-center">
                No task in {stat} {searchParams.get("groupBy")}
              </p>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
      {provided.placeholder}
    </div>
  );
};

const Row = ({ task, project, border, provided, snapshot, user }: any) => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(
    user?.role?.name === "member" &&
      task?.assignee?.id !== user?.id &&
      project?.team?.teamLead?.id !== user?.id
  );
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

  const handleOpen = (value: boolean) => {
    if (
      user?.role?.name === "member" &&
      task?.assignee?.id !== user?.id &&
      project?.team?.teamLead?.id !== user?.id
    ) {
      toast.error("You are not authorized to perform this action", {
        description:
          "Only the assignee, team lead or manager can edit this task",
      });
      return;
    }
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <div
          className={cn(
            `flex items-center gap-2 py-1 pl-2 pr-5 border-transparent cursor-pointer`,
            border && "border-b border-border",
            checked && "bg-[#7540a92b] border-primary"
          )}
          ref={provided?.innerRef}
          {...provided?.draggableProps}
          style={provided && getItemStyle(provided?.draggableProps?.style)}
          {...provided?.dragHandleProps}
        >
          <div
            className={cn(
              "[&_.checkbox]:hover:!visible [&_.handle]:hover:visible flex gap-1 items-center",
              snapshot?.isDragging && "[&_.handle]:visible"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <p
              className="cursor-pointer"
              {...provided?.draggableProps}
              {...provided?.dragHandleProps}
            >
              <GripVerticalIcon
                size={16}
                className="handle invisible"
                onClick={(e) => e.stopPropagation()}
              />
            </p>
            <Checkbox
              checked={checked}
              onCheckedChange={(value: any) => setChecked(value)}
              className="checkbox"
              style={{ visibility: checked ? "visible" : "hidden" }}
            />
          </div>
          <p onClick={(e) => e.stopPropagation()}>
            <PriorityDropdown
              taskId={task.id}
              priority={task.priority}
              isIcon
              disabled={disabled}
            />
          </p>
          <p onClick={(e) => e.stopPropagation()}>
            <StatusDropdown
              taskId={task.id}
              status={task.status}
              isIcon
              disabled={disabled}
            />
          </p>
          <div className="flex-1">
            <p className="max-w-[450px] truncate">{task.title}</p>
          </div>
          <p className="text-muted-foreground">
            {moment(task.createdAt).format("MMM DD")}
          </p>
          <div onClick={(e) => e.stopPropagation()}>
            <CalendarForm
              taskId={task.id}
              dueDate={task.dueDate}
              createdAt={task.createdAt}
              status={task.status}
              disabled={
                user?.role?.name === "member" &&
                project?.team?.teamLead?.id !== user?.id
              }
            />
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <AssigneeDropdown
              taskId={task.id}
              assignee={task.assignee}
              team={task.project ? task.project?.team : project.team}
              isIcon
              disabled={
                user?.role?.name === "member" &&
                project?.team?.teamLead?.id !== user?.id
              }
            />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[100vw] md:w-[75vw] max-h-[100vh] md:h-[75vh] flex flex-col gap-0 px-3 md:px-6">
        <DialogHeader className="block text-start h-10">
          <span className="border bg-muted px-3 py-1 rounded-md">
            {project?.name}
          </span>
        </DialogHeader>
        <EditTaskModal
          task={task}
          project={task.project ? task.project : project}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ListPage;
