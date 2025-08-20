import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

const Signup = () => {
    const [input, setInput] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        if (!input.name || !input.email || !input.password) {
            alert("Please fill all input fields.");
            return;
        }

        createUserWithEmailAndPassword(auth, input.email, input.password)
            .then((newUser) => {
                console.log(newUser);
                setInput({ name: "", email: "", password: "" });
                navigate("/home");
            })
            .catch((error) => {
                alert("password is worng");
            });
        }


        return (
            <section className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="container mx-auto px-4 py-12 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-lg shadow-lg">

                    <div className="flex flex-col justify-center px-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create an Account</h1>
                        <p className="text-gray-600 mb-8">Sign up to get started with your account.</p>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <input
                                    value={input.name}
                                    type="text"
                                    id="name"
                                    placeholder="Enter your name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    value={input.email}
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-4">
                                <button
                                    type="submit"
                                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
                                >
                                    Sign Up
                                </button>
                            </div>
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

export default Signup;
