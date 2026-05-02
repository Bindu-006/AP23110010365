import axios from "axios";

const LOG_API = "http://20.207.122.201/evaluation-service/logs";

type Stack = "frontend" | "backend";

type Level =
  | "debug"
  | "info"
  | "warn"
  | "error"
  | "fatal";

type PackageName =
  | "api"
  | "component"
  | "hook"
  | "page"
  | "state"
  | "style"
  | "auth"
  | "config"
  | "middleware"
  | "utils";

export const Log = async (
  stack: Stack,
  level: Level,
  packageName: PackageName,
  message: string
) => {
  try {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJiaW5kdXZlbmthdGFwcml5YV9iaWtraUBzcm1hcC5lZHUuaW4iLCJleHAiOjE3Nzc3MDA0MTQsImlhdCI6MTc3NzY5OTUxNCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjliN2FiYTAwLThkZDktNDFiYy1hZWEwLWM0MDA0MjNkNDFiNCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImJpa2tpIGJpbmR1IHZlbmthdGEgcHJpeWEiLCJzdWIiOiI2YmI0ODMzMy1kYzljLTQxZDItYjNiOC0wZjNmNWYwZDQwOGIifSwiZW1haWwiOiJiaW5kdXZlbmthdGFwcml5YV9iaWtraUBzcm1hcC5lZHUuaW4iLCJuYW1lIjoiYmlra2kgYmluZHUgdmVua2F0YSBwcml5YSIsInJvbGxObyI6ImFwMjMxMTAwMTAzNjUiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiI2YmI0ODMzMy1kYzljLTQxZDItYjNiOC0wZjNmNWYwZDQwOGIiLCJjbGllbnRTZWNyZXQiOiJkcXZLQ2JRRGhiU0R3a1hjIn0.oELG_lR424AV7JkUbJcpYpLfKWyKYLkGTb4kqeC08As";

    const response = await axios.post(
      LOG_API,
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Logging failed");
  }
};