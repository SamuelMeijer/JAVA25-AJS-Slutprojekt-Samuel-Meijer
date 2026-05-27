import { body } from "express-validator";

export const createTaskValidation = [
  body("title").exists().isString().trim().notEmpty(),
  body("description").exists().isString().trim().notEmpty(),
  body("category")
    .exists()
    .isString()
    .trim()
    .notEmpty()
    .custom((value) => {
      console.log("value", value);
      return (
        value.toLowerCase() === "ux" ||
        value.toLowerCase() === "frontend" ||
        value.toLowerCase() === "backend"
      );
    }),
];
