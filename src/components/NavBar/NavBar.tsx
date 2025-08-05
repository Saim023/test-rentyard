import { NavLink } from "react-router-dom";
import Rentyard from "../../assets/rentyard.png";
import { Button } from "../ui/button";

export default function NavBar() {
  return (
    <>
      <div className="mx-4 sm:mx-6 md:mx-10 lg:mx-20">
        <div className="my-3 sm:my-4 md:my-5 flex items-center justify-between">
          <NavLink to="/">
            <img
              className="w-[120px] h-[32px] sm:w-[130px] sm:h-[35px] md:w-[140px] md:h-[38px]"
              src={Rentyard}
              alt="Rentyard Logo"
            />
          </NavLink>
          <Button
            variant="exit"
            className="text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2"
          >
            Exit
          </Button>
        </div>
      </div>
    </>
  );
}
