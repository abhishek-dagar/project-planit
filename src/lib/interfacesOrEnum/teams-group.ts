export interface Project {
  status: Status;
  id?: string;
  name: string;
  link?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface Team {
  id?: string;
  name: string;
  icon?: string;
  pinned?: boolean;
  members?: string;
  link?: string;
  projects?: Project[];
  team?: Team;
}
export interface Group {
  id?: string;
  title: string;
  menu?: Team[];
}

export enum Status {
  PLANNING = "PLANNING",
  "IN PROGRESS" = "IN PROGRESS",
  PAUSED = "PAUSED",
  BACKLOG = "BACKLOG",
  DONE = "DONE",
  CANCELED = "CANCELED",
}
export enum StatusColor {
  PLANNING = "#28456c",
  "IN PROGRESS" = "#89632a",
  PAUSED = "#492f64",
  BACKLOG = "#5a5a5a",
  DONE = "#2b593f",
  CANCELED = "#6e3630",
}

export enum TaskStatus {
  TODO = "TODO",
  "IN PROGRESS" = "IN PROGRESS",
  PAUSED = "PAUSED",
  BACKLOG = "BACKLOG",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

export enum TaskStatusColor {
  // TODO = "#28456c",
  TODO = "#87909e",
  // "IN PROGRESS" = "#89632a",
  "IN PROGRESS" = "#7f77f1",
  PAUSED = "#492f64",
  BACKLOG = "#d8d8d8",
  // COMPLETED = "#2b593f",
  COMPLETED = "#6bc950",
  // CANCELED = "#6e3630",
  CANCELED = "#af2d1f",
}

export enum TaskPriority {
  URGENT = "URGENT",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  NONE = "NONE",
}

export enum TaskPriorityColor {
  URGENT = "#af1416",
  HIGH = "#ffff00",
  MEDIUM = "#6fddff",
  LOW = "#87909e",
  NONE = "#87909e",
}
