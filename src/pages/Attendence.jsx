import React, { useState, useEffect } from "react";

import { BsFiletypePdf } from "react-icons/bs";


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


  const [products, setProducts] = useState([]);
 

  const [user] = useAuthState(auth); // Get current user from firebase auth

const userEmail = user?.email; // Ensure `userEmail` is available


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
        const updatedAttendance = product.attendance === "present" ? "Present" : "Absent"; // Toggle between present/absent

        // Firestore update for the toggled product
        const productData = {
          [product.id]: {
            EmployeeName: product.employee,
            Phone: product.phone,
            Attendance: updatedAttendance,
          },
        };

        // Update Firestore with the toggled attendance
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
      return product; // For all other products, return them as-is
    });

    return updatedProducts;
  });
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
                 
                    {new Date().toISOString().split("T")[0]} {/* Formats as YYYY-MM-DD */}
                
                  </td>
                  <td className="px-6 py-4 font-medium">{product.employee}</td>
                  <td className="px-6 py-4">{product.phone}</td>
                  <td className="px-6 py-4">{product.type}</td>
                  
                  {/* Attendance Toggle */}
                  <tr
  key={product.id}
  className={`border-b ${product.attendance === "present" ? "bg-green-400" : "bg-red-400"}`}
>
  {/* Other table cells here */}
  <td className="px-6 py-4 flex">
  {product.attendance === "present" ? "Present" : "Absent"}
  <label className="flex items-center cursor-pointer ml-2">
    <div className="relative">
      <input
        type="checkbox"
        checked={product.attendance === "present"} // This ensures checkbox reflects the "present" state
        onChange={() => {
          if (product.attendance === "absent") {
            handleAttendanceToggle(product.id); // Only toggle if the attendance is absent
          }
        }}
        className="hidden"
        disabled={product.attendance === "present"} // Disable checkbox if attendance is present
      />
      <div
        className={`toggle ${product.attendance === "present" ? "bg-green-500" : "bg-red-500"}`}
        style={{
          width: "40px",
          height: "20px",
          borderRadius: "9999px",
          position: "relative",
        }}
      >
        <div
          className={`dot ${product.attendance === "present" ? "translate-x-5" : "translate-x-0"}`}
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


</tr>

                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

     
 
    </div>
  );
};

export default Attendence;