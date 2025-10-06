import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  console.log(user);

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
      toast.success("Logout successfully...");
    } catch (error) {
      toast.error("Logout failed...");
    }
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl md:text-xl font-bold text-red-500">
          <span className="flex items-center">
            <img
              src="/images/—Pngtree—fire red shoes illustration_7887133.png"
              alt="Logo"
              width="40"
              className="mr-2"
            />
            <span className="hidden sm:flex">Shoe Management</span>
          </span>
        </h1>

        <nav className="flex items-center gap-3 sm:gap-6">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base transition duration-300"
            aria-label="Logout"
          >
            Logout
          </button>

          {user && (
            <div className="flex items-center gap-2 sm:gap-3 ml-4">
              <img
                src={user.photoURL || "/images/admin.png"} 
                onError={(e)=>{e.currentTarget.src = "/images/admin.png"}}
                alt={user.displayName || "Admin"}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border"
              />
              <span className="text-gray-700 font-medium text-sm sm:text-base">
                {console.log(user.photoURL)}
                {user.displayName || "Admin"}
              </span>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
