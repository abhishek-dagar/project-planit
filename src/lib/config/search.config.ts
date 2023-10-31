import { LayoutDashboard, UserSquare2, Users } from "lucide-react";

export const searchMenu = [
  {
    name: "Pages",
    group: [
      {
        name: "Profile",
        sortCutKey: "alt+p",
        icon: UserSquare2,
        link: "/app/profile",
      },
      {
        name: "Dashboard",
        sortCutKey: "alt+d",
        icon: LayoutDashboard,
        link: "/app/dashboard",
      },
      {
        name: "Tasks",
        sortCutKey: "alt+t",
        icon: Users,
        link: "/app/my-tasks",
      },
      {
        name: "Teams",
        sortCutKey: "alt+t",
        icon: Users,
        link: "/app/teams",
      },
    ],
  },
];
