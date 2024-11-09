import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { AiOutlineDownload, AiOutlineEye } from 'react-icons/ai'; // Correct, no need to import AiOutlineDownload twice
import { MdOutlineAddCircle } from "react-icons/md";
import { doc, setDoc, collection, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { auth } from '../config/firebase'; // Make sure you have firebase authentication set up
import { useAuthState } from 'react-firebase-hooks/auth'; // To get current user
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';



const Purchase = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    color: '',
    category: '',
    price: '',
  });

  // Get the current logged-in user
  const [user] = useAuthState(auth); // Returns current authenticated user
  // Fetch products when the component mounts or when the user changes
  useEffect(() => {
    const fetchProducts = async () => {
      if (!user) return; // Only fetch if the user is logged in
      try {
        const userEmail = user.email; // Get the email of the logged-in user
        const userDocRef = doc(db, "admins", userEmail); // Reference to the 'admins' collection using the user's email
        const productRef = collection(userDocRef, "products"); // Reference to the 'products' subcollection

        const productSnapshot = await getDocs(productRef); // Fetch all products
        const productList = productSnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id, // Include the document ID as the 'id' for the product
        }));
        setProducts(productList); // Update state with the fetched products
      } catch (error) {
        console.error("Error fetching products from Firestore: ", error);
      }
    };

    fetchProducts();
  }, [user]); // Run this effect when the user changes (logged in/out)

  // Handle form submission to add new product and store in Firebase
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please log in to add a product.");
      return;
    }

    try {
      const userEmail = user.email; // Get the email of the logged-in user
      const userDocRef = doc(db, "admins", userEmail); // Reference to the 'admins' collection using the user's email
      const productRef = collection(userDocRef, "products"); // Reference to the 'products' subcollection

      // Add the new product to Firestore
      await setDoc(doc(productRef, newProduct.name), newProduct);

      alert("Product added successfully!");

      // After adding the product, fetch the updated list
      const productSnapshot = await getDocs(productRef);
      const productList = productSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(productList); // Update state with the fetched products
    } catch (error) {
      console.error("Error adding product to Firestore: ", error);
    }

    setShowModal(false);
    setNewProduct({ name: '', color: '', category: '', price: '' });
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Function to remove product from Firestore and update the state
  const handleRemoveProduct = async (productName) => {
    console.log("Removing product with name: ", productName); // Debugging log

    if (!user) {
      alert("Please log in to remove a product.");
      return;
    }

    try {
      const userEmail = user.email;

      // Reference to the product document using the product name as the document ID
      const productDocRef = doc(db, "admins", userEmail, "products", productName);
      
      // Delete the product document from Firestore
      await deleteDoc(productDocRef);

      // Remove from local state after deletion
      setProducts((prevProducts) => {
        const updatedProducts = prevProducts.filter((product) => product.name !== productName);
        console.log("Updated Products: ", updatedProducts); // Debugging log
        return updatedProducts;
      });

      alert("Product removed successfully!");
    } catch (error) {
      console.error("Error removing product from Firestore: ", error.message);
      alert(`Error removing product: ${error.message}`);
    }

    // Close the popup after deletion
    setShowPopup(false);
  };

  const handleDownload = async (userDocRef) => {
    try {
      // Reference to the 'products' collection
      const productRef = collection(userDocRef, "products");
  
      // Fetch data from Firestore
      const querySnapshot = await getDocs(productRef);
      const data = querySnapshot.docs.map(doc => doc.data()); // Extract data from documents
  
      // Create Excel sheet
      const ws = XLSX.utils.json_to_sheet(data); // Convert Firestore data to Excel sheet
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  
      // Write Excel file
      XLSX.writeFile(wb, "products.xlsx");
  
    } catch (error) {
      console.error("Error downloading products:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-10">
      {/* Search and Button Section */}
      <div className="flex justify-between mb-4">
        {/* Search Bar */}
        <div className="relative w-40 flex items-center">
          <label htmlFor="table-search" className="sr-only">Search</label>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="w-4 h-4 text-gray-600" />
          </div>
          <input
            type="text"
            id="table-search"
            className="block w-full pl-10 pr-4 py-2 text-sm text-black border border-gray-500 rounded-lg bg-gray-50"
            placeholder="Search for items"
          />
        </div>

        {/* Create Purchase Order and Download Button */}
        <div className="flex flex-col gap-2">
          <button
            className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
            onClick={() => setShowModal(true)}
          >
            <div className="flex gap-1">
              <span className="text-2xl"><MdOutlineAddCircle /></span>
              <span className="text-base">Create</span>
            </div>
          </button>

          <button
   onClick={() => handleDownload(doc(db, "admins", user.email))}
   className="px-2 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
>
  <AiOutlineDownload className="w-5 h-5 inline mr-2" />
  <span>SVC</span>
</button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-white">
          <thead className="text-xs text-black uppercase bg-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3">Product Name</th>
              <th scope="col" className="px-6 py-3">Color</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="bg-gray-200 text-black">
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{product.name}</td>
                <td className="px-6 py-4">{product.color}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">
                  <button
                    className="text-blue-600 hover:underline mr-2"
                    onClick={() => { setShowPopup(true); setSelectedProduct(product); }}
                  >
                    <AiOutlineEye className="inline mr-1" /> View
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
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-2xl font-semibold mb-4">Create Purchase Order</h2>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                className="w-full mb-4 p-3 border rounded"
                value={newProduct.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="color"
                placeholder="Color"
                className="w-full mb-4 p-3 border rounded"
                value={newProduct.color}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                className="w-full mb-4 p-3 border rounded"
                value={newProduct.category}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="price"
                placeholder="Price"
                className="w-full mb-4 p-3 border rounded"
                value={newProduct.price}
                onChange={handleInputChange}
                required
              />
              <div className="flex justify-between mt-4 gap-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* // Popup for Viewing Product Details */}
{showPopup && selectedProduct && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-xs relative">
      <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
      <p><strong>Name:</strong> {selectedProduct.name}</p>
      <p><strong>Color:</strong> {selectedProduct.color}</p>
      <p><strong>Category:</strong> {selectedProduct.category}</p>
      <p><strong>Price:</strong> {selectedProduct.price}</p>
      
      <div className="flex justify-end mt-4 gap-2">
      <button
  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
  onClick={() => handleRemoveProduct(selectedProduct.name)} // Pass product.name to remove the product
>
  Remove
</button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setShowPopup(false)}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Purchase;
