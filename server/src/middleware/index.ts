import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export async function handleProductsValidation(
  request: Request,
  response: Response,
  next: NextFunction
) {
  await check("name")
    .notEmpty()
    .withMessage("El producto no puede ir vacio")
    .run(request);
  await check("price")
    .isNumeric()
    .notEmpty()
    .withMessage("El precio no puede ir vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no valido")
    .run(request);
  next();
}
export function handleInputErrors(
  request: Request,
  response: Response,
  next: NextFunction
) {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    response.status(400).json({ errors: errors.array() });
    return;
  }
  next();
}
