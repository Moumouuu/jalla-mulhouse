import getProductsLite from "@/actions/getProductsLite";
import NavBar from "./NavBar";
import NavBarMobile from "./NavBarMobile";

export default async function Header() {
  const products = await getProductsLite();
  return (
    <>
      <div className="hidden lg:block w-full">
        <NavBar products={products} />
      </div>
      <div className="block lg:hidden w-full">
        <NavBarMobile products={products} />
      </div>
    </>
  );
}
