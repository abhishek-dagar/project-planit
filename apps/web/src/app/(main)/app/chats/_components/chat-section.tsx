"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { fetchChats, sendMessage } from "@/lib/actions/chat.action";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { ArrowLeftIcon, SendHorizontalIcon } from "lucide-react";
import { UserType } from "@/lib/types/user.types";
import { ChatType, MessageStatus } from "@/lib/types/chat.type";
import Logo from "@/components/icons/logo";
import UserAvatar from "@/components/common/user-avatar";
import { useSocket } from "@/context/SocketProvider";
import Link from "next/link";

interface Props {
  user: UserType;
  chatUser: UserType | undefined;
  setIsRefetch: (value: boolean) => void;
}
const ChatSection = ({ user, chatUser, setIsRefetch }: Props) => {
  const [messages, setMessages] = useState<ChatType[]>([]);
  const [barHeight, setBarHeight] = useState(56);
  const [message, setMessage] = useState("");
  const messageBar = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { socket } = useSocket();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (chatUser && message.trim()) {
      if (socket) {
        setIsRefetch(true);
        const newMessage: ChatType = {
          message: message,
          fromId: user?.id,
          toId: chatUser.id,
          status: MessageStatus.SENT,
        };
        setMessages((prev) => [
          ...prev,
          { ...newMessage, createdAt: moment().toDate() },
        ]);
        setMessage("");
        const response = await sendMessage(newMessage);
        if (response.success) {
          socket.emit("event:message", response.message);
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  useEffect(() => {
    const getChats = async () => {
      if (user && chatUser) {
        const response = await fetchChats(user.id, chatUser?.id);
        setMessages(response.chats);
      }
    };
    getChats();
  }, [user, chatUser]);

  // not using pusher anymore
  // useEffect(() => {
  //   if (user && chatUser) {
  //     const channel = pusherClient.subscribe(user.id);

  //     const handleMessage = (data: any) => {
  //       // if sender is same as user than ignore updating the messages or if sender is not same as chatUser
  //       if (data.fromId === user?.id || data.fromId !== chatUser.id) return;
  //       setMessages((prev) => [...prev, data]);
  //     };

  //     channel.bind("message", handleMessage);

  //     return () => {
  //       channel.unbind("message", handleMessage);
  //       pusherClient.unsubscribe("chat");
  //     };
  //   }
  // }, [user, chatUser]);

  const onMessageRec = (data: any) => {
    if (user && chatUser) {
      if (data.fromId === chatUser.id && data.toId === user?.id) {
        setMessages((prev) => [...prev, data]);
      }
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("message", onMessageRec);
      return () => {
        socket.off("message", onMessageRec);
      };
    }
  }, [user, chatUser, socket]);

  useEffect(() => {
    // console.log("messageBar:", messageBar.current?.offsetHeight);
    setBarHeight(messageBar.current?.clientHeight || 56);
  }, [messageBar.current, messageBar.current?.offsetHeight]);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (chatUser) {
      setMessages([]);
    } else {
      setMessages([]);
    }
  }, [chatUser]);

  return chatUser ? (
    <div className="h-full relative">
      <div className="h-14 py-2 px-4 bg-background border-b flex items-center gap-4">
        <Link href="/app/chats" className="block md:hidden">
          <ArrowLeftIcon />
        </Link>
        <UserAvatar
          text={chatUser.name ? chatUser.name[0] : ""}
          id={chatUser.id}
          isLarge
        />
        <p className="text-lg font-bold capitalize flex flex-col">
          <span>{chatUser.name}</span>
          {/* <span className="text-xs font-light text-muted-foreground">{chatUser.isOnline ? " Online" : " Offline"}</span> */}
        </p>
      </div>
      <div
        className={cn(`overflow-auto px-5 py-2 flex flex-col gap-2`)}
        style={{ height: `calc(100% - ${barHeight}px - 3.5rem)` }}
        ref={messageContainerRef}
      >
        {messages.map(({ message, fromId, createdAt }, i) => (
          <div
            key={i}
            className={cn("flex justify-start", {
              "justify-end": fromId === user?.id,
            })}
          >
            <p
              className={cn(
                "whitespace-pre-wrap max-w-[70%] bg-muted rounded-md px-2 py-1 relative before:content-[''] before:border-[5px] before:absolute flex flex-col items-start",
                {
                  "bg-primary text-white before:border-t-primary before:border-b-transparent before:border-l-primary before:border-r-transparent before:top-0 before:-right-[5px]":
                    fromId === user?.id,
                },
                {
                  "before:border-t-muted before:border-b-transparent before:border-l-transparent before:border-r-muted before:top-0 before:-left-[5px]":
                    fromId !== user?.id,
                }
              )}
            >
              <span
                className={cn("pr-4", {
                  "pr-10": message.length < 20 && fromId === user?.id,
                })}
              >
                {message}
              </span>
              <span className="text-xs text-muted-foreground w-full text-end">
                {moment(createdAt).format("hh:mm A")}
              </span>
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <div className="flex gap-2 py-2 bg-background px-4" ref={messageBar}>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            onKeyDown={handleKeyDown}
            className="w-full min-h-0 max-h-14 focus:ring-0 resize-none"
            rows={1}
          />
          <Button type="submit" className="text-sm gap-2">
            Send
            <SendHorizontalIcon size={14} />
          </Button>
        </div>
      </form>
    </div>
  ) : (
    <div className="flex flex-col gap-4 justify-center items-center h-full w-full">
      <Logo isSmall className="md:text-7xl" />
      <p className="flex flex-col gap-2 justify-center items-center">
        <span className="text-lg text-muted-foreground">
          Connect to your team members
        </span>
        <span className="text-sm text-muted-foreground">Select a Chat</span>
        <span className="text-sm text-muted-foreground">or</span>
        <span className="text-sm text-muted-foreground">Start New one</span>
      </p>
    </div>
  );
};

export default ChatSection;
