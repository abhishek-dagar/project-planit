import { Icons } from "@/components/icons";
import {
  BellIcon,
  CheckSquare,
  Group,
  LayoutDashboard,
  Search,
} from "lucide-react";

const homeMenu = [
  { title: "Home", link: "/" },
  { title: "Pricing", link: "/pricing" },
  { title: "About", link: "/about" },
  // { title: "Features", link: "/features" },
];

const appSideMenu = [
  { title: "Dashboard", link: "/app/dashboard", icon: LayoutDashboard },
  { title: "Search", link: "", icon: Search },
  { title: "Notification", link: "/app/notifications", icon: BellIcon },
  { title: "Tasks", link: "/app/tasks", icon: CheckSquare },
  { title: "Teams", link: "/app/teams", icon: Group },
];

const settingsMenu = [
  { title: "Profile", link: "/app/settings/profile", Icon: Icons.userRound },
  { title: "Members", link: "/app/settings/members", Icon: Icons.usersRound },
];

export { homeMenu, appSideMenu, settingsMenu };
