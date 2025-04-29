import { Router } from "express";
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProductAvailabilityById,
  updateProductById,
} from "./handlers/product";
import { handleInputErrors, handleProductsValidation } from "./middleware";
import { param } from "express-validator";
const router = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        id:
 *            type: integer
 *            description: Product ID
 *            example: 1
 *        name:
 *            type: string
 *            description: name of the Product
 *            example: Monitor curvo
 *        price:
 *            type: number
 *            description: the Product price
 *            example: 100
 *        availability:
 *            type: boolean
 *            description: the Product availability
 *            example: true
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get list of Products
 *    tags:
 *      - Products
 *    description: Return a list of all products saved in the database where availability is true
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                count:
 *                  type: integer
 *                rows:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Product'
 */
router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get product by id
 *    tags:
 *      - Products
 *    description: Returns a Product based on its unique id passed in the url
 *    parameters:
 *    - in: path
 *      name: id
 *      description : ID of product
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: sucessful response
 *        content:
 *          aplication/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request - Invalid ID
 *      404:
 *        description: Not found
 */
router.get(
  "/:id",
  param("id").isInt().withMessage("ID no valido"),
  handleInputErrors,
  getProductById
);

/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Create a new product
 *    tags:
 *      - Products
 *    description: returns a new record in the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Monitor curvo"
 *              price:
 *                type: number
 *                example: 299
 *    responses:
 *      201:
 *        description: product created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: bad request
 *
 */
router.post("/", handleProductsValidation, handleInputErrors, createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Updates product with user input
 *    tags:
 *      - Products
 *    description: Returns the updated products
 *    parameters:
 *    - in: path
 *      name: id
 *      description : ID of product
 *      required: true
 *      schema:
 *        type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Monitor curvo"
 *              price:
 *                type: number
 *                example: 299
 *              availability:
 *                type: boolean
 *                example: true
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request - invalid id or invalid input data
 *      404:
 *        description: Product not found
 */
router.put(
  "/:id",
  param("id").isInt().withMessage("ID no valido"),
  handleProductsValidation,
  handleInputErrors,
  updateProductById
);
/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *    summary: Updates product availabilily
 *    tags:
 *      - Products
 *    description: Returns updated product with availability
 *    parameters:
 *    - in: path
 *      name: id
 *      description : ID of product
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request - invalid id
 *      404:
 *        description: Product not found
 *
 */
router.patch(
  "/:id",
  param("id").isInt().withMessage("ID no valido"),
  handleInputErrors,
  updateProductAvailabilityById
);

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Delete
 *    tags:
 *      - Products
 *    description: Returns confirmation message
 *    parameters:
 *    - in: path
 *      name: id
 *      description : ID of product
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Successful response
 *      400:
 *        description: Bad request - invalid id
 *      404:
 *        description: Product not found
 */
router.delete(
  "/:id",
  param("id").isInt().withMessage("ID no valido"),
  handleInputErrors,
  deleteProductById
);
export default router;
