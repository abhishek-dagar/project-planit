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
import { WholeWordIcon } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TeamValidation } from "@/lib/types/team.type";
import { createTeam } from "@/lib/actions/team.action";
import UserRound from "@/components/icons/user-round";
import UpgradePlanModal from "@/components/common/upgrade-plan-modal";

interface TeamFormProps extends React.HTMLAttributes<HTMLDivElement> {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function TeamForm({ className, setOpen, ...props }: TeamFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [upgradePlanModalOpen, setUpgradePlanModalOpen] =
    useState<boolean>(false);
  const [tier, setTier] = useState();

  const router = useRouter();

  const teamForm: any = useForm({
    resolver: zodResolver(TeamValidation),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof TeamValidation>) {
    setIsLoading(true);

    try {
      const { team, err, tier } = await createTeam(values);

      if (team) {
        toast.success("Team Created");
        setOpen(false);
        router.refresh();
      } else if (tier.name === "free") {
        setTier(tier);
        setUpgradePlanModalOpen(true);
        // toast.error(err);
      } else if (err) {
        toast.error(err);
      } else {
        toast.error("Failed to create team");
      }
    } catch (err) {
      toast.error("Failed to create team");
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
        <UserRound selected size={60} />
      </div>
      <div className={cn("grid gap-6", className)} {...props}>
        <Form {...teamForm}>
          <form onSubmit={teamForm.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <FormField
                control={teamForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Name</FormLabel>
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
                control={teamForm.control}
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
              <Button
                onClick={() => onSubmit(teamForm.getValues())}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <></>
                )}
                Create Team
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
