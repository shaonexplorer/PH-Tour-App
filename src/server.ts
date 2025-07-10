import app from "./app";
import mongoose from "mongoose";
import { Server } from "http";
import "dotenv/config";

const url = process.env.DB_URL;
const port = process.env.PORT;
let server: Server;

async function startServer() {
  try {
    await mongoose.connect(`${url}`);
    console.log("connected to mongoDB");
    server = app.listen(port, () => {
      console.log(`server is running on port ${port} `);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();

process.on("unhandledRejection", () => {
  console.log("server is closing... ");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log("server is closing... ");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("server is closing... ");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});
