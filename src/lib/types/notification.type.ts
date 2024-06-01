export interface Notification {
  id: string;
  title: string;
  description: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
  toId: string | null;
  fromId: string | null;
}
