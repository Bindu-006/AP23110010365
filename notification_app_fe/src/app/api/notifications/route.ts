import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "http://20.207.122.201/evaluation-service/notifications",
      {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJiaW5kdXZlbmthdGFwcml5YV9iaWtraUBzcm1hcC5lZHUuaW4iLCJleHAiOjE3Nzc3MDQzNTIsImlhdCI6MTc3NzcwMzQ1MiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjhmYjU5Nzc5LWNhODEtNDVjMy05NzkxLTgzMjA2ZWQ4YzEyZSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImJpa2tpIGJpbmR1IHZlbmthdGEgcHJpeWEiLCJzdWIiOiI2YmI0ODMzMy1kYzljLTQxZDItYjNiOC0wZjNmNWYwZDQwOGIifSwiZW1haWwiOiJiaW5kdXZlbmthdGFwcml5YV9iaWtraUBzcm1hcC5lZHUuaW4iLCJuYW1lIjoiYmlra2kgYmluZHUgdmVua2F0YSBwcml5YSIsInJvbGxObyI6ImFwMjMxMTAwMTAzNjUiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiI2YmI0ODMzMy1kYzljLTQxZDItYjNiOC0wZjNmNWYwZDQwOGIiLCJjbGllbnRTZWNyZXQiOiJkcXZLQ2JRRGhiU0R3a1hjIn0.jkdkcque8Bi_DxqHTQQenL6Li7QtmAE3JbpPqRleo8Y",
        },
      }
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}