import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (users) => {
      if (user) {
        setUser(users);
      } else {
        navigate("/login");
      }
      
    });

    return () => unsubscribe(); // cleanup
  }, [navigate]);


  return <Component />;
};

export default ProtectedRoute;
