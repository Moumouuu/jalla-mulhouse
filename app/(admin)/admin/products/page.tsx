import { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function page() {
  return (
    <div className="bg-dark w-[100vw] text-white p-3 md:p-5">
      <Toaster />
      <Header />
      <div className="flex mt-5">
        <Sidebar />
      </div>
    </div>
  );
}
