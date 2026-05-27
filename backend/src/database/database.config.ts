import { DatabaseSync } from "node:sqlite";

export const db = new DatabaseSync("./app.db");

// TODO: Bestäm slutgiltigt schema - Uppdatera i statements & controller & types
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
