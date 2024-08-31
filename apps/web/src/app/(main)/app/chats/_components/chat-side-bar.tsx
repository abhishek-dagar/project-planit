import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { fetchInitialContactWithMessages } from "@/lib/actions/chat.action";
import { ChatType } from "@/lib/types/chat.type";
import { UserType } from "@/lib/types/user.types";
import { cn } from "@/lib/utils";
import moment from "moment";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FindChatMemberModal from "./find-chat-member-modal";
import { pusherClient } from "@/lib/pusher";
import UserAvatar from "@/components/common/user-avatar";

interface ChatSideBarProps {
  user: UserType;
  isRefetch: boolean;
  isCollapsed: boolean;
  setIsRefetch: (value: boolean) => void;
}
const ChatSideBar = ({
  user,
  isRefetch,
  isCollapsed,
  setIsRefetch,
}: ChatSideBarProps) => {
  const [chats, setChats] = useState<ChatType[]>([]);
  const searchParams = useSearchParams();
  const getChats = async () => {
    if (user && isRefetch) {
      const response = await fetchInitialContactWithMessages(user?.id);
      if (!response.err) setChats(response.chats);
    }
    setIsRefetch(false);
  };
  useEffect(() => {
    getChats();
  }, [user, isRefetch, isCollapsed]);

  useEffect(() => {
    setIsRefetch(true);
  }, []);

  useEffect(() => {
    if (user) {
      const channel = pusherClient.subscribe(user.id);

      const handleMessage = () => {
        setIsRefetch(true);
      };

      channel.bind("message", handleMessage);

      return () => {
        channel.unbind("message", handleMessage);
        pusherClient.unsubscribe("chat");
      };
    }
  }, [user]);

  return (
    <div className="h-full relative">
      <div
        className={cn(
          "h-14 py-2 px-4 bg-background border-b flex items-center justify-between",
          { "justify-center": isCollapsed }
        )}
      >
        <p className={cn("text-lg font-bold", { hidden: isCollapsed })}>
          Chats
        </p>
        <div>
          <FindChatMemberModal user={user} />
        </div>
      </div>
      <div
        className={cn(`overflow-auto px-5 py-2 flex flex-col gap-2`, {
          "px-2": isCollapsed,
        })}
        style={{ height: `calc(100% - 3.5rem)` }}
        // ref={messageContainerRef}
      >
        {chats?.map((chat: ChatType) => {
          const currentChatUser = chat.toId === user?.id ? chat.from : chat.to;
          return (
            <Link
              key={chat.id}
              href={`/app/chats?chatId=${
                chat.toId === user?.id ? chat.fromId : chat.toId
              }`}
              className={cn(
                "p-2 rounded-md hover:bg-muted/40",
                {
                  "bg-primary/50 hover:bg-primary/70":
                    searchParams.get("chatId") === currentChatUser?.id,
                },
                {}
              )}
            >
              <div
                className={cn("flex items-center gap-2", {
                  "justify-center": isCollapsed,
                })}
              >
                <UserAvatar
                  text={
                    currentChatUser?.name
                      ? currentChatUser?.name[0]
                      : currentChatUser?.email[0]
                  }
                  id={currentChatUser?.id}
                />
                {!isCollapsed && (
                  <div className="flex w-full flex-col">
                    <p className="h-full flex-1 flex justify-between items-center">
                      <span className="font-bold">{currentChatUser?.name}</span>
                      <span className="text-xs">
                        {moment(chat.createdAt).format("h:mm A")}
                      </span>
                    </p>
                    <span className="max-w-[30px] text-sm text-muted-foreground truncate">
                      {chat.message} asdadasd
                    </span>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ChatSideBar;
