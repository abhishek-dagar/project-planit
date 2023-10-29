"use client";
import { Metadata } from "next";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import tas from "./data/tasks.json";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KanbanSquare, Table } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UpgradeCard from "@/components/cards/upgrade-card";
import useUser from "@/components/custom-hooks/user";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

export default function TaskPage({
  tasks,
  project,
}: {
  tasks: any;
  project: any;
}) {
  const [user] = useUser({});
  return (
    // <div className="overflow-y-auto overflow-x-hidden mb-5">
    <div className="h-full flex-col space-y-8 md:flex">
      <div className="flex items-center justify-between px-4 md:px-8 space-y-2">
        <div>
          {/* <h2 className="text-2xl font-bold tracking-tight uppercase">
            {project?.name}
          </h2> */}
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks
          </p>
        </div>
      </div>
      <Dialog>
        <Tabs defaultValue="table" style={{ marginTop: 0 }}>
          <div className="flex flex-col gap-4 px-4 md:px-8 pt-0 md:pt-0">
            <div className="flex md:justify-between md:items-end border-b-2 flex-col-reverse md:flex-row border-y-2">
              <div className="">
                <TabsList className="grid w-full grid-cols-2 bg-background">
                  <TabsTrigger
                    value="table"
                    className="data-[state=active]:bg-background data-[state=active]:text-white rounded-none border-b-2 data-[state=active]:border-primary"
                  >
                    <Table size={18} className="mr-2" />
                    Table
                  </TabsTrigger>
                  {!user || user?.currentPlan.title === "free" ? (
                    <DialogTrigger>
                      <div className="flex items-center py-1.5 px-3">
                        <KanbanSquare size={18} className="mr-2" />
                        <span>Board</span>
                      </div>
                    </DialogTrigger>
                  ) : (
                    <TabsTrigger
                      value="board"
                      className="data-[state=active]:bg-background data-[state=active]:text-white rounded-none border-b-2 data-[state=active]:border-primary"
                    >
                      <KanbanSquare size={18} className="mr-2" />
                      Board
                    </TabsTrigger>
                  )}
                </TabsList>
              </div>
            </div>
          </div>
          <div
            className={`overflow-y-auto h-[calc(100vh-250px)] md:h-[calc(100vh-200px)] overflow-x-hidden px-8 pb-2 relative`}
          >
            <TabsContent value="table">
              <DataTable
                data={tasks}
                columns={columns}
                projectId={project.id}
              />
            </TabsContent>
            <TabsContent value="board">
              <div className="h-[660px] bg-secondary-background flex items-center justify-center rounded-md">
                <div className="bg-background/80 backdrop-blur-sm">
                  Board View coming soon....
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
        <DialogContent className="max-w-[22rem] h-1/2 bg-secondary-background">
          <UpgradeCard reason="Can't use Board view. To use it upgrade your plan to Pro or higher" />
        </DialogContent>
      </Dialog>
    </div>
    // </div>
  );
}
