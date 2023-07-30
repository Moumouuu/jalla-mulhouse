import getMenu from "@/actions/getMenu";
import { Toaster } from "react-hot-toast";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import ProductItemForm from "../../components/form/ProductItemForm";

export default async function page() {
  const menus = await getMenu();

  return (
    <div className="bg-dark w-[100vw] text-white p-3 md:p-5">
      <Toaster />
      <Header />
      <div className="flex mt-5">
        <Sidebar />
        <ProductItemForm menus={menus} />
      </div>
    </div>
  );
}
