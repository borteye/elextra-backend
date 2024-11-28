require("dotenv").config();
import cors from "cors";
import express, { Request, Response } from "express";
import authRouter from "./app/routes/auth";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.use("/auth", authRouter);

app.listen(process.env.PORT, () =>
  console.log(`listening to port ${process.env.PORT}`)
);
