"use client";

import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { updateTask } from "@/lib/actions/task.action";
import { useRouter, useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { getRefresh } from "@/lib/helpers/getRefersh";

interface Props {
  taskId: string;
  dueDate: Date;
  createdAt: Date;
  disabled?: boolean;
  status?: string;
}

const customButtons = [
  {
    label: "Today",
    days: 0,
  },
  {
    label: "Tomorrow",
    days: 1,
  },
  {
    label: "Next 7 Days",
    days: 7,
  },
  {
    label: "Next 15 Days",
    days: 15,
  },
  {
    label: "Next 30 Days",
    days: 30,
  },
];

export function CalendarForm({
  taskId,
  createdAt,
  dueDate,
  disabled,
  status,
}: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(dueDate);
  const [open, setOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleOpen = (value: boolean) => {
    if (disabled) {
      toast.error("You are not authorized to perform this action", {
        description: "Only the team lead or manager can change the due date",
      });
      return;
    }
    setOpen(value);
  };

  const addDays = (day: number) => {
    const d: Date = moment().add(day, "days").toDate();
    handleDateChange(d);
    setSelectedDate(d);
  };

  useEffect(() => {
    setSelectedDate(dueDate);
  }, [dueDate]);

  const handleDateChange = async (date: Date | undefined) => {
    try {
      setSelectedDate(date);
      setOpen(false);
      const { updatedTask } = await updateTask(taskId, {
        dueDate: date ? date : null,
      });
      if (updatedTask) {
        toast.success("Task updated successfully");
        router.push(getRefresh(searchParams.get("refresh")));
      } else {
        toast.error("Failed to change dueDate");
      }
    } catch {
      toast.success("failed to change due date");
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "h-6 w-6 p-0.5 text-left font-normal min-w-[70px]",
            !selectedDate ? "text-muted-foreground" : "w-auto",
            `${
              !selectedDate
                ? "text-muted-foreground"
                : status === "COMPLETED"
                ? "text-green-500 hover:text-green-300"
                : moment(selectedDate).isBefore(moment().add(-1, "days"))
                ? "text-red-500 hover:text-red-300"
                : moment(selectedDate).isBefore(moment())
                ? "text-orange-500 hover:text-orange-300"
                : "text-green-500 hover:text-green-300"
            }`
          )}
        >
          {selectedDate ? (
            moment(selectedDate).format("MMM DD")
          ) : (
            <CalendarIcon size={16} className="opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-muted" align="end">
        <div className="w-full flex p-2 gap-2">
          <div className="flex-1 flex px-3 justify-start items-center gap-2 text-left font-normal">
            <CalendarIcon size={16} />
            {createdAt ? (
              moment(createdAt).format("DD/MM/YYYY")
            ) : (
              <span className="text-muted-foreground">Start Date</span>
            )}
          </div>
          <Separator orientation="vertical" className="h-[20px] w-[2px]" />
          <div className="flex-1 flex px-3 justify-start items-center gap-2 text-left font-normal">
            <CalendarIcon size={16} />
            {dueDate ? (
              moment(dueDate).format("DD/MM/YYYY")
            ) : (
              <span className="text-muted-foreground">Due Date</span>
            )}
          </div>
        </div>
        <div className="flex justify-center gap-2">
          <div className="hidden md:flex flex-col justify-evenly md:w-[200px] bg-background rounded-tr-xl px-2 py-5">
            {customButtons.map((btn) => (
              <Button
                key={btn.label}
                className="w-full flex justify-between bg-transparent hover:bg-muted text-xs md:text-[14px]"
                onClick={() => addDays(btn.days)}
              >
                <span className="text-foreground">{btn.label}</span>
                <span className="text-muted-foreground">
                  {moment(new Date()).add(btn.days, "days").format("MMM DD")}
                </span>
              </Button>
            ))}
            <Button
              className="w-full flex justify-between bg-transparent hover:bg-muted text-[14px]"
              onClick={() => handleDateChange(undefined)}
            >
              <span className="text-foreground">Clear Due Date</span>
            </Button>
          </div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateChange}
            disabled={(date: any) => date < new Date("1900-01-01")}
            initialFocus
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
