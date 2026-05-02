"use client";

import { useEffect, useState } from "react";
import { fetchNotifications } from "@/services/notificationService";
import { Notification } from "@/types/notification";
import { Log } from "@/middleware/logger";

export default function Home() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const data = await fetchNotifications();

        setNotifications(data);

        await Log(
          "frontend",
          "info",
          "page",
          "Notifications loaded successfully"
        );
      } catch (error) {
        await Log(
          "frontend",
          "error",
          "page",
          "Failed to load notifications"
        );
      }
    };

    getNotifications();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-10">
        Campus Notification System
      </h1>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.ID}
            className="border border-gray-700 rounded-lg p-4"
          >
            <h2 className="text-xl font-semibold">
              {notification.Type}
            </h2>

            <p>{notification.Message}</p>

            <p className="text-sm text-gray-400 mt-2">
              {notification.Timestamp}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}