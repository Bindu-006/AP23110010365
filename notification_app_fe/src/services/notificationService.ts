import { Notification } from "@/types/notification";

export const fetchNotifications = async (): Promise<Notification[]> => {
  try {
    const response = await fetch("/api/notifications");

    const data = await response.json();

    return data.notifications || [];
  } catch (error) {
    console.error("Failed to fetch notifications");

    return [];
  }
};