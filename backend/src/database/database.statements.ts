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

export const updateTaskStmt = db.prepare(`
    UPDATE tasks
    SET status = ?, person = ?
    WHERE id = ?
`);

// TODO: Addera statement för att radera en task
