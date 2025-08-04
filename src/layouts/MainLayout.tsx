import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

export default function MainLayout() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className=" border-b-[1px] border-b-[#E0E0E0]">
          <NavBar></NavBar>
        </div>
        <main className="flex-1">
          <Outlet />
        </main>
        {/* <footer className="h-24 border-t-[1px] border-t-[#E0E0E0]">
          <Footer selectedPropertyType={undefined}></Footer>
        </footer> */}
      </div>
    </>
  );
}
