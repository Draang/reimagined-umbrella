import { array, safeParse } from "valibot";
import { DraftProductSchema, Product, ProductSchema } from "../types";
import axios from "axios";
import { toBoolean } from "../helpers";
type ProductData = {
  [k: string]: FormDataEntryValue;
};
export async function addProduct(data: ProductData) {
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
    const result = safeParse(array(ProductSchema), data.data.rows);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error");
    }
  } catch (error) {
    console.error(error);
  }
}
export async function getProduct(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/products/${id}`;
    const { data } = await axios.get(url);
    const result = safeParse(ProductSchema, data.data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error");
    }
  } catch (error) {
    console.error(error);
  }
}
export async function editProduct(data: ProductData, id: Product["id"]) {
  try {
    const result = safeParse(ProductSchema, {
      id: id,
      name: data.name,
      price: +data.price,
      availability: toBoolean(data.availability.toString()),
    });
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/products/${id}`;
      const { data } = await axios.put(url, {
        name: result.output.name,
        price: result.output.price,
        availability: result.output.availability,
      });
      return data;
    } else {
      throw new Error("Datos no validos");
    }
  } catch (error) {
    console.log("error", error);
  }
}
export async function deleteProduct(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/products/${id}`;
    const res = await axios.delete(url);
    if (res.status != 200) {
      throw new Error("Error al borrar");
    }
  } catch (error) {
    console.error(error);
  }
}
