import React from "react";
import { useState } from "react";

const Invoice = () => {
  const [paymentStatus, setPaymentStatus] = useState("Unpaid");
  const [billTo, setBillTo] = useState("");
  const [from, setFrom] = useState("");
  return (
    <div className="p-10 ">
      <div className="p-8 max-w-4xl mx-auto border-gray-300 bg-gray-300  shadow-md rounded-lg">
        <div className="flex justify-center mb-6">
          <h1 className="text-3xl font-bold text-blue-400">INVOICE</h1>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div>
            <img
              src="logo-placeholder.png"
              alt="Logo"
              className="w-16 h-16 mb-2"
            />
          </div>
          <div className="text-right">
            <p className="text-sm">
              Invoice Date: <input type="date" className="border rounded p-1" />
            </p>

            <label className="text-sm font-semibold">Status:</label>
            <select
              className="border p-1 rounded ml-2"
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
            >
              <option>Paid</option>
              <option>Unpaid</option>
            </select>
          </div>
        </div>

        {/* Bill To / From Section */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="font-semibold">Bill To:</label>
            <textarea
              type="text"
              cols={5}
              rows={5}
              placeholder="Client Name"
              className="w-full border rounded p-2 mt-1"
              value={billTo}
              onChange={(e) => setBillTo(e.target.value)}
            />
          </div>
          <div>
            <label className="font-semibold">From:</label>
            <textarea
              type="text"
              cols={5}
              rows={5}
              placeholder="Your Company"
              className="w-full border rounded p-2 mt-1"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
        </div>

        {/* Product Table */}
        <table className="w-full border-collapse border mb-6">
          <thead className=" bg-blue-400">
            <tr>
              <th className="border border-gray-300 p-2">S.No</th>
              <th className="border border-gray-300 p-2">Product Name</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">HSN Code</th>
              <th className="border border-gray-300 p-2">Quantity</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Total</th>
              <th className="border border-gray-300 p-2">Tax %</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2 text-center">1</td>
              <td className="border border-gray-300 p-2">Product A</td>
              <td className="border border-gray-300 p-2">
                Description of Product A
              </td>
              <td className="border border-gray-300 p-2">1234</td>
              <td className="border border-gray-300 p-2 text-center">1</td>
              <td className="border border-gray-300 p-2 text-right">$100</td>
              <td className="border border-gray-300 p-2 text-right">$100</td>
              <td className="border border-gray-300 p-2 text-center">
                <select className="w-full border rounded p-1">
                  <option>5%</option>
                  <option>12%</option>
                  <option>18%</option>
                </select>
              </td>
            </tr>
            {/* Additional rows as needed */}
          </tbody>
        </table>

        {/* Summary Section */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <label className="font-semibold">Payment Method:</label>
            <select className="border p-1 rounded ml-2">
              <option>Credit Card</option>
              <option>Bank Transfer</option>
              <option>Cash</option>
            </select>
          </div>
          <div>
            <label className="font-semibold">Shipping Method:</label>
            <select className="border p-1 rounded ml-2">
              <option>Standard Shipping</option>
              <option>Express Shipping</option>
              <option>Pickup</option>
            </select>
          </div>

          <div className="text-right">
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

          {/* Shipping Method */}
        </div>
        <div>
          <div className="flex justify-between items-center p-5">
            <div>
              <label className="font-semibold">Note:</label>
              <textarea
                type="text"
                cols={5}
            
                placeholder="Your Company"
                className="w-full border rounded p-2 mt-1"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
            <div>
              <label className="font-semibold">Signature:</label>
              <textarea
                type="text"
                cols={5}
            
                placeholder="Your Company"
                className="w-full border rounded p-2 mt-1"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
