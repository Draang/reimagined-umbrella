import { Link, useLoaderData } from "react-router-dom";
import { getProducts } from "../services/ProductService";
import type { Product } from "../types";
import ProductDetails from "../components/ProductDetails";
export async function loader() {
  const products = await getProducts();
  return products;
}
export default function Products() {
  const products = useLoaderData() as Product[];
  console.log(products);
  return (
    <>
      <div className="flex justify-between">
        <h2 className="font-black text-4xl text-slate-500">Productos</h2>
        <Link
          to={"/product/new"}
          className="bg-indigo-600 font-bold rounded-md uppercase p-3 text-sm text-white shadow hover:bg-indigo-700"
        >
          Agregar producto
        </Link>
      </div>
      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductDetails key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
