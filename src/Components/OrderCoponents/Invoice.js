import React from "react";

export default function Invoice({ order }) {
  if (!order) {
    return <p className="text-center text-gray-600">No order details available.</p>;
  }

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <style>
        {`
          @media print {
            body {
              background: white;
              margin: 0;
            }
            .print-hidden {
              display: none;
            }
          }
        `}
      </style>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoice</h1>
          <p className="text-gray-600">Order number: {order.number}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Date: {formatDate(order.createdDate)}</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900">Customer Information</h3>
        <div className="mt-2 text-sm text-gray-600">
          <p>Name: {order.customerName}</p>
          <p>Email: {order.customerEmail}</p>
          <p>Address: {order.customerAddress}</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900">Order Details</h3>
        <div className="mt-2">
          {order.products.map((product) => (
            <div key={product.id} className="flex justify-between items-center py-2 border-b border-gray-200">
              <div className="flex items-center">
                <img
                  src={product.imageSrc || "https://via.placeholder.com/50"}
                  alt={product.imageAlt || "Product image"}
                  className="w-12 h-12 object-cover rounded-md mr-4"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">
                    {formatPrice(product.price)} × {product.quantity}
                  </p>
                </div>
              </div>
              <div className="text-sm font-medium text-gray-900">
                {formatPrice(product.price * product.quantity)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center text-lg font-medium text-gray-900">
        <p>Total</p>
        <p>{formatPrice(order.total)}</p>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => window.print()}
          className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md print-hidden"
        >
          Print Invoice
        </button>
      </div>
    </div>
  );
}
