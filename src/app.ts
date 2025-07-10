import express from "express";
import cors from "cors";
import { UserRouter } from "./app/modules/user/user.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.send("welcome to  PH tour");
});

app.use("/api/v1/user", UserRouter);

export default app;
