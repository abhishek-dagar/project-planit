import { LayoutDashboard, UserSquare2, Users } from "lucide-react";

export const searchMenu = [
  {
    name: "Pages",
    group: [
      { name: "Profile", sortCutKey: "alt+p", icon: UserSquare2 },
      { name: "Dashboard", sortCutKey: "alt+d", icon: LayoutDashboard },
      { name: "Teams", sortCutKey: "alt+t", icon: Users },
    ],
  },
];
