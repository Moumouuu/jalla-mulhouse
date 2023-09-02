import NavBar from "./NavBar";
import NavBarMobile from "./NavBarMobile";

export default async function Header() {
  return (
    <>
      <div className="hidden lg:block w-full">
        <NavBar />
      </div>
      <div className="block lg:hidden w-full">
        <NavBarMobile />
      </div>
    </>
  );
}
