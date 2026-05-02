import { Notification } from "@/types/notification";

export const fetchNotifications = async (): Promise<Notification[]> => {
  const response = await fetch("/api/notifications");

  const data = await response.json();

  return data.notifications || [];
};