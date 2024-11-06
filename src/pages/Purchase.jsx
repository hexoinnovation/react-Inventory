import { FaSearch } from 'react-icons/fa'; // For the search icon
import { AiOutlineDownload, AiOutlineEye } from 'react-icons/ai';

const Purchase = () => {
  

  return (
    <div className="container mx-auto p-4 mt-10">
      {/* Search and Download Section */}
      <div className="flex justify-between mb-4">
        {/* Search Bar */}
        <div className="relative w-1/3">
          <label htmlFor="table-search" className="sr-only">Search</label>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="w-5 h-5 text-gray-600" />
          </div>
          <input
            type="text"
            id="table-search"
            className="block w-full pl-10 pr-4 py-2 text-sm text-black border border-gray-500 rounded-lg bg-gray-50"
            placeholder="Search for items"
          />
        </div>

        {/* Download Button */}
        <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <AiOutlineDownload className="w-5 h-5 inline mr-2" /> Download
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-white">
          <thead className="text-xs text-black uppercase bg-gray-300 ">
            <tr>
              <th scope="col" className="px-6 py-3">Product Name</th>
              <th scope="col" className="px-6 py-3">Color</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="bg-gray-200 text-black">
            <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" id="product-1">
              <td className="px-6 py-4 font-medium text-black ">Apple MacBook Pro 17"</td>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4">
                <button className="text-blue-600 dark:text-blue-500 hover:underline">
                  <AiOutlineEye className="inline mr-2" /> View
                </button>
              </td>
            </tr>
            <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" id="product-2">
              <td className="px-6 py-4 font-medium text-black ">Microsoft Surface Pro</td>
              <td className="px-6 py-4">White</td>
              <td className="px-6 py-4">Laptop PC</td>
              <td className="px-6 py-4">$1999</td>
              <td className="px-6 py-4">
                <button className="text-blue-600 dark:text-blue-500 hover:underline">
                  <AiOutlineEye className="inline mr-2" /> View
                </button>
              </td>
            </tr>
            <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" id="product-3">
              <td className="px-6 py-4 font-medium text-black ">Magic Mouse 2</td>
              <td className="px-6 py-4">Black</td>
              <td className="px-6 py-4">Accessories</td>
              <td className="px-6 py-4">$99</td>
              <td className="px-6 py-4">
                <button className="text-blue-600 dark:text-blue-500 hover:underline">
                  <AiOutlineEye className="inline mr-2" /> View
                </button>
              </td>
            </tr>
            <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" id="product-4">
              <td className="px-6 py-4 font-medium text-black ">Apple Watch</td>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Accessories</td>
              <td className="px-6 py-4">$179</td>
              <td className="px-6 py-4">
                <button className="text-blue-600 dark:text-blue-500 hover:underline">
                  <AiOutlineEye className="inline mr-2" /> View
                </button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-600" id="product-5">
              <td className="px-6 py-4 font-medium text-black ">Apple iMac 27"</td>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">PC Desktop</td>
              <td className="px-6 py-4">$3999</td>
              <td className="px-6 py-4">
                <button className="text-blue-600 dark:text-blue-500 hover:underline">
                  <AiOutlineEye className="inline mr-2" /> View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Purchase;
