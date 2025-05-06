import { Request, Response } from "express";
import Product from "../models/Product.model";
export async function getProducts(request: Request, response: Response) {
  const products = await Product.findAndCountAll({
   
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  response.json({ data: products });
}
export async function createProduct(request: Request, response: Response) {
  const product = await Product.create(request.body);
  response.status(201).json({ data: product });
}
export async function getProductById(request: Request, response: Response) {
  const { id } = request.params;
  const product = await Product.findByPk(id, {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  if (!product) {
    response.status(404).json({ error: "Producto no encontrado" });
    return;
  }
  response.json({ data: product });
}

export async function updateProductById(request: Request, response: Response) {
  const { id } = request.params;
  const product = await Product.findByPk(id);
  if (!product) {
    response.status(404).json({ error: "Producto no encontrado" });
    return;
  }
  await product.update(request.body);
  await product.save();
  response.json({ data: product });
}
export async function updateProductAvailabilityById(
  request: Request,
  response: Response
) {
  const { id } = request.params;
  const product = await Product.findByPk(id);
  if (!product) {
    response.status(404).json({ error: "Producto no encontrado" });
    return;
  }
  product.availability = !product.dataValues.availability;
  await product.save();
  response.json({ data: product });
}
export async function deleteProductById(request: Request, response: Response) {
  const { id } = request.params;
  const product = await Product.findByPk(id);
  if (!product) {
    response.status(404).json({ error: "Producto no encontrado" });
    return;
  }
  await product.destroy();
  await product.save();
  response.json({ data: "producto eliminado" });
}
