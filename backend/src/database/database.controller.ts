import { newTask, Task, updateTask } from "../models/tasks.types";
import {
  createTaskStmt,
  deleteTaskStmt,
  getAllTasksStmt,
  getTaskByIdStmt,
  updateTaskStmt,
} from "./database.statements";

export function createTask({ title, description, category }: newTask): number {
  // Skapar 'YYYY-MM-DD'-string
  let currentTime = new Date().toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const result = createTaskStmt.run(
    title,
    description,
    category.toLowerCase(),
    currentTime,
  );

  return result.lastInsertRowid as number;
}

export function getAllTasks() {
  const rows = getAllTasksStmt.all();

  return rows.map((row: any) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    status: row.status,
    person: row.person,
    timestamp: row.timestamp,
  })) as Task[];
}

export function getTaskById(id: string) {
  const fetchedTask = getTaskByIdStmt.get(id);
  return fetchedTask;
}

export function updateTask({ id, status, person }: updateTask) {
  const result = updateTaskStmt.run(status, person, id);
  return result.changes > 0;
}

export function deleteTask(id: string) {
  const result = deleteTaskStmt.run(id);
  return result.changes > 0;
}
