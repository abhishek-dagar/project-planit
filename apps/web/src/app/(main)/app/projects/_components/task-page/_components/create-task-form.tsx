"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { ListTodoIcon, WholeWordIcon } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { createTeam } from "@/lib/actions/team.action";
import { TaskCreateValidation } from "@/lib/types/task.type";
import { createTask } from "@/lib/actions/task.action";
import { getRefresh } from "@/lib/helpers/getRefersh";

interface TaskFormProps extends React.HTMLAttributes<HTMLDivElement> {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function TaskForm({ className, setOpen, ...props }: TaskFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const router = useRouter();

  const taskForm: any = useForm({
    resolver: zodResolver(TaskCreateValidation),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof TaskCreateValidation>) {
    setIsLoading(true);

    try {
      const { newTask, err } = await createTask({
        ...values,
        description: "",
        projectId: searchParams.get("projectId"),
      });
      if (newTask) {
        toast.success("Task Created");
        setOpen(false);
        router.push(getRefresh(searchParams.get("refresh")));
      } else {
        toast.error(err);
      }
    } catch (err) {
      console.log(err);

      toast.error("Failed to create Task");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className={cn("grid gap-6", className)} {...props}>
        <Form {...taskForm}>
          <form onSubmit={taskForm.handleSubmit(onSubmit)}>
            <div className="flex items-end gap-2">
              <FormField
                control={taskForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="sr-only">Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="title"
                        type="text"
                        autoCapitalize="none"
                        autoComplete="none"
                        autoCorrect="off"
                        frontIcon={
                          <ListTodoIcon
                            size={14}
                            className="text-muted-foreground"
                          />
                        }
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                onClick={() => onSubmit(taskForm.getValues())}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <></>
                )}
                Create
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
