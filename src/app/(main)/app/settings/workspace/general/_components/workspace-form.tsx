"use client";

import React, { useEffect, useState } from "react";

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
import { useRouter } from "next/navigation";
import { WholeWordIcon } from "lucide-react";
import { toast } from "sonner";
import { workspaceValidation } from "@/lib/types/workspace.type";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  createWorkspace,
  updateWorkspace,
} from "@/lib/actions/workspace.action";

interface WorkspaceProps extends React.HTMLAttributes<HTMLDivElement> {
  workspace: any;
}

export function WorkspaceForm({
  className,
  workspace,
  ...props
}: WorkspaceProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const workspaceForm: any = useForm({
    resolver: zodResolver(workspaceValidation),
    defaultValues: {
      name: workspace.name || "",
      description: workspace.description || "",
    },
  });

  useEffect(() => {
    workspaceForm.reset({
      name: workspace.name || "",
      description: workspace.description || "",
    });
  }, [workspace]);

  async function onSubmit(values: z.infer<typeof workspaceValidation>) {
    setIsLoading(true);

    try {
      const updatedWorkspace = await updateWorkspace({
        ...values,
        id: workspace?.id,
      });
      if (updatedWorkspace.workspace) {
        toast.success("Workspace updated");
        router.refresh();
      } else {
        toast.error("Failed to update workspace1");
      }
    } catch (err) {
      toast.error("Failed to update workspace");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...workspaceForm}>
        <form onSubmit={workspaceForm.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={workspaceForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="none"
                      autoCorrect="off"
                      frontIcon={
                        <WholeWordIcon
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
            <FormField
              control={workspaceForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="description"
                      rows={3}
                      disabled={isLoading}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading}>
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <></>
              )}
              Update Workspace
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
