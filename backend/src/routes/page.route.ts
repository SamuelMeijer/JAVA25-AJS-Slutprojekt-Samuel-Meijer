import { Router, Request, Response } from "express";
import path from "path";

export const pageRouter = Router();

pageRouter.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../../dist-frontend/index.html"));
});
