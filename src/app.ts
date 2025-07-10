import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.send("welcome to  PH tour");
});

export default app;
