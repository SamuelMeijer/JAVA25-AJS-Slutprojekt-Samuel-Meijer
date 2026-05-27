import { DatabaseSync } from "node:sqlite";

export const db = new DatabaseSync("./app.db");

// TODO: Lägg till CHECKS som enum för att säkerställa att category(Ux / Frontend / Backend) och status(new / doing / done) har rätt värden.
db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new',
    person TEXT DEFAULT null,
    timestamp TEXT NOT NULL
    )
`);
