import express, { Request, Response } from "express";
import * as db from "./database";

export const app = express();
app.use(express.json());

// TODO: Fixa rätt med routes
// TODO: Fixa validering från requests innan kommunkation med DB
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "GET '/' - Hello World!" });
});

app.get("/all", (req: Request, res: Response) => {
  const tasks = db.getAllTasks();

  res.json(tasks);
});

// Testar för att se så jag kan lägga till en task - Fungerar!
// TODO: Fixa rätt med route
app.post("/", (req: Request, res, Response) => {
  // TODO: Adderar validation

  const newTask = db.createTask(req.body);
  // TODO: Adderar felhantering
  res.json({ message: `POST '/' - Adding task with id: ${newTask.id}` });
});
