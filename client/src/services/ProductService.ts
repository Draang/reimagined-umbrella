import { array, safeParse } from "valibot";
import { DraftProductSchema, ProductSchema } from "../types";
import axios from "axios";
type ProductData = {
  [k: string]: FormDataEntryValue;
};
export async function addProduct(data: ProductData) {
  console.log("from product service", data);
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price,
    });
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/products`;
      const { data } = await axios.post(url, {
        ...result.output,
      });
      return data;
    } else {
      throw new Error("Datos no validos");
    }
  } catch (error) {
    console.log("error", error);
  }
}
export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/products`;
    const { data } = await axios.get(url);
    console.log(data)
    const result = safeParse(array(ProductSchema), data.data.rows);
    if (result.success) {
      console.log(result)
      return result.output;
    } else {
      throw new Error("Hubo un error");
    }
  } catch (error) {
    console.error(error);
  }
}
