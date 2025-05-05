import { boolean, InferOutput, number, object, string } from "valibot";

export const DraftProductSchema = object({
  name: string(),
  price: number(),
});
export const ProductSchema = object({
  id: number(),
  name: string(),
  price: number(),
  availability: boolean(),
});
export type Product = InferOutput<typeof ProductSchema>;
