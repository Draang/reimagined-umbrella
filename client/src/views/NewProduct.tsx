import {
  ActionFunctionArgs,
  Form,
  Link,
  useActionData,
  redirect,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";
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
        <ProductForm />
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
}
