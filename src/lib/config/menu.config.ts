import { CheckSquare, Group, LayoutDashboard, Search } from "lucide-react";

const homeMenu = [
  { title: "Home", link: "/" },
  { title: "Pricing", link: "/pricing" },
  { title: "About", link: "/about" },
  // { title: "Features", link: "/features" },
];

const appSideMenu = [
  { title: "Dashboard", link: "/app/dashboard", icon: LayoutDashboard },
  { title: "Search", link: "", icon: Search },
  { title: "My Tasks", link: "/app/my-tasks", icon: CheckSquare },
  { title: "Teams", link: "/app/teams", icon: Group },
];

export { homeMenu, appSideMenu };
