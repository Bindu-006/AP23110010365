"use client";

import { useEffect, useState } from "react";
import { Notification } from "@/types/notification";
import { fetchNotifications } from "@/services/notificationService";
import { getPriorityNotifications } from "@/utils/priorityUtils";

export default function PriorityPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const loadNotifications = async () => {
      const data = await fetchNotifications();

      const priorityNotifications =
        getPriorityNotifications(data);

      setNotifications(priorityNotifications);
    };

    loadNotifications();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-10">
        Priority Notifications
      </h1>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.ID}
            className="border border-yellow-500 rounded-lg p-4"
          >
            <h2 className="text-xl font-bold">
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