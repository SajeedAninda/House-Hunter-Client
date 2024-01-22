import { Link, useNavigate } from "react-router-dom";
import Register from "./Pages/Register/Register";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function App() {
  let navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('accessToken');
    toast.success('Logged out successfully');
    navigate("/login");
  };

  return (
    <>
      <Link to={"/register"}>Register</Link>
      <Link to={"/login"}>Login</Link>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  )
}

export default App
