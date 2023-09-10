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
