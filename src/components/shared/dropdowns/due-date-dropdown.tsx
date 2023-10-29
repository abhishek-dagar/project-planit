import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  CalendarDays,
  CalendarIcon,
  ChevronRightIcon,
  XIcon,
} from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

interface Props {
  startDate?: Date;
  dueDate?: Date;
  handleDueDate: (value: unknown) => void;
  openTask?: boolean;
}

const DueDateDropdown = ({
  startDate,
  dueDate,
  handleDueDate,
  openTask,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startDate
      ? new Date(
          moment(startDate).year(),
          moment(startDate).month(),
          moment(startDate).date()
        )
      : undefined,
    to: dueDate
      ? new Date(
          moment(dueDate).year(),
          moment(dueDate).month(),
          moment(dueDate).date()
        )
      : undefined,
  });

  const handleSelect = (value: DateRange | undefined) => {
    setDate(value);
    handleDueDate(moment(value?.to));
  };

  const addToday = () => {
    handleDueDate(moment());
    setDate((prev: any) => {
      return {
        ...prev,
        to: new Date(),
      };
    });
  };
  const addDays = (day: number) => {
    const d = moment().add(day, "days");
    handleDueDate(d);
    setDate((prev: any) => {
      return {
        ...prev,
        to: new Date(moment(d).year(), moment(d).month(), moment(d).date()),
      };
    });
  };

  useEffect(() => {
    setDate({
      from: new Date(
        moment(startDate).year(),
        moment(startDate).month(),
        moment(startDate).date()
      ),
      to: dueDate
        ? new Date(
            moment(dueDate).year(),
            moment(dueDate).month(),
            moment(dueDate).date()
          )
        : undefined,
    });
  }, [startDate, dueDate]);

  return (
    <div className={cn("grid gap-2 w-full")}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <div className="flex justify-center w-full px-4 cursor-pointer">
            <DueDateTrigger
              date={date}
              openTask={openTask}
              setDate={setDate}
              handleDueDate={handleDueDate}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-auto p-0 bg-background border-0"
          align="end"
        >
          <div className="w-full flex p-2 gap-2">
            <div className="flex-1 flex px-3 justify-start items-center gap-2 text-left font-normal">
              <CalendarIcon size={16} />
              {date?.from ? (
                moment(date?.from).format("DD/MM/YYYY")
              ) : (
                <span className="text-muted-foreground">Start Date</span>
              )}
            </div>
            <Separator
              orientation="vertical"
              className="h-[20px] w-[2px] bg-secondary-background"
            />
            <div className="flex-1 flex px-3 justify-start items-center gap-2 text-left font-normal">
              <CalendarIcon size={16} />
              {date?.to ? (
                moment(date?.to).format("DD/MM/YYYY")
              ) : (
                <span className="text-muted-foreground">Due Date</span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col justify-evenly w-[200px] bg-secondary-background rounded-tr-xl px-2 py-5">
              <Button
                className="w-full flex justify-between bg-secondary-background hover:bg-background text-[14px]"
                onClick={addToday}
              >
                <span>Today</span>
                <span className="text-muted-foreground">
                  {moment(new Date()).format("MMM DD")}
                </span>
              </Button>
              <Button
                className="w-full flex justify-between bg-secondary-background hover:bg-background text-[14px]"
                onClick={() => addDays(1)}
              >
                <span>Tomorrow</span>
                <span className="text-muted-foreground">
                  {moment(new Date()).add(1, "days").format("MMM DD")}
                </span>
              </Button>
              <Button
                className="w-full flex justify-between bg-secondary-background hover:bg-background text-[14px]"
                onClick={() => addDays(7)}
              >
                <span>1 Week</span>
                <span className="text-muted-foreground">
                  {moment(new Date()).add(7, "days").format("MMM DD")}
                </span>
              </Button>
              <Button
                className="w-full flex justify-between bg-secondary-background hover:bg-background text-[14px]"
                onClick={() => addDays(14)}
              >
                <span>2 Week</span>
                <span className="text-muted-foreground">
                  {moment(new Date()).add(14, "days").format("MMM DD")}
                </span>
              </Button>
              <Button
                className="w-full flex justify-between bg-secondary-background hover:bg-background text-[14px]"
                onClick={() => addDays(28)}
              >
                <span>1 month</span>
                <span className="text-muted-foreground">
                  {moment(new Date()).add(28, "days").format("MMM DD")}
                </span>
              </Button>
              <Button
                className="w-full flex justify-between bg-secondary-background hover:bg-background text-[14px]"
                onClick={() =>
                  setDate((prev: any) => {
                    handleDueDate(null);
                    return {
                      ...prev,
                      to: undefined,
                    };
                  })
                }
              >
                <span>Clear Due Date</span>
                {/* <span className="text-muted-foreground">
                  {moment(new Date()).add(28, "days").format("MMM DD")}
                </span> */}
              </Button>
            </div>
            <Calendar
              initialFocus
              mode={"range"}
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleSelect}
              numberOfMonths={1}
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const DueDateTrigger = ({ date, openTask, setDate, handleDueDate }: any) => {
  return (
    <div className="w-full flex justify-center">
      {openTask && (
        <div className="flex gap-1 items-center [&:hover_.cancel]:visible">
          {/* <Button
            className="cancel invisible p-0 bg-primary rounded-full h-[12px] w-[12px] flex justify-center items-center"
            onClick={() => {}}
            >
            <XIcon size={10} />
          </Button> */}
          <div className="flex flex-col justify-center">
            <span className="text-muted-foreground text-[12px]">
              Start Date
            </span>
            <span className={`text-muted-foreground`}>
              {moment(date?.from).format("MMM DD")}
            </span>
          </div>
          <ChevronRightIcon className="text-muted-foreground" size={26} />
        </div>
      )}
      {date?.to ? (
        <div className="flex gap-1 items-center [&:hover_.cancel]:visible">
          <Button
            className="cancel invisible p-0 bg-primary rounded-full h-[12px] w-[12px] flex justify-center items-center"
            onClick={() => {
              setDate((prev: any) => {
                handleDueDate(null);
                return {
                  ...prev,
                  to: undefined,
                };
              });
            }}
          >
            <XIcon size={10} />
          </Button>
          <div className="flex flex-col justify-center">
            {openTask && (
              <span className="text-muted-foreground text-[12px]">
                End Date
              </span>
            )}
            <span
              className={`${
                moment(date?.to).isBefore(moment().add(-1, "days"))
                  ? "text-red-500"
                  : moment(date?.to).isBefore(moment())
                  ? "text-orange-500"
                  : "text-green-500"
              }`}
            >
              {moment(date?.to).format("MMM DD")}
            </span>
          </div>
        </div>
      ) : (
        <div
          className={`${
            openTask
              ? "flex items-center justify-center p-2 px-3 border-2 border-dashed border-muted-foreground rounded-full"
              : ""
          }`}
        >
          <CalendarDays
            size={16}
            className={`${openTask ? "" : "mr-2"} h-4 w-4`}
          />
        </div>
      )}
    </div>
  );
};

export default DueDateDropdown;
