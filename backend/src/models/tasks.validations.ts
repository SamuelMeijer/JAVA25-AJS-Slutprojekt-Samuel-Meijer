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
      console.log("value", value);
      return (
        value.toLowerCase() === "ux" ||
        value.toLowerCase() === "frontend" ||
        value.toLowerCase() === "backend"
      );
    }),
];

// TODO: Addera validation för uppdatering. Kan använda 'oneOf' för att säkerställa att en av två värden finns eftersom man ska kunna uppdatera person eller status.
