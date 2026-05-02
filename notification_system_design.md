# Notification System Design

## Overview

This project is a campus notification management system developed using Next.js and TypeScript. The application displays notifications related to placements, results, and events.

The system fetches notifications from the provided API and displays them in a responsive frontend interface.

---

## Notification Fetching

Notifications are fetched using the provided API endpoint.

To avoid browser CORS issues, a custom API route was created inside the Next.js application.

### Flow

Frontend → Next.js API Route → External Notification API

The frontend sends requests to the internal API route, and the route forwards the request to the external notification service using the authorization token.

---

## Priority Notification System

A separate priority page was implemented to display important notifications first.

### Priority Order

1. Placement
2. Result
3. Event

If notifications belong to the same category, the latest notification based on timestamp is given higher priority.

Only the top 10 notifications are displayed on the priority page.

---

## Filtering System

The homepage supports filtering notifications by category.

Available filters:

- All
- Placement
- Result
- Event

Filtering is implemented using React state and array filtering methods.

---

## Pagination

Pagination was implemented to improve readability when many notifications are available.

### Features

- 5 notifications displayed per page
- Previous and Next navigation buttons
- Dynamic page calculation

---

## Viewed and Unviewed Notifications

Notifications are marked as unread initially.

When a notification is clicked:
- It is marked as viewed
- UI appearance changes
- Viewed notification IDs are stored in localStorage

This allows viewed notifications to remain persistent even after page refresh.

---

## Logging Middleware

A reusable logging middleware was implemented as required in the evaluation instructions.

### Log Function

```ts
Log(stack, level, package, message)

Purpose

The middleware is used for:

frontend activity logging
notification fetch success/failure logging
debugging application flow
tracking important application events

notification_app_fe/
│
├── src/
│   ├── app/
│   ├── middleware/
│   ├── services/
│   ├── utils/
│   ├── types/
│   └── components/

Technologies Used
Next.js
TypeScript
Tailwind CSS
React Hooks
Axios
Scalability

The project structure supports future improvements such as:

Real-time notifications
Authentication system
Database integration
WebSocket support
Notification search
Sorting enhancements

The codebase is modular and organized for easier maintenance and scalability.
Conclusion

The system provides a clean and responsive solution for managing campus notifications. The implementation focuses on modularity, maintainability, and usability while satisfying all required frontend evaluation features.