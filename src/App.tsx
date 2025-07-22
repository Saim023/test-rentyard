import { useRoutes } from "react-router-dom";
import { appRoutes } from "./routes/Routes";

export default function App() {
  const element = useRoutes(appRoutes);
  return element;
}
