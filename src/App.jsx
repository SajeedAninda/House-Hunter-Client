import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "./Hooks/useAuth";
import useCurrentUser from "./Hooks/useCurrentUser";
import ViewPage from "./Pages/ViewPage/ViewPage";
import Homepage from "./Pages/Guest/Homepage";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  // let navigate = useNavigate();
  // let { logout } = useAuth();

  // let { userData } = useCurrentUser();
  // console.log(userData);

  // const handleLogout = async () => {
  //   try {
  //     const success = await logout();
  //     if (success) {
  //       navigate('/login');
  //       console.log(user);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      {/* <Link to={"/register"}>Register</Link>
      <Link to={"/login"}>Login</Link>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogout}
      >
        Logout
      </button> */}
      <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  )
}

export default App
