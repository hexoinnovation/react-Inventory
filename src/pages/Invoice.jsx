import React from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { LuPrinter } from "react-icons/lu";


function Invoice() {
  return (
    <div className="max-w-[80rem] p-20 mx-auto my-4 sm:my-10">
      <div className="mx-auto">
        {/* Card */}
        <div className="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl">
          {/* Grid */}
          <div className="flex justify-between">
            <div>
              <svg
                className="size-10"
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 26V13C1 6.37258 6.37258 1 13 1C19.6274 1 25 6.37258 25 13C25 19.6274 19.6274 25 13 25H12"
                  className="stroke-blue-600"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M5 26V13.16C5 8.65336 8.58172 5 13 5C17.4183 5 21 8.65336 21 13.16C21 17.6666 17.4183 21.32 13 21.32H12"
                  className="stroke-blue-600"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="13"
                  cy="13.0214"
                  r="5"
                  fill="currentColor"
                  className="fill-blue-600"
                />
              </svg>

              <h1 className="mt-2 text-lg md:text-xl font-semibold text-blue-600">
             Hexo Innovation.
              </h1>
            </div>

            <div className="text-end">
              <h2 className="text-2xl md:text-3xl font-semibold text-black">
                Invoice #
              </h2>
              <span className="mt-1 block text-gray-500">3682303</span>

              <address className="mt-4 not-italic text-black">
                45 Roker Terrace
                <br />
                Latheronwheel
                <br />
                KW5 8NW, London
                <br />
                United Kingdom
                <br />
              </address>
            </div>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            <div>
              <h3 className="text-lg font-semibold text-black">Bill to:</h3>
              <h3 className="text-lg font-semibold text-black">
                Sara Williams
              </h3>
              <address className="mt-2 not-italic text-gray-500">
                280 Suzanne Throughway,
                <br />
                Breannabury, OR 45801,
                <br />
                United States
                <br />
              </address>
            </div>

            <div className="sm:text-end space-y-2">
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                <dl className="grid sm:grid-cols-5 gap-x-3">
                  <dt className="col-span-3 font-semibold text-black">
                    Invoice date:
                  </dt>
                  <dd className="col-span-2 text-gray-500">03/10/2018</dd>
                </dl>
                <dl className="grid sm:grid-cols-5 gap-x-3">
                  <dt className="col-span-3 font-semibold text-black">
                    Due date:
                  </dt>
                  <dd className="col-span-2 text-gray-500">03/11/2018</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="border border-gray-700 p-4 rounded-lg space-y-4">
              <div className="hidden sm:grid sm:grid-cols-5">
                <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
                  Item
                </div>
                <div className="text-start text-xs font-medium text-gray-500 uppercase">
                  Qty
                </div>
                <div className="text-start text-xs font-medium text-gray-500 uppercase">
                  Rate
                </div>
                <div className="text-end text-xs font-medium text-gray-500 uppercase">
                  Amount
                </div>
              </div>

              <div className="hidden sm:block border-b border-gray-700"></div>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                <div className="col-span-full sm:col-span-2">
                  <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                    Item
                  </h5>
                  <p className="font-medium text-black">Design UX and UI</p>
                </div>
                <div>
                  <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                    Qty
                  </h5>
                  <p className="text-black">1</p>
                </div>
                <div>
                  <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                    Rate
                  </h5>
                  <p className="text-black">5</p>
                </div>
                <div>
                  <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </h5>
                  <p className="sm:text-end text-black">$500</p>
                </div>
              </div>

              <div className="sm:hidden border-b border-gray-700"></div>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                <div className="col-span-full sm:col-span-2">
                  <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                    Item
                  </h5>
                  <p className="font-medium text-black">Web project</p>
                </div>
                <div>
                  <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                    Qty
                  </h5>
                  <p className="text-black">1</p>
                </div>
                <div>
                  <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                    Rate
                  </h5>
                  <p className="text-black">24</p>
                </div>
                <div>
                  <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </h5>
                  <p className="sm:text-end text-black">$1250</p>
                </div>
              </div>

              <div className="sm:hidden border-b border-gray-700"></div>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                <div className="col-span-full sm:col-span-2">
                  <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                    Item
                  </h5>
                  <p className="font-medium text-black">SEO</p>
                </div>
                <div>
                  <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                    Qty
                  </h5>
                  <p className="text-black">1</p>
                </div>
                <div>
                  <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                    Rate
                  </h5>
                  <p className="text-black">5</p>
                </div>
                <div>
                  <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </h5>
                  <p className="sm:text-end text-black">$100</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 sm:w-1/2 ml-auto space-y-4">
  <dl className="flex justify-between">
    <dt className="font-semibold text-black mr-5">Subtotal:</dt>
    <dd className="text-end text-black ">$1,850</dd>
  </dl>
  <dl className="flex justify-between">
    <dt className="font-semibold text-black mr-5">Discount:</dt>
    <dd className="text-end text-red-600">$150</dd>
  </dl>
  <dl className="flex justify-between">
    <dt className="font-semibold text-black mr-5">Total:</dt>
    <dd className="text-end text-black">$1,700.00</dd>
  </dl>
  <dl className="flex justify-between">
    <dt className="font-semibold text-black mr-5">Amount paid:</dt>
    <dd className="text-end text-black">$1,700.00</dd>
  </dl>
  <dl className="flex justify-between">
    <dt className="font-semibold text-black mr-5">Amount due:</dt>
    <dd className="text-end text-black">$0.00</dd>
  </dl>
  
</div>
<div className="flex flex-col space-y-3 font-light">
        <span>ThankYou!</span>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab, laudantium.</p>
        <p>hexo@123@gmail.com</p>
        <p>6374580598</p>
      </div>

        </div>
      </div>
      <div className="flex justify-end mt-10">
      <button
            className="px-4 py-2  bg-gray-200 rounded-lg hover:bg-gray-400 "
            onClick={() => setShowModal(true)}
          >
            <div className="flex gap-1">
              <span className="text-2xl">
                < MdOutlineFileDownload  />
              </span>
              <span className="text-base  text-gray-600 ">Invoice PDF</span>
            </div>
            </button>
            <button
        className="px-1 py-1 text-white font-bold bg-blue-500 rounded-lg hover:bg-blue-600 w-24 ml-5">
    
        <LuPrinter className="w-5 h-6 inline mr-1" />
        <span>Print</span>
      </button> {/* Ensure this closing tag is present */}


      </div>
      
     
          
       
    </div>
  );
}

export default Invoice;
