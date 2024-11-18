import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { BsFiletypePdf } from "react-icons/bs";
import { IoPersonAdd } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";

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

const Attendence = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    id: "",
    date: "",
    employee: "",
    phone: "",
    attendance: "",
  });


const handleAttendanceToggle = async (id) => {
    const currentDate = new Date();
    const currentMonth = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`; // Format: YYYY-MM
    const currentDay = currentDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  
    // Firestore paths
    const userDocRef = doc(db, "admins", userEmail); // Replace `userEmail` with the logged-in user's email
    const attendanceCollectionRef = collection(userDocRef, "Attendance");
    const monthCollectionRef = collection(attendanceCollectionRef, currentMonth);
    const dayDocRef = doc(monthCollectionRef, currentDay);
  
    // Toggle attendance locally and update Firestore
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) => {
        if (product.id === id) {
          const updatedAttendance =
            product.attendance === "present" ? "absent" : "present";
  
          // Firestore update for the toggled product
          const productData = {
            [product.id]: {
              EmployeeName: product.employee,
              Phone: product.phone,
              Attendance: updatedAttendance,
            },
          };
  
          setDoc(dayDocRef, productData, { merge: true })
            .then(() => {
              console.log("Attendance updated successfully in Firestore");
            })
            .catch((error) => {
              console.error("Error updating Firestore:", error);
            });
  
          // Return the updated product with toggled attendance
          return {
            ...product,
            attendance: updatedAttendance,
          };
        }
        return product;
      });
  
      return updatedProducts;
    });
  };






  
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
      date: "",
      employee: "",
      phone: "",
      attendance: "",
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

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user) return; // If no user is logged in, skip fetching

      try {
        const userEmail = user.email; // Get the logged-in user's email
        const userDocRef = doc(db, "admins", userEmail); // Reference to the 'admins' collection
        const productsRef = collection(userDocRef, "EmpDetails"); // Reference to the 'Purchase' subcollection

        const productSnapshot = await getDocs(productsRef); // Fetch the products from the 'Purchase' subcollection
        const productList = productSnapshot.docs.map((doc) => doc.data()); // Map the documents to an array of data

        setProducts(productList); // Set the products in state
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, [user]);


  const handlePrint = () => {
    const content = document.getElementById("AttendenDetails"); // Get the table element by its ID
    const printWindow = window.open("", "", "height=500, width=800"); // Open a new window for printing

    printWindow.document.write("<html><head><title>Print</title>"); // Set the document's title
    printWindow.document.write("<style>"); // Add custom styles for the print window
    printWindow.document.write(
      "table { width: 100%; border-collapse: collapse; }"
    );
    printWindow.document.write(
      "td, th { padding: 10px; border: 1px solid #ddd; text-align: left; }"
    );
    printWindow.document.write("th { background-color: #f0f0f0; }"); // Optional: Add background for headers
    printWindow.document.write("</style></head><body>");

    printWindow.document.write(content.outerHTML); // Add the table content to the print window
    printWindow.document.write("</body></html>");

    printWindow.document.close(); // Close the document for printing
    printWindow.print(); // Open the print dialog
  };



  return (
    <div className="container mx-auto p-4 mt-10">
      <h1 className="text-4xl font-bold text-gray-600">Attendance</h1>

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
            // className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 mr-4"
            onClick={() => setShowModal(true)}
          >
            {/* <div className="flex gap-1 ">
              <span className="text-xl ">
                <IoPersonAdd />
              </span>
              <span className="text-base font-bold">ADD Employee</span>
            </div> */}
          </button>
          <button
            className="px-1 py-1 text-white font-bold bg-blue-500 rounded-full hover:bg-blue-600 w-24"
            onClick={handlePrint}
          >
            <BsFiletypePdf className="w-5 h-6 inline mr-1" />
            <span>Print</span>
          </button>{" "}
        </div>
      </div>

      {/* Table */}
      <div id="AttendenDetails" className="overflow-x-auto shadow-md sm:rounded-lg  mt-10 ">
        <div  className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-white">
            <thead className="text-xs text-black uppercase bg-blue-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Date
                </th>
                
                <th scope="col" className="px-6 py-3">
                  Employee Name
                </th>

                <th scope="col" className="px-6 py-3">
                  Phone no
                </th>

                <th scope="col" className="px-6 py-3">
                Job Type
              </th>

                {/* New Attendance Column */}
                <th scope="col" className="px-6 py-3">
                  Attendance
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Action
                </th> */}
              </tr>
            </thead>
            <tbody className="bg-gray-200 text-black">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className={`border-b  ${
                    product.attendance === "present"
                      ? "bg-green-400"
                      : "bg-red-400"
                  }`}
                >
                  <td className="px-6 py-4 font-medium">{product.id}</td>
                  <td className="px-6 py-4">{product.date}
                  <th scope="col" className="px-6 py-3">
                    {new Date().toISOString().split("T")[0]} {/* Formats as YYYY-MM-DD */}
                  </th>
                  </td>
                  <td className="px-6 py-4 font-medium">{product.employee}</td>
                  <td className="px-6 py-4">{product.phone}</td>
                  <td className="px-6 py-4">{product.type}</td>
                  
                  {/* Attendance Toggle */}
                  <td className="px-6 py-4 flex">
                    {product.attendance === "present" ? "Present" : "Absent"}
                    <label className="flex items-center cursor-pointer ml-2">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={product.attendance === "present"}
                          onChange={() => handleAttendanceToggle(product.id)}
                          className="hidden"
                        />
                        <div
                          className={`toggle ${
                            product.attendance === "present"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                          style={{
                            width: "40px",
                            height: "20px",
                            borderRadius: "9999px",
                            position: "relative",
                          }}
                        >
                          <div
                            className={`dot ${
                              product.attendance === "present"
                                ? "translate-x-5"
                                : "translate-x-0"
                            }`}
                            style={{
                              width: "16px",
                              height: "16px",
                              borderRadius: "50%",
                              backgroundColor: "white",
                              position: "absolute",
                              top: "2px",
                              transition: "transform 0.3s ease",
                            }}
                          ></div>
                        </div>
                      </div>
                    </label>
                  </td>
                  {/* <td className="px-6 py-4">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => {
                        setShowPopup(true);
                        setSelectedProduct(product);
                      }}
                    >
                      <AiOutlineEye className="text-blue-600 text-xl ml-1" />
                    </button> */}

                    {/* Edit Icon */}
                    {/* <button
                      className="text-green-600 hover:underline text-xl ml-1"
                      onClick={() => {
                        setEditPopup(true);
                        setSelectedProduct(product);
                      }}
                    >
                      <FaEdit className="text-green-600 text-xl" />
                    </button> */}

                    {/* Delete Icon */}
                    {/* <button
                      className="text-red-600 hover:underline ml-1"
                      onClick={() => handleRemoveProduct(product.sname)}
                    >
                      <RiDeleteBin5Line className="text-red-600 text-xl" />
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
                    htmlFor="Date"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    placeholder="Date"
                    className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    value={newProduct.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Address Input */}
              <div className=" flex x-small:flex-col medium:flex-row w-full">
                <div className="mb-4 medium:w-3/4">
                  <label
                    htmlFor="employee name"
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

              <div className=" flex x-small:flex-col medium:flex-row w-full">
                {/* Categories Input */}

                <div className="mb-4 w-2/4 ">
                  <label
                    htmlFor="attendance"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Attendance
                  </label>
                  <input
                    type="text"
                    name="attendance"
                    id="attendance"
                    placeholder="attendance"
                    className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    value={newProduct.attendance}
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
                    htmlFor="Date"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    placeholder="Date"
                    className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    value={newProduct.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Address Input */}
              <div className=" flex x-small:flex-col medium:flex-row w-full">
                <div className="mb-4  medium:w-3/4">
                  <label
                    htmlFor="Employee Name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Employee Name
                  </label>
                  <input
                    type="text"
                    name="employee "
                    id="employee "
                    placeholder="Enter Employee Name"
                    className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    value={newProduct.employee}
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

              <div className=" flex x-small:flex-col medium:flex-row w-full">
                {/* Categories Input */}

                <div className="mb-4 w-3/4 ">
                  <label
                    htmlFor="attendance"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Attendance
                  </label>
                  <input
                    type="text"
                    name="attendance"
                    id="attendance"
                    placeholder="attendance"
                    className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    value={newProduct.attendance}
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
            <p>
              <strong>Attendance:</strong> {selectedProduct.attendance}
            </p>

            <button
              className="mt-4 px-4 py-2 text-white bg-b-500 rounded-lg hover:bg-red-600"
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

export default Attendence;
