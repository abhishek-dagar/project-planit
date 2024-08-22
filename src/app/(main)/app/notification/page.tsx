"use client";
import { NotificationIcon } from "@/components/icons/notification";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import NotificationTable from "./_components/notification-table";

const Notification = () => {
  const tab = useSearchParams().get("tab") || "unread";

  return (
    <Tabs defaultValue="account" className="relative h-full" value={tab}>
      <div className="flex flex-col gap-4 h-full">
        <div className="sticky top-0 z-[10] py-1 md:py-3 px-6 bg-background/50 backdrop-blur-lg flex items-center justify-between md:justify-normal border-b">
          <h1 className="text-xl md:text-4xl flex items-center">
            <NotificationIcon selected={true} size={30} className="mr-2" />
            Notification
          </h1>
          <Separator
            orientation="vertical"
            className="h-10 hidden md:block ml-3"
          />
          <TabsList className="bg-transparent">
            <TabsTrigger
              value="unread"
              className="[&_.highlighter]:data-[state=active]:visible relative"
            >
              <Link href={"/app/notification?tab=unread"}>Un Read</Link>
              <div className="w-full h-1 bg-primary highlighter absolute invisible -bottom-[25%] md:-bottom-[50%] rounded-full" />
            </TabsTrigger>
            <TabsTrigger
              value="read"
              className="[&_.highlighter]:data-[state=active]:visible relative"
            >
              <Link href={"/app/notification?tab=read"}>Read</Link>
              <div className="w-full h-1 bg-primary highlighter absolute invisible -bottom-[50%] rounded-full" />
            </TabsTrigger>
            <TabsTrigger
              value="all"
              className="[&_.highlighter]:data-[state=active]:visible relative"
            >
              <Link href={"/app/notification?tab=all"}>All</Link>
              <div className="w-full h-1 bg-primary highlighter absolute invisible -bottom-[50%] rounded-full" />
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="unread" className="h-full">
          <NotificationTable read={false} />
        </TabsContent>
        <TabsContent value="read" className="h-full">
          <NotificationTable read />
        </TabsContent>
        <TabsContent value="all" className="h-full">
          <NotificationTable />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default Notification;
