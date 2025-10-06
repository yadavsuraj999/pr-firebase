import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import Header from "./Header";
import { useEffect, useRef, useState } from "react";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [shoes, setShoes] = useState([]);
    const [input, setInput] = useState({ brand: "", size: "", color: "" });
    const [isupdate, setUpdate] = useState(false)

    const idref = useRef()

    const shoesCollection = collection(db, "shoes");

    const fetchShoes = async () => {
        const querySnapshot = await getDocs(shoesCollection);
        const shoesList = querySnapshot.docs.map((data) => ({
            id: data.id,
            ...data.data(),
        }));
        setShoes(shoesList);
    };

    useEffect(() => {
        fetchShoes();
    }, []);

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleShoes = async (e) => {
        e.preventDefault();

        if (input.brand.trim() == "" || input.color.trim() == "" || input.size.trim() == "") {
            toast.error("Please fill all input filled....")
            return
        }

        if (isupdate) {
            console.log(idref.current);
            let ref = await updateDoc(doc(db, "shoes", idref.current), input)
            setUpdate(false)
            toast.success("shoes Updated successfully...");
        } else {
            if (input.size < 0) {
                toast.error("Size can't be negative")
                return
            } else {
                await addDoc(shoesCollection, input);
                toast.success("shoes added successfully...");
            }
        }
        setInput({ brand: "", size: "", color: "" });
        fetchShoes();
    };

    const handleDelete = async (id) => {
        try {
            let res = await deleteDoc(doc(db, "shoes", id))

            fetchShoes()
            toast.success("shoes deleted successfully...");
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    const handleEdit = async (id) => {
        try {
            let newdata = shoes.find((item) => {
                return item.id == id
            })
            setInput(newdata)
            idref.current = id
            setUpdate(true)
            fetchShoes()
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <Header />
            <section className="bg-gray-100 min-h-screen p-6">
                <div className="container mx-auto mt-24 max-w-4xl">
                    <Link
                        to="/home"
                        className="text-red-500 font-medium text-2xl hover:underline"
                    >
                        Dashboard
                    </Link>
                </div>

                <div className="container mx-auto max-w-4xl mt-10 bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{`${isupdate ? "Update Shoe" : "Add New Shoe"}`}</h2>
                    <form onSubmit={handleShoes} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <input
                            type="text"
                            name="brand"
                            placeholder="Brand"
                            value={input.brand}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 "
                        />
                        <input
                            type="number"
                            name="size"
                            placeholder="Size"
                            value={input.size}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 "
                        />
                        <input
                            type="text"
                            name="color"
                            placeholder="Color"
                            value={input.color}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 "
                        />

                        <div className="md:col-span-3">
                            <button
                                type="submit"
                                className={`w-full ${isupdate ? "bg-yellow-400 hover:bg-yellow-500" : "bg-red-500  hover:bg-red-600"}  text-white py-2 rounded-md`}
                            >
                                {isupdate ? "Update Shoe" : "Add Shoe"}
                            </button>
                        </div>
                    </form>

                    <div>
                        {shoes.length > 0 ? (
                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-center sm:text-center">Shoe Inventory</h3>
                                <div className="overflow-x-auto max-h-96">
                                    <table className="min-w-full border border-gray-300 text-left">
                                        <thead className="bg-gray-200">
                                            <tr>
                                                <th className="py-2 px-4 border-b">Brand</th>
                                                <th className="py-2 px-4 border-b">Size</th>
                                                <th className="py-2 px-4 border-b">Color</th>
                                                <th className="py-2 px-4 border-b text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {shoes.map((shoe, index) => (
                                                <tr key={shoe.id} className="hover:bg-gray-100">
                                                    <td className="py-2 px-4 border-b">{shoe.brand}</td>
                                                    <td className="py-2 px-4 border-b">{shoe.size}</td>
                                                    <td className="py-2 px-4 border-b">{shoe.color}</td>
                                                    <td className="py-2 px-4 border-b space-x-2 text-center ">
                                                        <button onClick={() => { handleEdit(shoe.id) }} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">
                                                            Edit
                                                        </button>
                                                        <button onClick={() => {
                                                            handleDelete(shoe.id)
                                                            setUpdate(null)
                                                            setInput({ brand: "", size: "", color: "" })
                                                        }} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded mt-2">
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center">No shoes added yet.</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Dashboard;
