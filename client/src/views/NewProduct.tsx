import {
  ActionFunctionArgs,
  Form,
  Link,
  useActionData,
  redirect,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  let error = "";
  if (Object.values(data).includes("")) {
    error = "todos los campos son obligatorios";
    return error;
  }
  await addProduct(data);
  return redirect("/");
}
export default function NewProduct() {
  const error = useActionData() as string;
  return (
    <>
      <div className="flex justify-between">
        <h2 className="font-black text-4xl text-slate-500">
          Registrar Producto
        </h2>
        <Link
          to={"/"}
          className="bg-indigo-600 font-bold rounded-md uppercase p-3 text-sm text-white shadow hover:bg-indigo-700"
        >
          Volver a productos
        </Link>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form className="mt-10" method="POST">
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="name">
            Nombre Producto:
          </label>
          <input
            id="name"
            type="text"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Nombre del Producto"
            name="name"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="price">
            Precio:
          </label>
          <input
            id="price"
            type="number"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Precio Producto. ej. 200, 300"
            name="price"
          />
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
}
