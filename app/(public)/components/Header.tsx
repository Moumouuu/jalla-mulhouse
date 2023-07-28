import getMenu from "@/actions/getMenu";
import NavBar from "./NavBar";
import NavBarMobile from "./NavBarMobile";

export default async function Header() {
  const menus = await getMenu();
  return (
    <>
      <div className="hidden lg:block w-full">
        <NavBar menus={menus} />
      </div>
      <div className="block lg:hidden w-full">
        <NavBarMobile menus={menus}  />
      </div>
    </>
  );
}
