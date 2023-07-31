import { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MenuForm from "../components/form/MenuForm";

export default async function Page() {
  return (
    <div className="bg-dark w-[100vw] text-white p-3 md:p-5">
      <Toaster />
      <Header />
      <div className="flex mt-5">
        <Sidebar />
        <MenuForm />
      </div>
    </div>
  );
}
