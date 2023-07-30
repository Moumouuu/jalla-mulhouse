import getMenu from "@/actions/getMenu";
import getProductsLite from "@/actions/getProductsLite";
import NavBar from "./NavBar";
import NavBarMobile from "./NavBarMobile";

export default async function Header() {
  const menus = await getMenu();
  const products = await getProductsLite();
  return (
    <>
      <div className="hidden lg:block w-full">
        <NavBar menus={menus} products={products} />
      </div>
      <div className="block lg:hidden w-full">
        <NavBarMobile menus={menus} products={products} />
      </div>
    </>
  );
}
