import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { AiOutlinePrinter } from "react-icons/ai"; // Import the printer icon
import { FiDownload } from "react-icons/fi";

const Invoice = () => {

   // State to track the modal visibility and type (customer/client)
   const [modalVisible, setModalVisible] = useState(false);
   const [modalType, setModalType] = useState(null); // 'customer' or 'client'


   const [image, setImage] = useState(null); // State to store the uploaded image

   // Handle file input change (i.e., when a user uploads an image)
   const handleFileChange = (e) => {
     const file = e.target.files[0];
     if (file) {
       const reader = new FileReader();
       reader.onloadend = () => {
         setImage(reader.result); // Set the uploaded image URL to the state
       };
       reader.readAsDataURL(file); // Convert the image file to a URL
     }
   };
 
 
   // State for customer and client details (you can update with actual data)
   const customerDetails = "Customer Name: John Doe\nEmail: john@example.com";
   const clientDetails = "Client Name: ABC Corp.\nEmail: abc@company.com";
 
   // Function to open the modal with appropriate details
   const openModal = (type) => {
     setModalType(type);
     setModalVisible(true);
   };
 
   // Function to close the modal
   const closeModal = () => {
     setModalVisible(false);
   };
 
  return (
    <div className="p-5">
      <div className="p-5 mx-auto bg-white  rounded-lg w-full max-w-60  x-small:max-w-lg medium:max-w-xl large:max-w-1xl extra-large:max-w-4xl xx-large:max-w-4xl   shadow-lg">
        <div className="flex justify-center mb-6">
          <h1 className="text-3xl font-bold text-blue-400">INVOICE</h1>
        </div>

        <div className="flex justify-around items-center mb-6 ">
        <div className="relative w-16 h-16 mb-2 x-small:mr-5 small:mr-0">
      <input
        type="file"
        accept="image/*" // Allow only image files
        onChange={handleFileChange}
        className="opacity-0 absolute w-full h-full cursor-pointer border rounded-lg"
      />
      
      {/* Display uploaded image if available, otherwise show the camera icon */}
      <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-lg border">
        {image ? (
          <img src={image} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
        ) : (
          <FaCamera className="text-black text-2xl" />
        )}
      </div>
    </div>

          <div className=" x-small:mr-3 small:mr-0">
            <div className="text-right">
              <label className="text-sm font-semibold">Status:</label>
              <select className="border p-1 rounded ml-2 " value="">
                <option className="hover:bg-blue-500">Paid</option>
                <option className="hover:bg-blue-500">Unpaid</option>
              </select>
            </div>
            <div className="text-right mt-3">
              <p className="text-sm font-semibold">
                Invoice Date:{" "}
                <input type="date" className="border rounded p-1" />
              </p>
            </div>
            <div className="text-right mt-3 ">
              <p className="text-sm font-semibold">
                Bill No:{" "}
                <span className="border rounded bg-white p-1">
                  {" "}
                  INV-12345-1
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Bill To / From Section */}
        <div className="grid grid-cols-1 medium:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="font-semibold">Bill To:</label>
          <button
            onClick={() => openModal('customer')}
            className="w-28 border rounded p-2 mt-1 ml-3 bg-blue-500 text-white"
          >
            Customer
          </button>
        </div>
        <div>
          <label className="font-semibold">From:</label>
          <button
            onClick={() => openModal('client')}
            className="w-28 border rounded p-2 mt-1 ml-3 bg-green-500 text-white"
          >
            Client
          </button>
        </div>
      </div>

      {/* Modal Popup for Customer/Client Details */}
      {modalVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">
              {modalType === 'customer' ? 'Customer Details' : 'Client Details'}
            </h2>
            <pre className="text-sm">
              {modalType === 'customer' ? customerDetails : clientDetails}
            </pre>
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

        {/* Product Table with Horizontal Scroll */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse border border-gray-400 text-sm">
            <thead>
              <tr>
                <th className="border border-gray-400 p-1">S.No</th>
                <th className="border border-gray-400 p-1">Product Name</th>
                <th className="border border-gray-400 p-1">Description</th>
                <th className="border border-gray-400 p-1">HSN Code</th>
                <th className="border border-gray-400 p-1">Quantity</th>
                <th className="border border-gray-400 p-1">Price</th>
                <th className="border border-gray-400 p-1">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 p-1 text-center">1</td>
                <td className="border border-gray-400 p-1">Product A</td>
                <td className="border border-gray-400 p-1">
                  Description of Product A
                </td>
                <td className="border border-gray-400 p-1">1234</td>
                <td className="border border-gray-400 p-1 text-center">1</td>
                <td className="border border-gray-400 p-1 text-right">$100</td>
                <td className="border border-gray-400 p-1 text-right">$100</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Summary Section */}

        <div className=" flex flex-row justify-around mb-4">
          <div>
            <label className="font-semibold">Tax :</label>
            <select className="border p-1 rounded ml-2 ">
              <option className="hover:bg-blue-500">CGST%</option>
              <option className="hover:bg-blue-500">IGST%</option>
              <option className="hover:bg-blue-500">SGST%</option>
            </select>
          </div>

          <div className="text-right mb-4">
            <p>
              Subtotal: <span className="font-semibold">$100</span>
            </p>
            <p>
              Tax: <span className="font-semibold">$5</span>
            </p>
            <p>
              Grand Total: <span className="font-semibold">$105</span>
            </p>
          </div>
        </div>

        <div className="flex x-small:flex-col medium:flex-row gap-4 mb-4">
          <div>
            <label className="font-semibold">Shipping Method:</label>
            <select className="border p-1 rounded ml-2 ">
              <option className="hover:bg-blue-500">DTDC</option>
              <option className="hover:bg-blue-500">Safe Express </option>
              <option className="hover:bg-blue-500">Custom</option>
            </select>
          </div>
          <div>
            <label className="font-semibold">Payment Method:</label>
            <select className="border p-1 rounded ml-2 ">
              <option className="hover:bg-blue-500">Credit Card</option>
              <option className="hover:bg-blue-500">Bank Transfer</option>
              <option className="hover:bg-blue-500">Cash</option>
            </select>
          </div>
        </div>

        {/* Note and Signature Section */}
        <div className="flex  x-small:flex-col medium:flex-row justify-around items-center p-5">
          <div className="mb-4 w-full">
            <label className="font-semibold">Note:</label>
            <textarea
              type="text"
              cols={4}
              rows={4}
              placeholder="Your Company"
              className="w-full border rounded p-2 mt-1  bg-gray-300"
              value=""
            />
          </div>
          <div className="mb-4 w-full medium:ml-2">
            <label className="font-semibold">Signature:</label>
            <textarea
              type="text"
              cols={4}
              rows={4}
              placeholder="Your Company"
              className="w-full border rounded p-2 mt-1  bg-gray-300"
              value=""
            />
          </div>
        </div>
        <div className="flex x-small:flex-col medium:flex-row justify-center items-center  space-x-4">
          <button className="bg-black  text-white px-6 py-2 rounded-lg text-lg flex items-center justify-center space-x-2 hover:bg-gray-800 ">
            <AiOutlinePrinter className="text-xl" />
            <span>Print Receipt</span>
          </button>
          <button className="bg-green-500 x-small:mt-4 medium:mt-0 text-white px-6 py-2 rounded-lg text-lg flex items-center justify-center mdeium:space-x-2 hover:bg-green-600">
            <FiDownload className="text-xl" />
            <span>Download as PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
