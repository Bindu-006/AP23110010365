"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchNotifications } from "@/services/notificationService";
import { Notification } from "@/types/notification";

const ITEMS_PER_PAGE = 5;

export default function Home() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedType, setSelectedType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getNotifications = async () => {
      const data = await fetchNotifications();
      setNotifications(data);
    };

    getNotifications();
  }, []);

  const filteredNotifications = useMemo(() => {
    if (selectedType === "All") {
      return notifications;
    }

    return notifications.filter(
      (notification) => notification.Type === selectedType
    );
  }, [notifications, selectedType]);

  const totalPages = Math.ceil(
    filteredNotifications.length / ITEMS_PER_PAGE
  );

  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
            className={`px-4 py-2 rounded-lg border transition-all ${
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
        {paginatedNotifications.map((notification) => (
          <div
            key={notification.ID}
            className="border border-gray-700 rounded-lg p-4"
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