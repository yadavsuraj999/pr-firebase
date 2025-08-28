import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      try {
        navigate("/")
      } catch (error) {
        alert(error)
      }
  };

  return (
    <header className="container mx-auto bg-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-red-500">Shoe Management</h1>
      <nav className="flex gap-4 items-center">
        <Link to="/home" className="text-gray-700 hover:text-red-500">Home</Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
