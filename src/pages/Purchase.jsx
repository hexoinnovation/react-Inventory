import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDownload, AiOutlineEye } from "react-icons/ai";
import { FaCloudDownloadAlt,FaStreetView } from "react-icons/fa";

import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineAddCircle } from "react-icons/md";
import { doc, setDoc, collection, query, where, getDocs, writeBatch, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { auth } from "../config/firebase"; // Make sure you have firebase authentication set up
import { useAuthState } from "react-firebase-hooks/auth"; // To get current user

const Purchase = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    sname: "",
    phone: "",
    add: "",
    id: "",
    pname: "",
    categories: "",
    qnt: "",
    price: "",
  });

  const [filteredCategory, setFilteredCategory] = useState(""); // Filter by category

  // Get the current logged-in user
  const [user] = useAuthState(auth); // Returns current authenticated user

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission to add new product and store in Firebase
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please log in to add a product.");
      return;
    }

    // Add the new product to the products list in state
    setProducts((prev) => [...prev, { ...newProduct, id: prev.length + 1 }]);

    try {
      // Use the logged-in user's email for the document path
      const userEmail = user.email; // Get the email of the logged-in user

      // Create a document reference for the user in Firestore
      const userDocRef = doc(db, "admins", userEmail); // Reference to the 'admins' collection using the user's email
      const productRef = collection(userDocRef, "products"); // Reference to the 'products' subcollection

      // Set the product document
      await setDoc(doc(productRef, newProduct.sname), newProduct);

      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product to Firestore: ", error);
    }

    setShowModal(false);
    setNewProduct({
      sname: "",
      phone: "",
      add: "",
      id: "",
      pname: "",
      categories: "",
      qnt: "",
      price: "",
    });
  };

 // Handle removing all products for a supplier
const handleRemoveProduct = async (Suppliername) => {
  try {
    // Reference to the user's product collection
    const userCollectionRef = collection(db, "admins", user.email, "products");

    // Get all products for this supplier
    const supplierQuery = query(userCollectionRef, where("sname", "==", Suppliername));
    const querySnapshot = await getDocs(supplierQuery);

    // Delete each product document that matches the supplier name
    const batch = writeBatch(db);
    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    // Remove from the local state (table) by filtering out the supplier's products
    setProducts((prevProducts) => prevProducts.filter((product) => product.sname !== Suppliername));

    alert(`All products for ${Suppliername} deleted successfully!`);
  } catch (error) {
    console.error("Error deleting products for supplier: ", error);
    alert("Error deleting products for supplier. Please try again.");
  }
};



// Function to handle product creation
const handleCreateProduct = async () => {
  try {
    await addDoc(productRef, {
      name: productName,
      price: parseFloat(productPrice),
    });
    setShowModal(false);
    setProductName('');
    setProductPrice('');
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

  // Handle category filter change
  const handleCategoryFilterChange = (e) => {
    setFilteredCategory(e.target.value);
  };

  // Filtered products based on the selected category
  const filteredProducts = filteredCategory
    ? products.filter((product) => product.category === filteredCategory)
    : products;

  return (
    <div className="container mx-auto p-4 mt-10">
      <div className="flex small:flex-row justify-between x-small:flex-col">
        <h1 className="text-4xl font-bold text-gray-600">Purchase</h1>
        <button className="px-1 py-1 text-white bg-blue-500 rounded-full hover:bg-blue-600 w-40 x-small:mt-5 small:mt-0">
          <FaCloudDownloadAlt className="w-5 h-5 inline mr-2" />
          <span>Download PDF</span>
        </button>
      </div>

      {/* Filter and Button Section */}
      <div className="flex justify-between mt-10 ">
        {/* Category Filter Dropdown */}
        <div className="relative w-40">
          <label htmlFor="category-filter" className="sr-only">
            Filter by Category
          </label>
          <select
            id="category-filter"
            value={filteredCategory}
            onChange={handleCategoryFilterChange}
            className="block w-full p-2 text-sm text-black border border-gray-500 rounded-lg bg-gray-50"
          >
            <option value="">All Categories</option>
            <option value="Laptop">Laptop</option>
            <option value="Smartphone">Smartphone</option>
            <option value="Tablet">Tablet</option>
          </select>
        </div>

        {/* Create Purchase Order and Download Button */}
        <div className="flex x-small:flex-col medium:flex-row gap-2 x-small:ml-10 ">
          <button
            className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
            onClick={() => setShowModal(true)}
          >
            <div className="flex gap-1">
              <span className="text-2xl">
                <MdOutlineAddCircle />
              </span>
              <span className="text-base">Create</span>
            </div>
          </button>
          
        </div>

        <button
            className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
            onClick={() => setShowModal(true)}
          >
            <div className="flex gap-1">
              <span className="text-2xl">
                <FaStreetView /> 
              </span>
              <span className="text-base">View</span>
            </div>
          </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg mt-10">
        <table className="w-full text-sm text-left text-white">
          <thead className="text-xs text-black uppercase bg-blue-200">
            <tr>
              <th scope="col" className="px-6 py-3">
              Supplier Name
              </th>
              <th scope="col" className="px-6 py-3">
              Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
              Address
              </th>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
              Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Categories
              </th>
              <th scope="col" className="px-6 py-3">
              Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-200 text-black">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{product.sname}</td>
                <td className="px-6 py-4 font-medium">{product.phone}</td>
                <td className="px-6 py-4">{product.add}</td>
                <td className="px-6 py-4">{product.id}</td>
                <td className="px-6 py-4">{product.pname}</td>
                <td className="px-6 py-4">{product.categories}</td>
                <td className="px-6 py-4">{product.qnt}</td>
                <td className="px-6 py-4">{product.price}</td>

                <td className="px-6 py-4">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => {
                      setShowPopup(true);
                      setSelectedProduct(product);
                    }}
                  >
                    <AiOutlineEye className="text-blue-600 text-xl ml-1" />
                  </button>

                  {/* Edit Icon */}
                  <button
                    className="text-green-600 hover:underline ml-1"
                    onClick={() => {
                      setShowModal(true);
                      setSelectedProduct(product);
                    }}
                  >
                    <FaEdit className="text-green-600 text-xl ml-1" />
                  </button>

                  
                  {/* Delete Icon */}
<button
  className="text-red-600 hover:underline ml-2"
  onClick={() => handleRemoveProduct(product.sname)}
>
  <RiDeleteBin5Line className="text-red-600 text-xl" />
</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Creating Purchase Order */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-4 mt-10 w-full max-w-xs x-small:ml-12 x-small:max-w-60 medium:max-w-xs large:max-w-sm extra-large:max-w-sm xx-large:max-w-sm max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4">
              Create Purchase Order
            </h2>
            <form onSubmit={handleFormSubmit}>
              {/* Supplier Name Input */}
              <input
                type="text"
                name="sname"
                placeholder="Supplier Name"
                className="w-full mb-4 p-3 border border-black rounded"
                value={newProduct.sname}
                onChange={handleInputChange}
                required
              />
              {/* Phone Input */}
              <input
                type="text"
                name="phone"
                placeholder=" Phone Number"
                className="w-full mb-4 p-3 border rounded border-black"
                value={newProduct.phone}
                onChange={handleInputChange}
                required
              />
              {/* Address Input */}
              <input
                type="text"
                name="add"
                placeholder="Add"
                className="w-full mb-4 p-3 border rounded border-black"
                value={newProduct.add}
                onChange={handleInputChange}
                required
              />
              {/* ID Input */}
              <input
                type="text"
                name="id"
                placeholder="ID"
                className="w-full mb-4 p-3 border rounded border-black"
                value={newProduct.id}
                onChange={handleInputChange}
                required
              />
              {/* Product Name Input */}
              <input
                type="text"
                name="pname"
                placeholder="Product Name"
                className="w-full mb-4 p-3 border rounded border-black"
                value={newProduct.pname}
                onChange={handleInputChange}
                required
              />
              {/* Categories Input */}
              <input
                type="text"
                name="categories"
                placeholder="Categories"
                className="w-full mb-4 p-3 border rounded border-black"
                value={newProduct.categories}
                onChange={handleInputChange}
                required
              />
              {/* Quantity Input */}
              <input
             type="number"
             name="qnt"
             placeholder="Quantity"
             className="w-full mb-4 p-3 border rounded border-black"
             value={newProduct.qnt}
             onChange={handleInputChange}
             required
           />
            {/* Price Input */}
            <input
             type="number"
             name="price"
             placeholder="Price"
             className="w-full mb-4 p-3 border rounded border-black"
             value={newProduct.price}
             onChange={handleInputChange}
             required
           />
           <div className="flex justify-end gap-2">
             <button
               type="button"
               className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
               onClick={() => setShowModal(false)}
             >
               Cancel
             </button>
             <button
               type="submit"
               className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
             >
               Save
             </button>
           </div>
         </form>
       </div>
     </div>
   )}
 {/* Popup for Viewing Product */}
 {showPopup && selectedProduct && (
     <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
       <div className="bg-white rounded-lg p-4 w-full max-w-xs x-small:ml-12 x-small:max-w-60 medium:max-w-xs large:max-w-sm">
         <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
         <p><strong>Supplier Name:</strong> {selectedProduct.sname}</p>
         <p><strong>Phone Number:</strong> {selectedProduct.phone}</p>
         <p><strong>Address:</strong> {selectedProduct.add}</p>
         <p><strong>ID:</strong> {selectedProduct.id}</p>
         <p><strong>Product Name:</strong> {selectedProduct.pname}</p>
         <p><strong>Categories:</strong> {selectedProduct.categories}</p>
         <p><strong>Quantity:</strong> {selectedProduct.qnt}</p>
         <p><strong>Price:</strong> {selectedProduct.price}</p>
         <button
           className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
           onClick={() => setShowPopup(false)}
         >
           Close
         </button>
       </div>
     </div>
   )}
 </div>
);
};

export default Purchase;