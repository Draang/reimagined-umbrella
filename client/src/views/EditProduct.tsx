import {
  ActionFunctionArgs,
  Form,
  Link,
  useActionData,
  redirect,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { editProduct, getProduct } from "../services/ProductService";
import { Product } from "../types";
import ProductForm from "../components/ProductForm";
// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  let error = "";
  if (Object.values(data).includes(""))
    error = "todos los campos son obligatorios";

  if (params.id) {
    const product = await editProduct(data, +params.id);
    if (!product) {
      error = "Error editando";
    }
  } else error = "Id es obligatoria";

  if (error) return error;
  return redirect("/");
}
export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id) {
    const product = await getProduct(+params.id);
    if (!product) {
      throw new Response("", { status: 404, statusText: "No encontrado" });
    }
    return product;
  }
  return {};
}
const availabilityOptions = [
  { name: "Disponible", value: true },
  { name: "No Disponible", value: false },
];
export default function EditProduct() {
  const error = useActionData() as string;
  const product = useLoaderData() as Product;
  //Funciona si se cliquea desde ek editar de ProductDetails
  //const { state } = useLocation();
  return (
    <>
      <div className="flex justify-between">
        <h2 className="font-black text-4xl text-slate-500">Editar Producto</h2>
        <Link
          to={"/"}
          className="bg-indigo-600 font-bold rounded-md uppercase p-3 text-sm text-white shadow hover:bg-indigo-700"
        >
          Volver a productos
        </Link>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form className="mt-10" method="POST">
        <ProductForm product={product} />
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Disponibilidad:
          </label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Editar producto"
        />
      </Form>
    </>
  );
}
