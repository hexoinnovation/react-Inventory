import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { IoBagAdd } from "react-icons/io5";
import { BsFiletypePdf } from "react-icons/bs";
import { IoPersonAdd } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineAddCircle } from "react-icons/md";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  writeBatch,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { auth } from "../config/firebase"; // Make sure you have firebase authentication set up
import { useAuthState } from "react-firebase-hooks/auth"; // To get current user

const EmployeeDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    id: "",
    employee: "",
    address: "",
    phone: "",
   
    pan: "",
    aadhar: "",
    type: "",
  });

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
      id: "",
      employee: "",
      address: "",
      phone: "",
     
      pan: "",
    aadhar: "",
    type: "",
    });
  };

  // Handle removing all products for a supplier
  const handleRemoveProduct = async (Suppliername) => {
    try {
      // Reference to the user's product collection
      const userCollectionRef = collection(
        db,
        "admins",
        user.email,
        "products"
      );

      // Get all products for this supplier
      const supplierQuery = query(
        userCollectionRef,
        where("sname", "==", Suppliername)
      );
      const querySnapshot = await getDocs(supplierQuery);

      // Delete each product document that matches the supplier name
      const batch = writeBatch(db);
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();

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
      setProductName("");
      setProductPrice("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-10">
      <h1 className="text-4xl font-bold text-gray-600">Employees Details</h1>

      <div className="flex justify-between mt-10 ">
        <div></div>
        {/* Category Filter Dropdown */}
        {/* <div className="relative w-40">
          <label htmlFor="category-filter" className="sr-only">
            Filter by Category
          </label>
          <select
            id="category-filter"
            value=""
            className="block w-full p-2 text-sm text-black border border-gray-500 rounded-lg bg-gray-50"
          >
            <option value="">All Categories</option>
            <option value="Laptop">Laptop</option>
            <option value="Smartphone">Smartphone</option>
            <option value="Tablet">Tablet</option>
          </select>
        </div> */}

        {/* Create Purchase Order and Download Button */}
        <div className="flex x-small:flex-col medium:flex-row gap-2 x-small:ml-10 ">
          <button
            className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 mr-4"
            onClick={() => setShowModal(true)}
          >
            <div className="flex gap-1 ">
              <span className="text-xl ">
                <IoPersonAdd />
              </span>
              <span className="text-base font-bold">ADD Employee</span>
            </div>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg mt-10">
        <table className="w-full text-sm text-left text-white">
          <thead className="text-xs text-black uppercase bg-blue-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Employee Name
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>

              <th scope="col" className="px-6 py-3">
                Phone no
              </th>
              <th scope="col" className="px-6 py-3">
                PAN Number
              </th>
              <th scope="col" className="px-6 py-3">
                Adhar Number
              </th>
              <th scope="col" className="px-6 py-3">
                Job Type
              </th>
           
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-200 text-black">
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{product.id}</td>
                <td className="px-6 py-4 font-medium">{product.employee}</td>
                <td className="px-6 py-4">{product.address}</td>
                <td className="px-6 py-4">{product.phone}</td>
             
                <td className="px-6 py-4">{product.pan}</td>
                <td className="px-6 py-4">{product.aadhar}</td>
                <td className="px-6 py-4">{product.type}</td>

                <td className="px-6 py-4">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => {
                      setShowPopup(true);
                      setSelectedProduct(product);
                    }}
                  >
                    <AiOutlineEye className="text-blue-600 text-xl  ml-1" />
                  </button>

                  {/* Edit Icon */}
                  <button
                    className="text-green-600 hover:underline text-xl ml-1"
                    onClick={() => {
                      setEditPopup(true);
                      setSelectedProduct(product);
                    }}
                  >
                    <FaEdit className="text-green-600 text-xl " />
                  </button>

                  {/* Delete Icon */}
                  <button
                    className="text-red-600 hover:underline  ml-1"
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
        <div className="fixed inset-0 flex  items-center justify-center bg-gray-800 bg-opacity-50 z-50  ">
          <div className="bg-blue-200 rounded-lg p-4 mt-10 w-full max-w-xs x-small:ml-12 x-small:max-w-60 medium:max-w-lg large:max-w-lg extra-large:max-w-lg xx-large:max-w-lg max-h-[80vh] overflow-y-auto shadow-lg">
            <h2 className="text-2xl font-serif text-teal-600 mb-4">
              Create Employee List
            </h2>
            <form onSubmit={handleFormSubmit}>
              {/* Supplier Name Input */}
              <div className=" flex x-small:flex-col medium:flex-row w-full">
                <div className="mb-4 medium:w-3/4">
                  <label
                    htmlFor="id"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    ID
                  </label>
                  <input
                    type="number"
                    name="id"
                    id="id"
                    placeholder="Enter Employee ID"
                    className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    value={newProduct.id}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Phone Input */}
                <div className="mb-4 medium:ml-5 medium:w-3/4">
                  <label
                    htmlFor="Employee Name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Employee Name
                  </label>
                  <input
                    type="text"
                    name="employee"
                    id="employee"
                    placeholder="Enter Employee Name"
                    className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    value={newProduct.employee}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Address Input */}
              <div className=" flex x-small:flex-col medium:flex-row w-full">
                <div className="mb-4  medium:w-3/4">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Enter address"
                    className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    value={newProduct.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* ID Input */}
                <div className="mb-4  medium:ml-5  medium:w-3/4">
                  <label
                    htmlFor="Phone no"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone no
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Enter Phone Number"
                    className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    value={newProduct.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Product Name Input */}
              <div className=" flex x-small:flex-col medium:flex-row w-full">
              <div className="mb-4   medium:w-3/4">
                  <label
                    htmlFor="PAN no"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    PAN Number
                  </label>
                  <input
                    type="number"
                    name="pan"
                    id="pan"
                    placeholder="Enter PAN Number"
                    className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    value={newProduct.pan}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              <div className="mb-4 w-3/4 medium:ml-5">
                  <label
                    htmlFor="aadhar"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Aadhar
                  </label>
                  <input
                    type="number"
                    name="aadhar"
                    id="aadhar"
                    placeholder="aadhar"
                    className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    value={newProduct.aadhar}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {/* Categories Input */}
               
               
              </div>

              <div className=" flex x-small:flex-col medium:flex-row w-full">
                {/* Categories Input */}
                
                <div className="mb-4   medium:w-2/4">
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Job Type
                  </label>
                  <input
                    type="text"
                    name="type"
                    id="type"
                      placeholder="Enter type Number"
                    className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    value={newProduct.type}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-teal-500 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editPopup && (
       <div className="fixed inset-0 flex  items-center justify-center bg-gray-800 bg-opacity-50 z-50  ">
       <div className="bg-blue-200 rounded-lg p-4 mt-10 w-full max-w-xs x-small:ml-12 x-small:max-w-60 medium:max-w-lg large:max-w-lg extra-large:max-w-lg xx-large:max-w-lg max-h-[80vh] overflow-y-auto shadow-lg">
         <h2 className="text-2xl font-serif text-teal-600 mb-4">
           Create Employee List
         </h2>
         <form onSubmit={handleFormSubmit}>
           {/* Supplier Name Input */}
           <div className=" flex x-small:flex-col medium:flex-row w-full">
             <div className="mb-4 medium:w-3/4">
               <label
                 htmlFor="id"
                 className="block text-sm font-medium text-gray-700 mb-1"
               >
                 ID
               </label>
               <input
                 type="number"
                 name="id"
                 id="id"
                 placeholder="Enter Employee ID"
                 className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                 value={newProduct.id}
                 onChange={handleInputChange}
                 required
               />
             </div>

             {/* Phone Input */}
             <div className="mb-4 medium:ml-5 medium:w-3/4">
               <label
                 htmlFor="Employee Name"
                 className="block text-sm font-medium text-gray-700 mb-1"
               >
                 Employee Name
               </label>
               <input
                 type="text"
                 name="employee"
                 id="employee"
                 placeholder="Enter Employee Name"
                 className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                 value={newProduct.employee}
                 onChange={handleInputChange}
                 required
               />
             </div>
           </div>

           {/* Address Input */}
           <div className=" flex x-small:flex-col medium:flex-row w-full">
             <div className="mb-4  medium:w-3/4">
               <label
                 htmlFor="address"
                 className="block text-sm font-medium text-gray-700 mb-1"
               >
                 Address
               </label>
               <input
                 type="text"
                 name="address"
                 id="address"
                 placeholder="Enter address"
                 className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                 value={newProduct.address}
                 onChange={handleInputChange}
                 required
               />
             </div>

             {/* ID Input */}
             <div className="mb-4  medium:ml-5  medium:w-3/4">
               <label
                 htmlFor="Phone no"
                 className="block text-sm font-medium text-gray-700 mb-1"
               >
                 Phone no
               </label>
               <input
                 type="text"
                 name="phone"
                 id="phone"
                 placeholder="Enter Phone Number"
                 className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                 value={newProduct.phone}
                 onChange={handleInputChange}
                 required
               />
             </div>
           </div>

           {/* Product Name Input */}
           <div className=" flex x-small:flex-col medium:flex-row w-full">
           <div className="mb-4   medium:w-3/4">
               <label
                 htmlFor="PAN no"
                 className="block text-sm font-medium text-gray-700 mb-1"
               >
                 PAN Number
               </label>
               <input
                 type="number"
                 name="pan"
                 id="pan"
                 placeholder="Enter PAN Number"
                 className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                 value={newProduct.pan}
                 onChange={handleInputChange}
                 required
               />
             </div>
           <div className="mb-4 w-3/4 medium:ml-5">
               <label
                 htmlFor="aadhar"
                 className="block text-sm font-medium text-gray-700 mb-1"
               >
                 Aadhar
               </label>
               <input
                 type="number"
                 name="aadhar"
                 id="aadhar"
                 placeholder="aadhar"
                 className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                 value={newProduct.aadhar}
                 onChange={handleInputChange}
                 required
               />
             </div>
             {/* Categories Input */}
            
            
           </div>

           <div className=" flex x-small:flex-col medium:flex-row w-full">
             {/* Categories Input */}
             
             <div className="mb-4   medium:w-2/4">
               <label
                 htmlFor="type"
                 className="block text-sm font-medium text-gray-700 mb-1"
               >
                 Job Type
               </label>
               <input
                 type="text"
                 name="type"
                 id="type"
                   placeholder="Enter type Number"
                 className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                 value={newProduct.type}
                 onChange={handleInputChange}
                 required
               />
             </div>
           </div>

           <div className="flex justify-end gap-2 mt-4">
             <button
               type="button"
               className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
               onClick={() => setEditPopup(false)}
             >
               Cancel
             </button>
             <button
               type="submit"
               className="px-4 py-2 text-white bg-teal-500 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
             >
               Save
             </button>
           </div>
         </form>
       </div>
     </div>
      )}

      {/* /* Popup for Viewing Product */}
      {showPopup && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-xs x-small:ml-12 x-small:max-w-60 medium:max-w-xs large:max-w-sm">
            <h2 className="text-2xl font-semibold mb-4">Employee Details</h2>
            <p>
              <strong>ID:</strong> {selectedProduct.id}
            </p>
            <p>
              <strong>Employee Name:</strong> {selectedProduct.employee}
            </p>
            <p>
              <strong>Address:</strong> {selectedProduct.address}
            </p>
            <p>
              <strong>Phone No:</strong> {selectedProduct.phone}
            </p>
           
            <p>
              <strong>PAN Number:</strong> {selectedProduct.pan}
            </p>
            <p>
              <strong>Aadhar Number:</strong> {selectedProduct.aadhar}
            </p>
            <p>
              <strong>Job Type:</strong> {selectedProduct.type}
            </p>

            <button
              className="mt-4 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
            <button className="mt-4 px-3 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 ml-2">
              <BsFiletypePdf className="w-5 h-6 inline mr-1" />
              <span>Print</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
