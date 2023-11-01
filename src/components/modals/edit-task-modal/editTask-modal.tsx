import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { DialogClose, DialogContent } from "../../ui/dialog";
import AssigneeDropdown from "../../shared/dropdowns/assignee-dropdown";
import StatusDropdown from "../../shared/dropdowns/status-dropdown";
import {
  TaskPriorityColor,
  TaskStatusColor,
} from "@/lib/interfacesOrEnum/teams-group";
import PriorityDropdown from "../../shared/dropdowns/priority-dropdown";
import { priorities } from "../../tables/tasks/data/data";
import { MoreHorizontalIcon } from "lucide-react";
import { Table } from "@tanstack/react-table";
import DueDateDropdown from "../../shared/dropdowns/due-date-dropdown";
import { Input } from "../../ui/input";
import debounce from "lodash.debounce";
import dynamic from "next/dynamic";
import { updateTask } from "@/lib/actions/task.action";
import useUser from "@/components/custom-hooks/user";
import moment from "moment";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { addNewComment } from "@/lib/actions/comment.action";
import { useToast } from "@/components/ui/use-toast";

const DescriptionEditor = dynamic(() => import("./description-editor"), {
  ssr: false,
});

interface Props {
  task: any;
  table?: Table<any>;
  row?: any;
}

function EditTask({ task, table, row }: Props) {
  const [priority, setPriority] = useState<any>();
  const [taskColor, setTaskColor] = useState("");
  const [priorityColor, setPriorityColor] = useState("");
  const [title, setTitle] = useState<string>("");
  const [comments, setComments] = useState<any>([]);
  // const description: string = task.description;
  const { toast } = useToast();
  const commentEndRef = useRef<null | HTMLDivElement>(null);

  const request = debounce(async (value: string, columnId: string) => {
    if (table && columnId !== "description") {
      table.options.meta?.updateData(row.index, columnId, value);
      return;
    } else {
      const data = JSON.parse(JSON.stringify(task));
      task[columnId] = value;
      await updateTask({
        ...data,
      });
    }
  }, 1000);

  const debounceRequest = useCallback(
    (columnId: string, value: string) => request(value, columnId),
    []
  );

  const handleTask = (value: any) => {
    if (table) {
      table.options.meta?.updateData(row.index, "status", value);
      return;
    }
  };

  const handleDescription = (value: any) => {
    debounceRequest("description", value);
  };

  const handlePriority = (value: any) => {
    if (table) {
      table.options.meta?.updateData(row.index, "priority", value);
      return;
    }
  };
  const handleAssignee = (value: any) => {
    if (table) {
      table.options.meta?.updateData(row.index, "assignedTo", value);
      return;
    }
  };
  const handleTitle = (value: any) => {
    setTitle(value.target.value);
    debounceRequest("title", value.target.value);
  };
  const handleDueDate = (value: any) => {
    if (table) {
      table.options.meta?.updateData(row.index, "dueDate", value);
      return;
    }
  };

  const addComment = async (value: any) => {
    task.comments.push(value);
    value["taskId"] = task.id;

    const response = await addNewComment(value);
    if (response.response.success) {
      toast({
        description: "Comment added",
      });
    }
  };

  useEffect(() => {
    setTitle(task.title);
    let tempComments = [...task.comments];
    tempComments = tempComments.reverse();

    setComments(tempComments);

    type TaskStatusColorStrings = keyof typeof TaskStatusColor;
    const currStatus: TaskStatusColorStrings = task.status;

    setTaskColor(TaskStatusColor[currStatus]);
    const tempP = priorities.find(
      (priority) => priority.value.toUpperCase() === task.priority
    );

    setPriority(tempP);
    type TaskPriorityColorStrings = keyof typeof TaskPriorityColor;
    const currPriority: TaskPriorityColorStrings = task.priority;

    setPriorityColor(TaskPriorityColor[currPriority]);
  }, [task]);

  const scrollToBottom = () => {
    commentEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  return (
    <div className="h-full">
      <div className="h-[10%] rounded-t-lg w-full bg-secondary-background flex justify-between items-center px-4">
        <div className="border-2 rounded-md bg-background px-3">
          <span className="text-[14px]">{task?.title}</span>
        </div>
        <div>
          <div>
            <DialogClose className="relative h-8 w-8 bg-background border-2 rounded-md flex justify-center items-center hover:text-primary" />
          </div>
        </div>
      </div>
      <div className="h-[90%]">
        <div className="h-[10%] border-y-2">
          <div className="w-full h-full flex">
            <div className="flex-1 px-4 py-1 flex items-center justify-between">
              <div className="flex-1 px-4 py-1 flex items-center ">
                <div className="py-2">
                  <StatusDropdown
                    color={taskColor}
                    label={task.status}
                    handleChangeStatus={handleTask}
                    className="px-4 text-[20px] font-bold"
                  />
                </div>
                <div className="h-full flex items-center">
                  <AssigneeDropdown
                    assignedTo={task.assignedTo}
                    updateAssignee={handleAssignee}
                    isAvatar
                    className=" w-[30px] h-[30px]"
                  />
                </div>
                <div
                  className="p-1 py-1.5 rounded-full border border-muted-foreground"
                  style={{ borderColor: priorityColor }}
                >
                  <PriorityDropdown
                    color={priorityColor}
                    value={task.priority}
                    Icon={priority?.icon}
                    handleChangePriority={handlePriority}
                    className="p-0"
                  />
                </div>
              </div>
              {/* <div>
                  <MoreHorizontalIcon />
                </div> */}
            </div>
            <div className="flex-1 px-4 py-1 border-l-2 flex items-center">
              <div>
                <DueDateDropdown
                  startDate={task.createdAt}
                  dueDate={task.dueDate}
                  handleDueDate={handleDueDate}
                  openTask
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[90%]">
          <div className="w-full h-full flex overflow-hidden">
            <div className="w-1/2 max-h-[500px] px-4 py-1 overflow-auto">
              <div>
                <Title title={title} handleTitle={handleTitle} />
              </div>
              <Suspense fallback={<>Loading</>}>
                <DescriptionEditor
                  data={task.description}
                  onChange={handleDescription}
                />
              </Suspense>
            </div>
            <div className="w-1/2 flex flex-col justify-between border-l-2 bg-secondary-background">
              <div className="max-h-[390px] overflow-auto flex flex-col-reverse gap-4 px-4 py-6">
                {comments.map((comment: any, index: number) => (
                  <Comment key={index} comment={comment} />
                ))}
                {/* <div ref={commentEndRef} className="mb-2" /> */}
              </div>
              <TextareaForm addComment={addComment} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TitleProps {
  title: string;
  handleTitle: (value: any) => void;
}

const Title = ({ title, handleTitle }: TitleProps) => {
  return (
    <div>
      <Input
        value={title}
        onChange={handleTitle}
        className="focus-visible:bg-secondary-background"
      />
    </div>
  );
};

interface CommentProps {
  comment: any;
}

const Comment = ({ comment }: CommentProps) => {
  const [user] = useUser({});

  return (
    <div className="w-full flex justify-between text-[14px] gap-4 text-muted-foreground">
      <div className="flex gap-1">
        <span className="capitalize text-primary">
          {comment.changedBy?.id === user?.id
            ? "You"
            : comment.changedBy?.username}
        </span>
        <div>
          <span>{comment.comment}</span>
          {comment.from && (
            <>
              <span> from </span>
              <span className="text-foreground"> {comment.from}</span>
            </>
          )}
          {comment.to &&
            (moment(comment.to).isValid() ? (
              <span className="text-foreground">
                {" "}
                {moment(comment.at).format("MMM DD")}
              </span>
            ) : (
              <>
                <span> to </span>
                <span className="text-foreground">{comment.to}</span>
              </>
            ))}
        </div>
      </div>
      <span className="text-[12px]">
        {moment(comment.createdAt).format("MMM DD")} at{" "}
        {moment(comment.createdAt).format("hh:mm a")}
      </span>
    </div>
  );
};

const FormSchema = z.object({
  comment: z
    .string()
    .min(0, {
      message: "Bio must be at least 1 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
});

export function TextareaForm({ addComment }: any) {
  const [user] = useUser({});
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comment: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const newData = JSON.parse(JSON.stringify(data));
    newData["changedBy"] = user;
    newData["createdAt"] = moment();
    addComment(newData);
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`w-full bg-background ${
          form.getValues("comment").length > 0
            ? "[&_>_div]:flex"
            : "[&:has(_>_div_>_textarea:focus-visible)_>_div]:flex "
        }`}
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="border-b-2">
              <FormControl>
                <Textarea
                  className="my-0 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none border-0 rounded-none "
                  placeholder="Write your comment here"
                  rows={2}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="btn-section hidden justify-end py-3 px-4 mt-0">
          <Button type="submit">COMMENT</Button>
        </div>
      </form>
    </Form>
  );
}

export default EditTask;
