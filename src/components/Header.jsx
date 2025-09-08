import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
      toast.success("Logout successfully...")
    } catch (error) {
      toast.error("Logout failed...");
    }
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex sm:flex-row justify-between items-center">
        <h1 className="text-xl sm:text-sm font-bold text-red-500">
          Shoe Management
        </h1>
        <nav className="flex flex-row items-center gap-2 sm:gap-4 text-sm sm:text-base mt-2 sm:mt-0">
          <Link
            to="/home"
            className="text-red-500 font-medium hover:underline"
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base transition duration-300"
            aria-label="Logout"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
