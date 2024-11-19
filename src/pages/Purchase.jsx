import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { IoBagAdd } from "react-icons/io5";
import { BsFiletypePdf } from "react-icons/bs";
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
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { auth } from "../config/firebase"; // Make sure you have firebase authentication set up
import { useAuthState } from "react-firebase-hooks/auth"; // To get current user

const Purchase = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [viewPopup, setViewPopup] = useState(false);
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

  // Get the current logged-in user
  const [user] = useAuthState(auth); // Returns current authenticated user

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please log in to add a product.");
      return;
    }

    // Add the new product to the products list in state
    setProducts((prev) => [...prev, { ...newProduct, id: prev.length + 1 }]);

    try {
      const userEmail = user.email; // Get the email of the logged-in user

      // Create a document reference for the user in Firestore
      const userDocRef = doc(db, "admins", userEmail); // Reference to the 'admins' collection using the user's email
      const productRef = collection(userDocRef, "Purchase"); // Reference to the 'products' subcollection

      // Set the product document
      await setDoc(doc(productRef, newProduct.phone), newProduct);

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

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user) return; // If no user is logged in, skip fetching

      try {
        const userEmail = user.email; // Get the logged-in user's email
        const userDocRef = doc(db, "admins", userEmail); // Reference to the 'admins' collection
        const productsRef = collection(userDocRef, "Purchase"); // Reference to the 'Purchase' subcollection

        const productSnapshot = await getDocs(productsRef); // Fetch the products from the 'Purchase' subcollection
        const productList = productSnapshot.docs.map((doc) => doc.data()); // Map the documents to an array of data

        setProducts(productList); // Set the products in state
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, [user]);

  const updateProduct = async (updatedProduct) => {
    if (!user) {
      alert("Please log in to update a product.");
      return;
    }
  
    try {
      const userEmail = user.email; // Logged-in user's email
      const userDocRef = doc(db, "admins", userEmail); // Admins collection reference
      const productDocRef = doc(userDocRef, "Purchase", updatedProduct.phone); // Reference to product doc by phone
  
      // Update Firestore document, merging fields
      await setDoc(productDocRef, updatedProduct, { merge: true });
  
      alert("Product updated successfully!");
  
      // Update local state
      setProducts((prev) =>
        prev.map((product) =>
          product.phone === updatedProduct.phone ? updatedProduct : product
        )
      );
  
      setEditPopup(false); // Close the modal
    } catch (error) {
      console.error("Error updating product in Firestore:", error);
      alert("There was an error updating the product. Please try again.");
    }
  };
  
  
  const handleRemoveProduct = async (sname) => {
    try {
      // Get the logged-in user's email
      const userEmail = user.email;

      // Reference to the user's products collection in Firestore
      const userDocRef = doc(db, "admins", userEmail);
      const productRef = doc(userDocRef, "Purchase", sname); // Reference to the product document

      // Delete the product from Firestore
      await deleteDoc(productRef);

      // Remove the product from the local state without needing to refetch
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.sname !== sname)
      );

      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product: ", error);
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

  const handlePrint = () => {
    const content = document.getElementById("productTable"); // Get the table element by its ID
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
      <h1 className="text-4xl font-bold text-gray-700">Purchase</h1>

      <div className="flex flex-end justify-between mt-10 ">
        <div></div>

        {/* Create Purchase Order and Download Button */}
        <div className="flex x-small:flex-col medium:flex-row gap-2 x-small:ml-10 ">
          <button
            className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
            onClick={() => setShowModal(true)}
          >
            <div className="flex gap-1">
              <span className="text-2xl">
                <IoBagAdd />
              </span>
              <span className="text-base font-bold">Create</span>
            </div>
          </button>
          <button
            className="px-1 py-1 text-white font-bold bg-blue-500 rounded-full hover:bg-blue-600 w-24"
            onClick={handlePrint}
          >
            <BsFiletypePdf className="w-5 h-6 inline mr-1" />
            <span>Print</span>
          </button>{" "}
          {/* Ensure this closing tag is present */}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg mt-10">
        <table
          id="productTable"
          className="w-full text-sm text-left text-white"
        >
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
                Product ID
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
            {products.map((product) => (
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

                  <button
  className="text-green-600 hover:underline ml-1"
  onClick={() => {
    setEditPopup(true); // Open the edit popup modal
    setNewProduct(product); // Populate form with the selected product details
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
        <div className="fixed inset-0 flex  items-center justify-center bg-gray-800 bg-opacity-50 z-50  ">
          <div className="bg-blue-200 rounded-lg p-4 mt-10 w-full max-w-xs x-small:ml-12 x-small:max-w-60 medium:max-w-lg large:max-w-lg extra-large:max-w-lg xx-large:max-w-lg max-h-[80vh] overflow-y-auto shadow-lg">
            <h2 className="text-2xl font-serif text-teal-600 mb-4">
              Create Purchase Order
            </h2>
            <form onSubmit={handleFormSubmit}>
              {/* Supplier Name Input */}
              <div className=" flex x-small:flex-col medium:flex-row w-full">
                <div className="mb-4 medium:w-3/4">
                  <label
                    htmlFor="sname"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Supplier Name
                  </label>
                  <input
                    type="text"
                    name="sname"
                    id="sname"
                    placeholder="Enter Supplier Name"
                    className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    value={newProduct.sname}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Phone Input */}
                <div className="mb-4 medium:ml-5 medium:w-3/4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
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

              {/* Address Input */}
              <div className=" flex x-small:flex-col medium:flex-row w-full">
                <div className="mb-4  medium:w-3/4">
                  <label
                    htmlFor="add"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="add"
                    id="add"
                    placeholder="Enter Address"
                    className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    value={newProduct.add}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* ID Input */}
                <div className="mb-4  medium:ml-5  medium:w-3/4">
                  <label
                    htmlFor="id"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    ID
                  </label>
                  <input
                    type="text"
                    name="id"
                    id="id"
                    placeholder="Enter ID"
                    className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    value={newProduct.id}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Product Name Input */}
              <div className=" flex x-small:flex-col medium:flex-row w-full">
                <div className="mb-4  medium:w-3/4">
                  <label
                    htmlFor="pname"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="pname"
                    id="pname"
                    placeholder="Enter Product Name"
                    className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    value={newProduct.pname}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Categories Input */}
                <div className="mb-4  medium:ml-5  medium:w-3/4">
                  <label
                    htmlFor="qnt"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="qnt"
                    id="qnt"
                    placeholder="Enter Quantity"
                    className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    value={newProduct.qnt}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Quantity Input */}
              <div className=" flex x-small:flex-col medium:flex-row w-full">
                <div className="mb-4   medium:w-3/4">
                  <label
                    htmlFor="categories"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Categories
                  </label>
                  <input
                    type="text"
                    name="categories"
                    id="categories"
                    placeholder="Enter Categories"
                    className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    value={newProduct.categories}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Price Input */}
                <div className="mb-4  medium:ml-5  medium:w-3/4">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Enter Price"
                    className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    value={newProduct.price}
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

      {/* Modal for Editing Purchase Order */}
      {editPopup && (
        <div className="fixed inset-0 flex  items-center justify-center bg-gray-800 bg-opacity-50 z-50  ">
          <div className="bg-blue-200 rounded-lg p-4 mt-10 w-full max-w-xs x-small:ml-12 x-small:max-w-60 medium:max-w-lg large:max-w-lg extra-large:max-w-lg xx-large:max-w-lg max-h-[80vh] overflow-y-auto shadow-lg">
            <h2 className="text-2xl font-serif text-teal-600 mb-4">
              Edit Purchase Order
            </h2>
            <form
        onSubmit={(e) => {
          e.preventDefault();
          updateProduct(newProduct); // Call the updateProduct function
        }}
      >
              {/* Supplier Name Input */}
              <div className=" flex x-small:flex-col medium:flex-row w-full">
                <div className="mb-4 medium:w-3/4">
                  <label
                    htmlFor="sname"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Supplier Name
                  </label>
                  <input
                    type="text"
                    name="sname"
                    id="sname"
                    placeholder="Enter Supplier Name"
                    className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    value={newProduct.sname}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Phone Input */}
                <div className="mb-4 medium:ml-5 medium:w-3/4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
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

              {/* Address Input */}
              <div className=" flex x-small:flex-col medium:flex-row w-full">
                <div className="mb-4  medium:w-3/4">
                  <label
                    htmlFor="add"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="add"
                    id="add"
                    placeholder="Enter Address"
                    className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    value={newProduct.add}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* ID Input */}
                <div className="mb-4  medium:ml-5  medium:w-3/4">
                  <label
                    htmlFor="id"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    ID
                  </label>
                  <input
                    type="text"
                    name="id"
                    id="id"
                    placeholder="Enter ID"
                    className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    value={newProduct.id}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Product Name Input */}
              <div className=" flex x-small:flex-col medium:flex-row w-full">
                <div className="mb-4  medium:w-3/4">
                  <label
                    htmlFor="pname"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="pname"
                    id="pname"
                    placeholder="Enter Product Name"
                    className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    value={newProduct.pname}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Categories Input */}
                <div className="mb-4  medium:ml-5  medium:w-3/4">
                  <label
                    htmlFor="qnt"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="qnt"
                    id="qnt"
                    placeholder="Enter Quantity"
                    className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    value={newProduct.qnt}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Quantity Input */}
              <div className=" flex x-small:flex-col medium:flex-row w-full">
                <div className="mb-4   medium:w-3/4">
                  <label
                    htmlFor="categories"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Categories
                  </label>
                  <input
                    type="text"
                    name="categories"
                    id="categories"
                    placeholder="Enter Categories"
                    className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    value={newProduct.categories}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Price Input */}
                <div className="mb-4  medium:ml-5  medium:w-3/4">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Enter Price"
                    className="w-full p-1 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    value={newProduct.price}
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
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewPopup && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-xs x-small:ml-12 x-small:max-w-60 medium:max-w-xs large:max-w-sm">
            <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
            <p>
              <strong>Supplier Name:</strong> {selectedProduct.sname}
            </p>
            <p>
              <strong>Phone Number:</strong> {selectedProduct.phone}
            </p>
            <p>
              <strong>Address:</strong> {selectedProduct.add}
            </p>
            <button
              className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* /* Popup for Viewing Product */}
      {showPopup && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-xs x-small:ml-12 x-small:max-w-60 medium:max-w-xs large:max-w-sm">
            <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
            <p>
              <strong>Supplier Name:</strong> {selectedProduct.sname}
            </p>
            <p>
              <strong>Phone Number:</strong> {selectedProduct.phone}
            </p>
            <p>
              <strong>Address:</strong> {selectedProduct.add}
            </p>
            <p>
              <strong>ID:</strong> {selectedProduct.id}
            </p>
            <p>
              <strong>Product Name:</strong> {selectedProduct.pname}
            </p>
            <p>
              <strong>Categories:</strong> {selectedProduct.categories}
            </p>
            <p>
              <strong>Quantity:</strong> {selectedProduct.qnt}
            </p>
            <p>
              <strong>Price:</strong> {selectedProduct.price}
            </p>
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
