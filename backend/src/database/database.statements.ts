import { db } from "./database.config";

// TODO: Testar med hårdkodad request för att kontrollera så det funkar - Bestäm slutgiltigt schema för table och uppdatera
export const createTaskStmt = db.prepare(`
    INSERT INTO tasks (title, description, category, status, person, timestamp)
    VALUES (?, ?, ?, ?, ?, ?)
`);

export const getAllTasksStmt = db.prepare(`
    SELECT * FROM tasks    
`);

// TODO: Addera statement för att uppdatera en task

// TODO: Addera statement för att radera en todo
