import { Input } from "@/components/ui/input";
import React, { useCallback, useEffect, useState } from "react";
import {
  DragHandleButton,
  SideMenu,
  SideMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "./editor.css";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "next-themes";
import PriorityDropdown from "./priority-dropdown";
import StatusDropdown from "./status-dropdown";
import { CalendarForm } from "./calender-dropdown";
import AssigneeDropdown from "./assignee-dropdown";
import debounce from "lodash.debounce";
import { deleteTask, updateTask } from "@/lib/actions/task.action";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import DeleteConfirmModal from "@/components/common/delete-confirm-modal";
import { getRefresh } from "@/lib/helpers/getRefersh";

interface Props {
  project: any;
  task: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditTaskModal = ({ task, project, setOpen }: Props) => {
  const [title, setTitle] = useState(task?.title);
  const [description, setDescription] = useState(task?.description);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const { deletedTask } = await deleteTask(task.id);
      if (deletedTask) {
        setOpen(false);
        router.push(getRefresh(searchParams.get("refresh")));
        return { success: "Task deleted Successfully" };
      }
      return { err: "Failed to delete task1" };
    } catch {
      return { err: "Failed to delete task" };
    }
  };

  const request = debounce(async (value: string, columnId: string) => {
    if (columnId === "description") {
      const { updatedTask } = await updateTask(task.id, { description: value });
      if (!updatedTask) {
        toast.error(
          "Failed to update the description reload page and try again"
        );
      }
      router.push(getRefresh(searchParams.get("refresh")));
      return;
    } else if (columnId === "title") {
      const { updatedTask } = await updateTask(task.id, { title: value });
      if (!updatedTask) {
        toast.error("Failed to update the title reload page and try again");
        return;
      }
      router.push(getRefresh(searchParams.get("refresh")));
    }
  }, 1000);

  const debounceRequest = useCallback(
    (columnId: string, value: string) => request(value, columnId),
    []
  );

  const onChangeDesc = (value: string) => {
    setDescription(value);
    debounceRequest("description", value);
  };

  useEffect(() => {
    setTitle(task?.title);
  }, [task?.title]);
  useEffect(() => {
    setDescription(task?.description);
  }, [task?.description]);

  return (
    <div className="flex-1 flex flex-col">
      <Input
        placeholder="Task title"
        className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-0 font-semibold text-xl"
        value={title}
        autoFocus
        onChange={(e) => {
          setTitle(e.target.value);
          debounceRequest("title", e.target.value);
        }}
      />
      <DescriptionEditor onChange={onChangeDesc} data={description} />
      <div className="flex flex-1 flex-col justify-end">
        <div className="flex items-center justify-between">
          <div>
            <PriorityDropdown taskId={task.id} priority={task.priority} />
            <StatusDropdown taskId={task.id} status={task.status} />
            <CalendarForm
              taskId={task.id}
              dueDate={task.dueDate}
              createdAt={task.createdAt}
              status={task.status}
            />
            <AssigneeDropdown
              taskId={task.id}
              assignee={task.assignee}
              team={project.team}
            />
          </div>
          <div>
            <DeleteConfirmModal onConfirm={handleDelete} />
          </div>
        </div>
      </div>
    </div>
  );
};

async function uploadFile(file: File) {
  const body = new FormData();
  body.append("file", file);

  const ret = await fetch("https://tmpfiles.org/api/v1/upload", {
    method: "POST",
    body: body,
  });
  return (await ret.json()).data.url.replace(
    "tmpfiles.org/",
    "tmpfiles.org/dl/"
  );
}
function DescriptionEditor({ data, onChange, holder }: any) {
  const { theme } = useTheme();
  const editor = useCreateBlockNote({
    initialContent: data ? JSON.parse(data) : undefined,
    uploadFile,
  });
  return (
    editor && (
      <ScrollArea className="h-[300px] w-full overflow-auto">
        <BlockNoteView
          editor={editor}
          theme={theme?.includes("dark") ? "dark" : "light"}
          data-theming-css-variables-demo
          onChange={() => onChange(JSON.stringify(editor.document, null, 2))}
        >
          <SideMenuController
            sideMenu={(props) => (
              <SideMenu {...props}>
                {/* Button which removes the hovered block. */}
                <div className="hidden" />
                <DragHandleButton {...props} />
              </SideMenu>
            )}
          />
        </BlockNoteView>
      </ScrollArea>
    )
  );
}

export default EditTaskModal;
