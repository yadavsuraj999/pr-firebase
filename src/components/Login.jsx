import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../config/firebase";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(input.email.trim() === "" || input.password.trim() === ""){
      alert("please fill all input filled")
    }

    try {
      await signInWithEmailAndPassword(auth, input.email, input.password);
      setInput({ email: "", password: "" });
      navigate("/home");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("User not found. Please sign up first.");
      } else if (error.code === "auth/invalid-credential") {
        alert("Incorrect email or password.");
      } else {
        alert(error.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/home");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("User not found. Please sign up first.");
      } else if (error.code === "auth/invalid-credential") {
        alert("IIncorrect email or password.");
      } else {
        alert(error.message);
      }
    }
  };


  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto px-4 py-12 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-lg shadow-lg">

        <div className="flex flex-col justify-center px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">WELCOME BACK</h1>
          <p className="text-gray-600 mb-8">Welcome back! Please enter your details.</p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                value={input.email}
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 md:flex  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                value={input.password}
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 md:flex  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 py-2 px-4 rounded-md"
              >
                <img src="/images/icons8-google-48.png" alt="Google" className="h-5 w-5" />
                <span>Sign In with Google</span>
              </button>
            </div>

            <button className="text-center text-sm text-gray-600 mt-6">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-pink-600 hover:underline">
                Sign up for free!
              </Link>
            </button>
          </form>
        </div>

        <div className="hidden md:flex items-center justify-center">
          <img
            src="/images/Right Side.png"
            alt="Illustration"
            className="max-w-full h-auto object-cover rounded-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
