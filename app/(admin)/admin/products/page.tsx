import getProducts from "@/actions/getProducts";
import getPromos from "@/actions/getPromos";
import { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ProductForm from "../components/form/ProductForm";

export default async function page() {
  const promos = await getPromos();
  const products = await getProducts();

  return (
    <div className="bg-dark w-[100vw] text-white p-3 md:p-5">
      <Toaster />
      <Header />
      <div className="flex mt-5">
        <Sidebar />
        <ProductForm promotion={promos} products={products} />
      </div>
    </div>
  );
}
