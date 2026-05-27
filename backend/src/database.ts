import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("./app.db");

// TODO: Lägg till CHECKS som enum för att säkerställa att category(Ux / Frontend / Backend) och status(new / doing / done) har rätt värden.
// TODO: Ta bort default värden?
// TODO: Fundering - Ska person kunna ha värdet null eller ska jag sätta default till 'unassigned'?
// TODO: Ha UNIQUE på title?
db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'ux',
    status TEXT NOT NULL DEFAULT 'new',
    person TEXT,
    timestamp TEXT NOT NULL
    )
`);

// TODO: Add statements for creating a tasks.
const createTaskStmt = db.prepare(`
    INSERT INTO tasks (title, description, category, status, person, timestamp)
    VALUES (?, ?, ?, ?, ?, ?)
`);

// TODO - Testar bara så det funkar -> Fixa/Flytta interface till egen
interface newTask {
  title: string;
  description: string;
  category: string;
  status: string;
  person: string;
  timestamp: string;
}
export function createTask({
  title,
  description,
  category,
  status,
  person,
  timestamp,
}: newTask) {
  const result = createTaskStmt.run(
    title,
    description,
    category,
    status,
    person,
    timestamp,
  );

  return {
    id: result.lastInsertRowid,
    title,
    description,
    category,
    status,
    person,
    timestamp,
  };
}

const getAllTasksStmt = db.prepare(`
    SELECT * FROM tasks    
`);
export function getAllTasks() {
  return getAllTasksStmt.all();
}

// TODO: Lägg till funktionalitet för att kunna hämta task via ID
// TODO: Lägg till funktionalitet för att uppdatera en task
// TODO: Lägg till funktionalitet för att radera en specifik task
