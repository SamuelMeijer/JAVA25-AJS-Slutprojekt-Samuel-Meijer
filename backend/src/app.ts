import express, { Request, Response } from "express";
import { taskRouter } from "./routes/task.route";

export const app = express();
app.use(express.json());
// TODO: Addera så man kan serva statiska filer

app.use("/api/tasks", taskRouter);
// TODO: Addera route för pages

/* TODO: Addera felhantering
    1. 404-sida
    2. Catch-all för generella fel
*/
