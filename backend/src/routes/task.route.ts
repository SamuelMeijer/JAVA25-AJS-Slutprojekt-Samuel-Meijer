import { Router, Request, Response } from "express";
import * as db from "../database/database.controller";
//TODO: Addera types

export const taskRouter = Router();

// TODO: Fixa validering från requests innan kommunkation med DB

taskRouter.get("/", (req: Request, res: Response) => {
  const tasks = db.getAllTasks();

  res.json(tasks);
});

// Testar för att se så jag kan lägga till en task - Fungerar!
// TODO: Fixa rätt med route
taskRouter.post("/", (req: Request, res: Response) => {
  // TODO: Adderar validation

  const newTaskId = db.createTask(req.body);
  // TODO: Adderar felhantering
  res.json({ message: `POST '/' - Adding task with id: ${newTaskId}` });
});
