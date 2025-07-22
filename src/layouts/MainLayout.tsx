import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

export default function MainLayout() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div>
          <NavBar></NavBar>
        </div>
        <main className="flex-1">
          <Outlet />
        </main>
        <footer></footer>
      </div>
    </>
  );
}
