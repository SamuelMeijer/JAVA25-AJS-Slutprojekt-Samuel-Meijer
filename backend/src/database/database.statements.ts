import { db } from "./database.config";

export const createTaskStmt = db.prepare(`
    INSERT INTO tasks (title, description, category, timestamp)
    VALUES (?, ?, ?, ?)
`);

export const getAllTasksStmt = db.prepare(`
    SELECT * FROM tasks    
`);

// TODO: Addera statement för att hämta en specifik task

// TODO: Addera statement för att uppdatera en task

// TODO: Addera statement för att radera en task
