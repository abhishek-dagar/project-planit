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
import { useRouter } from "next/navigation";
import Link from "next/link";
import { WholeWordIcon } from "lucide-react";
import { toast } from "sonner";
import { workspaceValidation } from "@/lib/types/workspace.type";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { createWorkspace } from "@/lib/actions/workspace.action";
import UpgradePlanModal from "@/components/common/upgrade-plan-modal";

interface WorkspaceProps extends React.HTMLAttributes<HTMLDivElement> {}

export function WorkspaceForm({ className, ...props }: WorkspaceProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [upgradePlanModalOpen, setUpgradePlanModalOpen] =
    useState<boolean>(false);
  const [tier, setTier] = useState();

  const router = useRouter();

  const workspaceForm: any = useForm({
    resolver: zodResolver(workspaceValidation),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof workspaceValidation>) {
    setIsLoading(true);

    try {
      const { workspace, err, tier } = await createWorkspace(values);
      if (workspace) {
        toast.success("Workspace Created");
        router.push("/app/dashboard");
      } else if (tier.name === "free") {
        setTier(tier);
        setUpgradePlanModalOpen(true);
        // toast.error(err);
      } else if (err) {
        toast.error(err);
      } else {
        toast.error("Failed to create workspace");
      }
    } catch (err) {
      toast.error("Failed to create workspace");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <UpgradePlanModal
        preOpen={upgradePlanModalOpen}
        setPreOpen={setUpgradePlanModalOpen}
        tier={tier}
      />
      <div className="w-full flex justify-center">
        <Avatar className="h-20 w-20 rounded-xl">
          <AvatarFallback className="rounded-xl capitalize text-2xl">
            {workspaceForm.getValues("name").split("")[0] || "W"}
          </AvatarFallback>
        </Avatar>
      </div>
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
                Create Workspace
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
