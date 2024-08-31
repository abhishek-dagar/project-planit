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
import { ChevronDownCircle, LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
import { toast } from "sonner";
import { useMediaQuery } from "@/components/custom-hooks/media-query";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type Props = {
  tasks: any;
  project: any;
  searchQuery?: string;
  user: any;
  isDragging?: boolean;
};

const statuses = Object.keys(TaskStatus)
  .filter((key) => isNaN(Number(key)))
  .map((key) => key);
const priorities = Object.keys(TaskPriority)
  .filter((key) => isNaN(Number(key)))
  .map((key) => key);
const BoardPage = ({
  tasks,
  project,
  user,
  isDragging,
  searchQuery = "",
}: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const [group, setGroup] = useState<any>();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  useEffect(() => {
    if (searchParams.get("groupBy") === "status") {
      setGroup(statuses);
    } else {
      setGroup(priorities);
    }
  }, [searchParams.get("groupBy")]);

  const handleMouseDown = (e: any) => {
    if (!isDesktop || isDragging) return;
    setIsMouseDown(true);
    setStartX(e.pageX - scrollRef.current!.offsetLeft);
    setScrollLeft(scrollRef.current!.scrollLeft);
  };
  

  const handleMouseLeave = () => {
    if (!isDesktop || isDragging) return;
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    if (!isDesktop || isDragging) return;
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: any) => {
    if (!isDesktop || isDragging) return;
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current!.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      className={cn(
        "h-[calc(100vh-222px)] md:max-w-[calc(100vw-20%-2.5rem)] lg:max-w-[calc(100vw-260px)] p-5 pt-0 overflow-auto flex relative bg-[radial-gradient(rgb(var(--muted))_2px,transparent_0px)] [background-size:16px_16px]",
        { "select-none": isMouseDown }
      )}
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
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
          {(tasks["TODO"] ||
            tasks["IN_PROGRESS"] ||
            tasks["COMPLETED"] ||
            tasks["CANCELLED"] ||
            tasks["BACKLOG"] ||
            tasks["LOW"] ||
            tasks["MEDIUM"] ||
            tasks["HIGH"] ||
            tasks["URGENT"] ||
            tasks["NONE"]) &&
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
                        user={user}
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
  user,
}: any) => {
  const [open, setOpen] = useState(true);
  return (
    <div ref={provided.innerRef} {...provided.droppableProps}>
      <Collapsible open={open} onOpenChange={setOpen} className="space-y-2">
        <div className={cn("w-[250px] flex flex-col gap-2 pt-5")}>
          <div
            className={`text-sm flex items-center justify-between gap-2 px-5 py-2 bg-muted rounded-t-lg border-t-4 z-[10] sticky top-0 shadow-lg`}
            style={{
              borderColor: TaskStatusColor[stat] || TaskPriorityColor[stat],
            }}
          >
            <div className="flex items-center gap-2">
              <Icon
                size={16}
                color={TaskStatusColor[stat] || TaskPriorityColor[stat]}
              />
              <span>{stat}</span>
              <span className="px-1.5 rounded-full border border-primary bg-background">
                {tasks ? tasks.length : "0"}
              </span>
            </div>
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
          </div>
          <CollapsibleContent className="" style={{ marginTop: 0 }}>
            <div className={cn("flex flex-col gap-2")}>
              {tasks?.map((task: any, index: number) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided: DraggableProvided, snapshot) => (
                    <BoardCard
                      key={task.id}
                      task={task}
                      project={project}
                      snapshot={snapshot}
                      provided={provided}
                      user={user}
                    />
                  )}
                </Draggable>
              ))}
              <div className="h-20 bg-transparent" />
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
      {provided.placeholder}
    </div>
  );
};

const BoardCard = ({ task, project, provided, snapshot, user }: any) => {
  // console.log(provided.draggableProps?.style);
  const [open, setOpen] = useState(false);
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
              <StatusDropdown
                taskId={task.id}
                status={task.status}
                isIcon
                disabled={disabled}
              />
            </p>
            <p className="max-w-[180px] truncate">{task.title}</p>
          </div>
          <div className="flex-1 flex gap-1 justify-end">
            <div onClick={(e) => e.stopPropagation()}>
              <PriorityDropdown
                taskId={task.id}
                priority={task.priority}
                isIcon
                disabled={disabled}
              />
            </div>
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
                team={project.team}
                isIcon
                disabled={
                  user?.role?.name === "member" &&
                  project?.team?.teamLead?.id !== user?.id
                }
              />
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[100vw] md:w-[75vw] max-h-[100vh] md:h-[75vh] flex flex-col gap-0 px-3 md:px-6">
        <DialogHeader className="block text-start h-10">
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
