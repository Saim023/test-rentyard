import { NavLink } from "react-router-dom";
import Rentyard from "../../assets/rentyard.png";
import { Button } from "../ui/button";

export default function NavBar() {
  return (
    <>
      <div className="px-20 py-3 border-b-2 border-[#EOEOEO]">
        <div className="w-[1280px] mx-auto flex items-center justify-between">
          <NavLink to="/">
            <img className="w-[140px] h-[34px]" src={Rentyard} alt="" />
          </NavLink>
          <Button variant="exit">Exit</Button>
        </div>
      </div>
    </>
  );
}
