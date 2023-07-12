import getProduct from "@/actions/getProduct";
import { Toaster } from "react-hot-toast";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import ProductItemForm from "../../components/form/ProductItemForm";

export default async function EditProductPage({ params }: any) {
  const product = await getProduct(params.id);

  if (!product)
    return (
      <span className="text-red-500">
        Une erreur est survenue lors du chargement de la page.
      </span>
    );

  return (
    <div className="bg-dark w-[100vw] text-white p-3 md:p-5">
      <Toaster />
      <Header />
      <div className="flex mt-5">
        <Sidebar />
        <ProductItemForm product={product} />
      </div>
    </div>
  );
}
