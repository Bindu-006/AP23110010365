import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "http://20.207.122.201/evaluation-service/notifications",
      {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJiaW5kdXZlbmthdGFwcml5YV9iaWtraUBzcm1hcC5lZHUuaW4iLCJleHAiOjE3Nzc3MDU2NDIsImlhdCI6MTc3NzcwNDc0MiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjQwMWNiMWI0LTIzYjctNGI5OC1hMjg3LTQ1NGQ1Y2MxZTdmOCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImJpa2tpIGJpbmR1IHZlbmthdGEgcHJpeWEiLCJzdWIiOiI2YmI0ODMzMy1kYzljLTQxZDItYjNiOC0wZjNmNWYwZDQwOGIifSwiZW1haWwiOiJiaW5kdXZlbmthdGFwcml5YV9iaWtraUBzcm1hcC5lZHUuaW4iLCJuYW1lIjoiYmlra2kgYmluZHUgdmVua2F0YSBwcml5YSIsInJvbGxObyI6ImFwMjMxMTAwMTAzNjUiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiI2YmI0ODMzMy1kYzljLTQxZDItYjNiOC0wZjNmNWYwZDQwOGIiLCJjbGllbnRTZWNyZXQiOiJkcXZLQ2JRRGhiU0R3a1hjIn0.cFgr_GsTgqujqlJ4DWh127iyFSqUH2SqaXkPHiTjHw0",
        },
      }
    );

    const data = await response.json();

    console.log(data);

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { notifications: [] },
      { status: 500 }
    );
  }
}