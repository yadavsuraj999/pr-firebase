import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return user ? children : null;
};

export default ProtectedRoute;
