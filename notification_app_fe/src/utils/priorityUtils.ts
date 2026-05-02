import { Notification } from "@/types/notification";

const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export const getPriorityNotifications = (
  notifications: Notification[]
) => {
  return [...notifications]
    .sort((a, b) => {
      const priorityDifference =
        priorityMap[b.Type] - priorityMap[a.Type];

      if (priorityDifference !== 0) {
        return priorityDifference;
      }

      return (
        new Date(b.Timestamp).getTime() -
        new Date(a.Timestamp).getTime()
      );
    })
    .slice(0, 10);
};