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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Priority Notifications
        </h1>

        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <div
              key={notification.ID}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {notification.Type}
                  </h2>

                  <p className="text-gray-700 mt-1">
                    {notification.Message}
                  </p>
                </div>

                <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  Priority #{index + 1}
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-3">
                {notification.Timestamp}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}