import { NavLink } from "react-router-dom";
import Rentyard from "../../assets/rentyard.png";
import { Button } from "../ui/button";

export default function NavBar() {
  return (
    <>
      <div className="mx-20">
        <div className="my-5 flex items-center justify-between">
          <NavLink to="/">
            <img className="w-[140px] h-[38px]" src={Rentyard} alt="" />
          </NavLink>
          <Button variant="exit">Exit</Button>
        </div>
      </div>
    </>
  );
}
