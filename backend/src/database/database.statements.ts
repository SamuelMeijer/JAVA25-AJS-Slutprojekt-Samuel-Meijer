import { db } from "./database.config";

export const createTaskStmt = db.prepare(`
    INSERT INTO tasks (title, description, category, timestamp)
    VALUES (?, ?, ?, ?)
`);

export const getAllTasksStmt = db.prepare(`
    SELECT * FROM tasks    
`);

export const getTaskByIdStmt = db.prepare(`
    SELECT * FROM tasks
    WHERE id = ?    
`);

// TODO: Addera statement för att uppdatera en task

// TODO: Addera statement för att radera en task
