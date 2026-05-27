import { newTask, Task } from "../models/tasks.types";
import { createTaskStmt, getAllTasksStmt } from "./database.statements";

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

  // TODO: Addera felhantering om det inte går att skapa

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

// TODO: Lägg till funktionalitet för att kunna hämta task via ID
// TODO: Lägg till funktionalitet för att uppdatera en task
// TODO: Lägg till funktionalitet för att radera en specifik task
