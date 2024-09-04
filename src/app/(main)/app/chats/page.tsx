import { currentUser } from "@/lib/helpers/getTokenData";
import { ChatLayout } from "./_components/chat-layout";
import { cookies } from "next/headers";
import { UserType } from "@/lib/types/user.types";

const Chat = async () => {
  const user:UserType |null= await currentUser();
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  return (
    user && (
      <div className="h-[calc(100vh-6.6rem)] md:h-[calc(100vh-3.6rem)] overflow-hidden">
        <ChatLayout user={user} defaultLayout={defaultLayout} navCollapsedSize={8} />
      </div>
    )
  );
};

export default Chat;
