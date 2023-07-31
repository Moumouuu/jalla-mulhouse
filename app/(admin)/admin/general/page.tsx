import getGeneral from "@/actions/getGeneral";
import { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import GeneralForm from "../components/form/GeneralForm";

export default async function Page() {
  const general = await getGeneral();

  if (!general) {
    return (
      <div className="text-center text-red-700">Something went wrong.</div>
    );
  }

  return (
    <div className="bg-dark w-[100vw] text-white p-3 md:p-5">
      <Toaster />
      <Header />
      <div className="flex mt-5">
        <Sidebar />
        <GeneralForm />
      </div>
    </div>
  );
}
