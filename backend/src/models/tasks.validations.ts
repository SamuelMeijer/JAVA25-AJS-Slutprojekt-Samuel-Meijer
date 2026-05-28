import { body, oneOf } from "express-validator";

export const createTaskValidation = [
  body("title").exists().isString().trim().notEmpty(),
  body("description").exists().isString().trim().notEmpty(),
  body("category")
    .exists()
    .isString()
    .trim()
    .notEmpty()
    .custom((value) => {
      return (
        value.toLowerCase() === "ux" ||
        value.toLowerCase() === "frontend" ||
        value.toLowerCase() === "backend"
      );
    }),
];

export const updateTaskValidation = [
  oneOf(
    [
      body("status")
        .exists()
        .isString()
        .trim()
        .notEmpty()
        .custom((value) => {
          return (
            value.toLowerCase() === "doing" || value.toLowerCase() === "done"
          );
        }),
      body("person").exists().isString().trim().notEmpty(),
    ],
    {
      message:
        "At least one of 'person' or 'status' must be provided with valid values",
    },
  ),
];
