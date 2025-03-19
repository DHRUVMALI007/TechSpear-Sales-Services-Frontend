import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Logo from "../Logo";

export default function Invoice({ order, onClose }) {
  const invoiceRef = useRef();

  if (!order) {
    return <p className="text-center text-gray-600">No order details available.</p>;
  }

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Tax Calculation (10% as an example)
  const taxRate = 0.10;
  const taxAmount = order.total * taxRate;
  const grandTotal = order.total + taxAmount;

  const downloadPDF = async () => {
    const element = invoiceRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Invoice-${order.number}.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <div ref={invoiceRef} className="p-6 bg-white">

        {/* Company Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <div>
            <Logo className="h-12 w-auto" />
            <h1 className="text-lg font-bold">TechSpehar</h1>
            <p className="text-sm text-gray-600">1234 Street Name, City, Country</p>
            <p className="text-sm text-gray-600">Phone: +123456789 | Email: support@techspehar.com</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-gray-900">Invoice</h2>
            <p className="text-gray-600">Order #: {order.number}</p>
            <p className="text-gray-600">Date: {formatDate(order.createdDate)}</p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900">Billing To:</h3>
          <p className="text-sm text-gray-600">{order.customerName}</p>
          <p className="text-sm text-gray-600">{order.customerEmail}</p>
          <p className="text-sm text-gray-600">{order.customerAddress}</p>
        </div>

        {/* Order Details */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-5">Order Summary</h3>
          <table className="w-full text-sm text-left border border-gray-300">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-2 border">Product</th>
                <th className="p-2 border">Qty</th>
                <th className="p-2 border">Unit Price</th>
                <th className="p-2 border">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((product) => (
                <tr key={product.id} className="border">
                  <td className="p-2">{product.name}</td>
                  <td className="p-2 text-center">{product.quantity}</td>
                  <td className="p-2">{formatPrice(product.price)}</td>
                  <td className="p-2 font-medium">{formatPrice(product.price * product.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payment Details */}
        <div className="text-right text-lg font-medium border-t pt-4">
          <p>Subtotal: {formatPrice(order.total)}</p>
          <p>Tax (10%): {formatPrice(taxAmount)}</p>
          <p className="text-xl font-bold">Grand Total: {formatPrice(grandTotal)}</p>
        </div>

        {/* Footer */}
        <div className="mt-8 border-t pt-4 text-sm text-gray-600">
          {/* <p>Payment Terms: Payment is due within 7 days.</p> */}
          <p>Thank you for your business!</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 text-center">
        <button
          onClick={downloadPDF}
          className="px-6 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md"
        >
          Download PDF
        </button>
        <button
          onClick={onClose}
          className="ml-4 px-6 py-2 bg-red-500 text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}
