import { Outlet } from "react-router-dom";
import Category from "../../components/Category/Category";

export default function Home() {
  return (
    <>
      <div className="">
        <div className="">
          <Category></Category>
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}
