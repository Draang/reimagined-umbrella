import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, {
  loader as productsLoader,
  action as availabilityAction,
} from "./views/Products";
import NewProduct, { action as newProductAction } from "./views/NewProduct";
import EditProduct, {
  loader as editProductLoader,
  action as editProductAction,
} from "./views/EditProduct";
import { action as productDetailsDeleteAction } from "./components/ProductDetails";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader,
        action: availabilityAction,
      },
      {
        path: "product/new",
        element: <NewProduct />,
        action: newProductAction,
      },
      {
        path: "product/:id/edit", //ROA pattern
        element: <EditProduct />,
        loader: editProductLoader,
        action: editProductAction,
      },
      { path: "product/:id/delete", action: productDetailsDeleteAction },
    ],
  },
]);
