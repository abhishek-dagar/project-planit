import {
  Ban,
  CheckCircle2,
  Circle,
  HelpCircle,
  MoveDown,
  MoveRight,
  MoveUp,
  ShieldAlert,
  Timer,
  XCircle,
} from "lucide-react";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: HelpCircle,
  },
  {
    value: "todo",
    label: "Todo",
    icon: Circle,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: Timer,
  },
  {
    value: "completed",
    label: "Completed",
    icon: CheckCircle2,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: XCircle,
  },
];

export const priorities = [
  {
    label: "Urgent",
    value: "urgent",
    icon: ShieldAlert,
  },
  {
    label: "High",
    value: "high",
    icon: MoveUp,
  },
  {
    label: "Medium",
    value: "medium",
    icon: MoveRight,
  },
  {
    label: "Low",
    value: "low",
    icon: MoveDown,
  },
  {
    label: "None",
    value: "none",
    icon: Ban,
  },
];
