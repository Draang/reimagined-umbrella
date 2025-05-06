import {
  ActionFunctionArgs,
  Form,
  redirect,
  useNavigate,
} from "react-router-dom";
import { formatCurrency } from "../helpers";
import { Product } from "../types";
import { deleteProduct } from "../services/ProductService";
type ProductDetailsProps = {
  product: Product;
};
export async function action({ params }: ActionFunctionArgs) {
  if (params.id) {
    await deleteProduct(+params.id);
  }
  return redirect("/");
}
export default function ProductDetails({ product }: ProductDetailsProps) {
  const isAvailable = product.availability;
  const navigate = useNavigate();
  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        {isAvailable ? "Disponible" : "No Disponible"}
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => navigate(`/product/${product.id}/edit`)}
            className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs"
          >
            Editar
          </button>
          <Form
            className="w-full"
            method="POST"
            action={`product/${product.id}/delete`}
            onSubmit={(e) => {
              if (
                !confirm("El producto se eliminara permanentemente \nConfirma eliminacion?")
              ) {
                e.preventDefault();
              }
            }}
          >
            <input
              type="submit"
              className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs"
              value={"Eliminar"}
            />
          </Form>
        </div>
      </td>
    </tr>
  );
}
