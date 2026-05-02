"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";

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
        setNotifications(data || []);
      } catch (error) {
        console.log(error);
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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Campus Notification System
        </h1>
  
        <div className="flex gap-3 flex-wrap justify-center mb-6">
          {["All", "Placement", "Result", "Event"].map((type) => (
            <button
              key={type}
              onClick={() => {
                setSelectedType(type);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
                selectedType === type
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
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
                className={`rounded-lg border p-4 shadow-sm cursor-pointer transition ${
                  isViewed
                    ? "bg-gray-200 border-gray-300 opacity-70"
                    : "bg-white border-gray-200 hover:shadow-md"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {notification.Type}
                    </h2>
  
                    <p className="text-gray-700 mt-1">
                      {notification.Message}
                    </p>
                  </div>
  
                  {!isViewed && (
                    <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                      New
                    </span>
                  )}
                </div>
  
                <p className="text-sm text-gray-500 mt-3">
                  {notification.Timestamp}
                </p>
              </div>
            );
          })}
        </div>
  
        {filteredNotifications.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No notifications available
          </p>
        )}
  
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.max(prev - 1, 1))
            }
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-md border bg-white disabled:opacity-50"
          >
            Previous
          </button>
  
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
  
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, totalPages)
              )
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-md border bg-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}