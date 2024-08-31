"use client";

import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import ChatSideBar from "./chat-side-bar";
import ChatSection from "./chat-section";
import { useMediaQuery } from "@/components/custom-hooks/media-query";
import { useRouter, useSearchParams } from "next/navigation";
import { UserType } from "@/lib/types/user.types";
import { fetchUserProfile } from "@/lib/actions/user.action";

interface ChatLayoutProps {
  user: UserType;
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function ChatLayout({
  user,
  defaultLayout = [20, 80],
  defaultCollapsed = false,
  navCollapsedSize,
}: ChatLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isRefetch, setIsRefetch] = useState(true);

  const [chatUser, setChatUser] = useState<UserType>();
  const isMobile = useMediaQuery("(max-width: 430px)");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getChatUser = async () => {
      setIsChatLoading(true);
      if (searchParams.get("chatId") === null) {
        setChatUser(undefined);
        setIsChatLoading(false);
        router.push(`/app/chats`);
      } else {
        const response = await fetchUserProfile(searchParams.get("chatId")!);
        setIsChatLoading(false);
        if (response.user) {
          setChatUser(response.user);
        } else {
          setChatUser(undefined);
          router.push(`/app/chats`);
        }
      }
    };
    getChatUser();
  }, [searchParams, searchParams.get("chatId")]);

  return (
    <>
      {isMobile ? (
        !chatUser ? (
          <ChatSideBar
            isCollapsed={isCollapsed}
            isRefetch={isRefetch}
            setIsRefetch={setIsRefetch}
            user={user}
          />
        ) : (
          !isChatLoading && (
            <ChatSection
              setIsRefetch={setIsRefetch}
              user={user}
              chatUser={chatUser}
            />
          )
        )
      ) : (
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={(sizes: number[]) => {
            document.cookie = `react-resizable-panels:layout=${JSON.stringify(
              sizes
            )}`;
          }}
          className="h-full items-stretch"
        >
          <ResizablePanel
            defaultSize={defaultLayout[0]}
            collapsedSize={navCollapsedSize}
            collapsible={true}
            minSize={isMobile ? 0 : 15}
            maxSize={isMobile ? navCollapsedSize : 30}
            onCollapse={() => {
              setIsCollapsed(true);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                true
              )}`;
            }}
            onExpand={() => {
              setIsCollapsed(false);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                false
              )}`;
            }}
            className={cn(
              isCollapsed &&
                "min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out"
            )}
          >
            <ChatSideBar
              isCollapsed={isCollapsed}
              user={user}
              isRefetch={isRefetch}
              setIsRefetch={setIsRefetch}
              //   isCollapsed={isCollapsed || isMobile}
              //   chats={userData.map((user) => ({
              //     name: user.name,
              //     messages: user.messages ?? [],
              //     avatar: user.avatar,
              //     variant: selectedUser.name === user.name ? "secondary" : "ghost",
              //   }))}
              //   isMobile={isMobile}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
            {!isChatLoading && (
              <ChatSection
                setIsRefetch={setIsRefetch}
                user={user}
                chatUser={chatUser}
              />
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
    </>
  );
}
