import React from 'react'
import { useState } from 'react';

const Shop = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [productName, setProductName] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [color, setColor] = useState("");
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImage(URL.createObjectURL(file)); // Preview the uploaded image
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission logic here
      console.log("Form Submitted:", { image, productName,categoryName, quantity, color });
      // Reset the form
      setImage(null);
      setProductName("");
      setCategoryName("");
      setQuantity("");
      setColor("");
      closeModal();
    };
  
    return (
      <div className="flex justify-center items-center h-screen">
  
        {/* Button to open the modal */}
        <button
          className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
          onClick={openModal}
        >
          Add Product
        </button>
  
        {/* Modal Popup */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-blue-200  bg-opacity-50 flex justify-center items-center z-50 mt-10">
                    <div className="bg-white rounded-lg p-4 w-full max-w-xs x-small:ml-12 x-small:max-w-52 medium:max-w-60 large:max-w-72">

              <h2 className="text-sm font-semibold text-center text-gray-700 mb-4">
                Add New Product
              </h2>
  
              <form onSubmit={handleSubmit} className="space-y-3">
  
                {/* Product Name */}
                <div>
                  <label
                    htmlFor="product-name"
                    className="block text-xs font-medium text-gray-600"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="product-name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <h2 className="text-sm font-semibold text-center text-gray-700 mb-4">
                Add Category
              </h2>
                  {/* Category Name */}
                  <div>
                  <label
                    htmlFor="product-name"
                    className="block text-xs font-medium text-gray-600"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="product-name"
                    value={categoryName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                {/* Quantity */}
                <div>
                  <label
                    htmlFor="quantity"
                    className="block text-xs font-medium text-gray-600"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
  
                {/* Color */}
                <div>
                  <label
                    htmlFor="color"
                    className="block text-xs font-medium text-gray-600"
                  >
                    Color
                  </label>
                  <input
                    type="text"
                    id="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
  
                {/* Image Upload */}
                <div>
                  <label
                    htmlFor="image"
                    className="block text-xs font-medium text-gray-600"
                  >
                    Upload Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {image && (
                    <div className="mt-4 text-center">
                      <img
                        src={image}
                        alt="Product Preview"
                        className="w-16 h-16 object-cover mx-auto rounded-md"
                      />
                    </div>
                  )}
                </div>
  
                {/* Modal Actions */}
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-3 py-1.5 text-xs bg-gray-400 text-white rounded-md hover:bg-gray-500 transition duration-200"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-xs bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };
export default Shop
