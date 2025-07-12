import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { UserRouter } from "./app/modules/user/user.routes";
import { success } from "zod";
import { authRouter } from "./app/modules/auth/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.send("welcome to  PH tour");
});

app.use("/api/v1/user", UserRouter);

app.use("/api/v1/auth", authRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    success: false,
    message: error.message || "sample error message",
    error,
  });
});

export default app;
