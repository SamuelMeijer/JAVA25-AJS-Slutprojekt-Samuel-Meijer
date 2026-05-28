import { Router, Request, Response } from "express";
import * as db from "../database/database.controller";
import { createTaskValidation } from "../models/tasks.validations";
import { validationResult } from "express-validator";

export const taskRouter = Router();

taskRouter.get("/", (req: Request, res: Response) => {
  const tasks = db.getAllTasks();

  res.json(tasks);
});

taskRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  let task;
  if (typeof id === "string") {
    task = db.getTaskById(id as string);
  }

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: "No task with that id could be found" });
  }
});

taskRouter.post("/", createTaskValidation, (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { title, description, category } = req.body;
  const newTaskId = db.createTask({ title, description, category });

  // TODO: Adderar felhantering om det blir fel vid skapandet?

  res
    .status(201)
    .json({ message: `POST '/' - Adding task with id: ${newTaskId}` });
});

// TODO: Lägg till funktionalitet för att uppdatera en task - Med validering
// TODO: Lägg till funktionalitet för att radera en specifik task
// TODO: Lägg till 404 - för requests som inte finns
