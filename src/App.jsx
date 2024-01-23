import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "./Hooks/useAuth";
import useCurrentUser from "./Hooks/useCurrentUser";
import ViewPage from "./Pages/ViewPage/ViewPage";
import Homepage from "./Pages/Guest/Homepage";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  )
}

export default App
