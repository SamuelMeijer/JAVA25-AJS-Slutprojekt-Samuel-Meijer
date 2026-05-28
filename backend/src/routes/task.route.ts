import { Router, Request, Response } from "express";
import * as db from "../database/database.controller";
import {
  createTaskValidation,
  updateTaskValidation,
} from "../models/tasks.validations";
import { validationResult } from "express-validator";
import { Task } from "../models/tasks.types";

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
  } else {
    res.status(400).json({ error: "Only one id may be provided" });
    return;
  }

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: "No task with that id could be found" });
    return;
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

  res
    .status(201)
    .json({ message: `POST '/' - Adding task with id: ${newTaskId}` });
});

taskRouter.patch(
  "/:id",
  updateTaskValidation,
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { id } = req.params;
    let { status, person } = req.body;

    if (typeof id === "string") {
      /* Evalute om status och/eller person är undefined.
        Enbart 'person' kommer finnas när tasken tillsrkivs en person, enbart status kommer finnas när en task går från 'doing' till 'done'
      */
      if (!status) {
        status = "doing";
      } else if (!person) {
        const oldTask = db.getTaskById(id) as Task;
        if (oldTask) {
          person = oldTask.person;
        } else {
          res
            .status(404)
            .json({ error: "No task with that id could be found" });
          return;
        }
      }

      const hasUpdated = db.updateTask({ id, status, person });
      const message = hasUpdated
        ? "Task uppdated successfully"
        : "Failed to update task";
      res.json({ message });
    } else {
      res.status(400).json({ error: "Only one id may be provided" });
    }
  },
);

taskRouter.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  if (typeof id === "string") {
    const isDeleted = db.deleteTask(id);
    const message = isDeleted
      ? "Task delted successfully"
      : "Failed to delete task";
    res.json(message);
  } else {
    res.status(400).json({ error: "Only one id may be provided" });
  }
});

// Generell catch-all
taskRouter.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});
