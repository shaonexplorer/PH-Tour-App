import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { UserRouter } from "./app/modules/user/user.routes";
import { authRouter } from "./app/modules/auth/auth.routes";
import "./app/config/passport.js";
import passport from "passport";
import expressSession from "express-session";
import { divisionRouter } from "./app/modules/division/division.routes";
import { tourRouter } from "./app/modules/tour/tour.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  expressSession({ secret: "abir", resave: false, saveUninitialized: false })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/api/v1", (req, res) => {
  res.send("welcome to  PH tour");
});

app.use("/api/v1/user", UserRouter);

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/division", divisionRouter);

app.use("/api/v1/tour", tourRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    success: false,
    message: error.message || "sample error message",
    error,
  });
});

export default app;
