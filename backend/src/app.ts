import express, { Request, Response } from "express";
import path from "path";
import { taskRouter } from "./routes/task.route";
import { pageRouter } from "./routes/page.route";

export const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../dist-frontend")));

app.use("/api/tasks", taskRouter);
app.use("/", pageRouter);

/* TODO: Addera felhantering
    1. 404-sida
    2. Catch-all för generella fel
*/
