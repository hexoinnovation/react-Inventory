import React from 'react';

const Invoice = () => {
  const handlePrint = () => {
    window.print();
  };

  const handleShipping = () => {
    alert('Shipping cost added');
  };

  const handleTax = () => {
    alert('Tax calculated');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Invoice</h1>
      
      <div className="flex justify-between mb-8">
        <div>
          <h3 className="font-semibold text-lg">From</h3>
          <p className="text-sm">Company Name</p>
          <p className="text-sm">1234 Street Address</p>
          <p className="text-sm">City, State, 56789</p>
          <p className="text-sm">Phone: (123) 456-7890</p>
          <p className="text-sm">Email: company@example.com</p>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg">To</h3>
          <input 
            type="text" 
            placeholder="Customer Name" 
            className="border p-2 w-full mb-2" 
          />
          <input 
            type="text" 
            placeholder="Customer Phone No." 
            className="border p-2 w-full mb-2" 
          />
          <input 
            type="email" 
            placeholder="Customer Email" 
            className="border p-2 w-full mb-4" 
          />
        </div>
      </div>

      <table className="min-w-full border-collapse mb-8">
        <thead>
          <tr>
            <th className="border-b p-2 text-left">Description</th>
            <th className="border-b p-2 text-left">Quantity</th>
            <th className="border-b p-2 text-left">Unit Price</th>
            <th className="border-b p-2 text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-b p-2">Product 1</td>
            <td className="border-b p-2">2</td>
            <td className="border-b p-2">$50</td>
            <td className="border-b p-2">$100</td>
          </tr>
          <tr>
            <td className="border-b p-2">Product 2</td>
            <td className="border-b p-2">1</td>
            <td className="border-b p-2">$200</td>
            <td className="border-b p-2">$200</td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-between mb-4">
        <div>
          <button 
            onClick={handleShipping} 
            className="bg-blue-500 text-white py-2 px-4 rounded mr-4"
          >
            Add Shipping
          </button>
          <button 
            onClick={handleTax} 
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Add Tax
          </button>
        </div>
        
        <div className="font-semibold">
          <p>Subtotal: $300</p>
          <p>Shipping: $20</p>
          <p>Tax: $30</p>
          <p className="text-xl mt-2">Total: $350</p>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={handlePrint} 
          className="bg-gray-800 text-white py-2 px-6 rounded"
        >
          Print Invoice
        </button>
      </div>
    </div>
  );
};

export default Invoice;
