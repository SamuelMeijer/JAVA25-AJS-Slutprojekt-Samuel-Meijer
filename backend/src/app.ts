import express, { Request, response, Response } from "express";
import path from "path";
import { taskRouter } from "./routes/task.route";
import { pageRouter } from "./routes/page.route";

export const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../dist-frontend")));

app.use("/api/tasks", taskRouter);
app.use("/", pageRouter);

app.use((req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../dist-frontend/404.html"));
});

app.use((err: any, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});
