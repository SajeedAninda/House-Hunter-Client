import { Link, useNavigate } from "react-router-dom";
import useAuth from "./Hooks/useAuth";

function App() {
  let navigate = useNavigate();
  let { logout } = useAuth();

  const handleLogout = async () => {
    try {
      const success = await logout();
      if (success) {
        navigate('/login');
        console.log(user);
      }
    } catch (error) {
      console.log(error);
    }
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
