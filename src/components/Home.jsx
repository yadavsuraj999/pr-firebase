import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import Header from "./Header";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

const Home = () => {
  const [shoes, setShoes] = useState([]);
  const [input, setInput] = useState({ brand: "", size: "", color: "" });

  const shoesCollectionRef = collection(db, "shoes");

  const fetchShoes = async () => {
    const querySnapshot = await getDocs(shoesCollectionRef);
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
    await addDoc(shoesCollectionRef, input);
    setInput({ brand: "", size: "", color: "" });
    fetchShoes();
  };

  const handleDelete = async (id) => {
    try {
      let res = await deleteDoc(doc(db, "shoes", id))
      fetchShoes()
    } catch (error) {
      alert(error)
    }
  }

  const handleEdit = async (id) => {
    try {
      let ref = updateDoc(doc(db, "shoes", id, {
        brand: "",
        size: "",
        color: ""
      }))
      fetchShoes()
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <>
      <Header />
      <section className="bg-gray-100 min-h-screen p-6">
        <div className="container mx-auto max-w-4xl bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Shoe</h2>

          <form onSubmit={handleShoes} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={input.brand}
              onChange={handleChange}
              className="border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-red-500"
              required
            />
            <input
              type="text"
              name="size"
              placeholder="Size"
              value={input.size}
              onChange={handleChange}
              className="border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-red-500"
              required
            />
            <input
              type="text"
              name="color"
              placeholder="Color"
              value={input.color}
              onChange={handleChange}
              className="border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-red-500"
              required
            />

            <div className="md:col-span-3">
              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
              >
                Add Shoe
              </button>
            </div>
          </form>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-center">Shoe Inventory</h3>

            {shoes.length > 0 ? (
              <div className="overflow-x-auto">
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
                        <td className="py-2 px-4 border-b space-x-2 text-center">
                          <button onClick={() => { handleEdit(shoe.id) }} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">
                            Edit
                          </button>
                          <button onClick={() => { handleDelete(shoe.id) }} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

export default Home;
