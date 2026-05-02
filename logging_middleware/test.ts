import { Log } from "./index";

const testLogger = async () => {
  const response = await Log(
    "frontend",
    "info",
    "middleware",
    "Logger initialized successfully"
  );

  console.log(response);
};

testLogger();