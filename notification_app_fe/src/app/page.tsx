"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchNotifications } from "@/services/notificationService";
import { Notification } from "@/types/notification";

const ITEMS_PER_PAGE = 5;

export default function Home() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedType, setSelectedType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewedNotifications, setViewedNotifications] = useState<string[]>([]);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await fetchNotifications();

        console.log(data);

        setNotifications(data || []);
      } catch (error) {
        console.log(error);
        setNotifications([]);
      }
    };

    loadNotifications();

    const storedViewed =
      localStorage.getItem("viewedNotifications");

    if (storedViewed) {
      setViewedNotifications(JSON.parse(storedViewed));
    }
  }, []);

  const filteredNotifications = useMemo(() => {
    if (selectedType === "All") {
      return notifications;
    }

    return notifications.filter(
      (notification) => notification.Type === selectedType
    );
  }, [notifications, selectedType]);

  const totalPages =
    Math.ceil(filteredNotifications.length / ITEMS_PER_PAGE) || 1;

  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const markAsViewed = (id: string) => {
    if (viewedNotifications.includes(id)) {
      return;
    }

    const updatedViewed = [...viewedNotifications, id];

    setViewedNotifications(updatedViewed);

    localStorage.setItem(
      "viewedNotifications",
      JSON.stringify(updatedViewed)
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-10">
        Campus Notification System
      </h1>

      <div className="flex gap-4 justify-center mb-8 flex-wrap">
        {["All", "Placement", "Result", "Event"].map((type) => (
          <button
            key={type}
            onClick={() => {
              setSelectedType(type);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-lg border ${
              selectedType === type
                ? "bg-white text-black"
                : "border-gray-600"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {paginatedNotifications.map((notification) => {
          const isViewed = viewedNotifications.includes(
            notification.ID
          );

          return (
            <div
              key={notification.ID}
              onClick={() => markAsViewed(notification.ID)}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                isViewed
                  ? "border-gray-700 opacity-50"
                  : "border-yellow-500 bg-yellow-500/10"
              }`}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  {notification.Type}
                </h2>

                {!isViewed && (
                  <span className="text-yellow-400 text-sm">
                    Unread
                  </span>
                )}
              </div>

              <p>{notification.Message}</p>

              <p className="text-sm text-gray-400 mt-2">
                {notification.Timestamp}
              </p>
            </div>
          );
        })}
      </div>

      {filteredNotifications.length === 0 && (
        <p className="text-center text-gray-400 mt-10">
          No notifications found
        </p>
      )}

      <div className="flex justify-center gap-4 mt-10">
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.max(prev - 1, 1))
          }
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-lg disabled:opacity-40"
        >
          Previous
        </button>

        <p className="flex items-center">
          Page {currentPage} of {totalPages}
        </p>

        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, totalPages)
            )
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-lg disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}