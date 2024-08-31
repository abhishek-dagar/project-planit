import Chat from "@/components/icons/chat";
import Home from "@/components/icons/home";
import Notification from "@/components/icons/notification";
import Rocket from "@/components/icons/rocket";
import Team from "@/components/icons/team";

export const menuOptions = [
  { name: "Dashboard", Component: Home, href: "/app/dashboard" },
  { name: "Notification", Component: Notification, href: "/app/notification" },
  { name: "Projects", Component: Rocket, href: "/app/projects" },
  { name: "Teams", Component: Team, href: "/app/teams" },
  { name: "Chat", Component: Chat, href: "/app/chats" },
];
