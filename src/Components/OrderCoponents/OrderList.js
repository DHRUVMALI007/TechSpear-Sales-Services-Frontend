import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { useState, useContext } from 'react';
import { ThemeContext } from "../../Helpers/ThemeContext";

import Invoice from './Invoice';

// Sample order data
const ordersData = [
  {
    number: 'WU88191111',
    href: '#',
    invoiceHref: '#',
    createdDate: 'Jul 6, 2021',
    createdDatetime: '2021-07-06',
    deliveredDate: 'July 12, 2021',
    deliveredDatetime: '2021-07-12',
    total: '$160.00',
    status: 'Delivered',
    refunded: false,
    products: [
      {
        id: 1,
        name: 'Micro Backpack',
        description:
          'Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.',
        href: '#',
        price: '$70.00',
        imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/order-history-page-03-product-01.jpg',
        imageAlt:
          'Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.',
      },
    ],
  },
  {
    number: 'WU88191111',
    href: '#',
    invoiceHref: '#',
    createdDate: 'Jul 6, 2021',
    createdDatetime: '2021-07-06',
    deliveredDate: 'July 12, 2021',
    deliveredDatetime: '2021-07-12',
    total: '$160.00',
    status: 'Delivered',
    refunded: false,
    products: [
      {
        id: 1,
        name: 'Micro Backpack',
        description:
          'Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.',
        href: '#',
        price: '$70.00',
        imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/order-history-page-03-product-01.jpg',
        imageAlt:
          'Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.',
      },
      {
        id: 2,
        name: 'Micro Backpack',
        description:
          'Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.',
        href: '#',
        price: '$70.00',
        imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/order-history-page-03-product-01.jpg',
        imageAlt:
          'Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.',
      },
    ],
  },
  // More orders...
];

export default function OrderHistory() {
  const [orders, setOrders] = useState(ordersData);
  // const [statusIndex, setStatusIndex] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null); // To store the order for refund
  // const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [refundDescription, setRefundDescription] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const [refundImage, setRefundImage] = useState(null);
  const [refundMethod, setRefundMethod] = useState("");

  const handleViewInvoice = (order) => {
    setSelectedOrder(order); // Set the order for invoice
    setShowInvoice(true); // Show invoice modal
  };
  const closeInvoice = () => {
    setShowInvoice(false);
    setSelectedOrder(null); // Reset selectedOrder to prevent refund modal from opening
  };

  const handleRefundClick = (order) => {
    setShowInvoice(false); // Ensure invoice modal is closed
    setSelectedOrder(order);
  };

  const closeRefundModal = () => {
    setSelectedOrder(null);
  };

  const processRefund = (order) => {
    // Update the refunded status in the orders array
    const updatedOrders = orders.map((o) =>
      o.number === order.number ? { ...o, refunded: true, status: 'Refunded' } : o
    );
    setOrders(updatedOrders);
    alert(`Refund request for order ${order.number} submitted!`);
    closeRefundModal();
  };
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-slate-200 text-black"} transition-colors duration-300 mb-32`}>
      <div className="pt-16 sm:pt-x24">
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            <h1 className={`text-2xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-gray-900"} sm:text-3xl`}>
              Order history
            </h1>
            <p className={`mt-2 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              Check the status of recent orders, manage returns, and discover similar products.
            </p>
          </div>

        </div>

        <div className="mt-16">
          <h2 className="sr-only">Recent orders</h2>
          <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
            <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
              {orders.map((order) => (
                <div
                  key={order.number}
                  className={`border-b border-t shadow-sm sm:rounded-lg sm:border transition ${isDarkMode ? "bg-gray-700 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"
                    }`}
                >
                  <h3 className="sr-only">
                    Order placed on <time dateTime={order.createdDatetime}>{order.createdDate}</time>
                  </h3>

                  <div className={`flex items-center border-b p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6 ${isDarkMode ? "border-gray-700" : "border-gray-200"
                    }`}>
                    <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                      <div>
                        <dt className="font-medium">Order number</dt>
                        <dd className="mt-1 text-gray-500">{order.number}</dd>
                      </div>
                      <div className="hidden sm:block">
                        <dt className="font-medium">Date placed</dt>
                        <dd className="mt-1 text-gray-500">
                          <time dateTime={order.createdDatetime}>{order.createdDate}</time>
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium">Total amount</dt>
                        <dd className="mt-1 font-medium">{order.total}</dd>
                      </div>
                    </dl>

                    <Menu as="div" className="relative flex justify-end lg:hidden">
                      <MenuButton className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                        <EllipsisVerticalIcon aria-hidden="true" className="w-6 h-6" />
                      </MenuButton>

                      <MenuItems className={`absolute right-0 z-10 mt-2 w-40 origin-bottom-right rounded-md shadow-lg ring-1 ring-black/5 transition ${isDarkMode ? "bg-gray-900 text-white ring-gray-700" : "bg-white text-gray-700"
                        }`}>
                        <div className="py-1">
                          <MenuItem>
                            <button
                              onClick={() => {
                                setSelectedOrder(order);
                                setShowInvoice(true);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                            >
                              Invoice
                            </button>
                          </MenuItem>
                          {order.status === "Delivered" && !order.refunded && (
                            <MenuItem>
                              <button
                                onClick={() => handleRefundClick(order)}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-200"
                              >
                                Request Refund
                              </button>
                            </MenuItem>
                          )}
                        </div>
                      </MenuItems>
                    </Menu>

                    <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                      {/* View Invoice Button */}
                      <button
                        onClick={() => handleViewInvoice(order)}
                        className="px-4 py-2 rounded-md shadow-sm transition bg-blue-500 text-white hover:bg-blue-600"
                      >
                        View Invoice
                      </button>

                      {/* Refund Status / Button */}
                      {order.status === "Delivered" && (
                        order.refunded ? (
                          <span className="text-sm font-medium text-green-600">Refunded</span>
                        ) : (
                          <button
                            onClick={() => handleRefundClick(order)}
                            className="px-4 py-2 rounded-md shadow-sm transition bg-red-500 text-white hover:bg-red-600"
                          >
                            Request Refund
                          </button>
                        )
                      )}
                    </div>

                  </div>

                  {/* Products */}
                  <ul className={`divide-y ${isDarkMode ? "divide-gray-700" : "divide-gray-200"
                    }`}>
                    {order.products.map((product) => (
                      <li key={product.id} className="p-4 sm:p-6">
                        <div className="flex items-center sm:items-start">
                          <div className="w-20 shrink-0 overflow-hidden rounded-lg sm:w-40">
                            <img alt={product.imageAlt} src={product.imageSrc} className="w-full object-cover" />
                          </div>
                          <div className="ml-6 flex-1 text-sm">
                            <div className="font-medium sm:flex sm:justify-between">
                              <h5>{product.name}</h5>
                              <p className="mt-2 sm:mt-0">{product.price}</p>
                            </div>
                            <p className={`hidden sm:mt-2 sm:block ${isDarkMode ? "text-gray-400" : "text-gray-500"
                              }`}>{product.description}</p>
                          </div>
                        </div>

                        <div className="mt-6 sm:flex sm:justify-between">
                          <div className="flex items-center">
                            <CheckCircleIcon className="w-5 h-5 text-green-500" />
                            <p className="ml-2 text-sm font-medium">
                              Delivered on <time dateTime={order.deliveredDatetime}>{order.deliveredDate}</time>
                            </p>
                          </div>

                          <div className={`mt-6 flex flex-col gap-2 sm:flex-row sm:justify-start pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:pt-0`}>
                            <a
                              href={product.href}
                              className={`px-4 py-2 rounded-md shadow-sm transition ${isDarkMode
                                ? "bg-gray-700 text-white hover:bg-gray-600"
                                : "bg-indigo-500 text-white hover:bg-indigo-600"
                                }`}
                            >
                              View Product
                            </a>

                            <a
                              href="/"
                              className={`px-4 py-2 rounded-md shadow-sm transition ${isDarkMode
                                ? "bg-gray-800 text-white hover:bg-gray-700"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                            >
                              Buy Again
                            </a>
                          </div>

                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Refund Modal */}
      {selectedOrder && !showInvoice && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full sm:w-96 shadow-lg mt-36">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
              Request Refund for Order {selectedOrder.number}
            </h2>

            {/* Reason for Refund */}
            <label className="block mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              Reason for Refund
            </label>
            <select
              className="w-full p-2 mt-1 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              value={refundReason}
              onChange={(e) => {
                setRefundReason(e.target.value);
                if (e.target.value !== "Other") {
                  setRefundDescription("");
                }
              }}
            >
              <option value="">Select a reason</option>
              <option value="Damaged product">Damaged product</option>
              <option value="Wrong item received">Wrong item received</option>
              <option value="Quality not as expected">Quality not as expected</option>
              <option value="Order arrived late">Order arrived late</option>
              <option value="Other">Other</option>
            </select>

            {/* Description for 'Other' reason */}
            {refundReason === "Other" && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Please describe your reason
                </label>
                <textarea
                  className="w-full p-2 mt-1 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                  rows="3"
                  value={refundDescription}
                  onChange={(e) => setRefundDescription(e.target.value)}
                  placeholder="Enter details here..."
                />
              </div>
            )}

            {/* Upload Image Proof (Optional) */}
            {(refundReason === "Damaged product" || refundReason === "Other") && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Upload Image Proof (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="w-full mt-1 p-2 border rounded-md text-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                  onChange={(e) => setRefundImage([...e.target.files])}
                />
                {refundImage?.length > 0 && (
                  <div className="mt-1 text-xs text-green-600 dark:text-green-400">
                    {refundImage.map((file, index) => (
                      <p key={index}>{file.name} uploaded</p>
                    ))}
                  </div>
                )}
              </div>
            )}


            {/* Refund Method */}
            <label className="block mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              Refund Method
            </label>
            <select
              className="w-full p-2 mt-1 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              value={refundMethod}
              onChange={(e) => setRefundMethod(e.target.value)}
            >
              <option value="">Select refund method</option>
              <option value="Original Payment Method">Original Payment Method</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Wallet Credit">Wallet Credit</option>
            </select>

            {/* Estimated Refund Time */}
            {refundMethod && (
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Estimated refund time: {refundMethod === "Bank Transfer" ? "5-7 business days" : "2-3 business days"}.
              </p>
            )}

            {/* Action Buttons */}
            <div className="mt-4 flex justify-between">
              <button
                onClick={closeRefundModal}
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (refundReason === "Other" && !refundDescription.trim()) {
                    alert("Please provide a description for 'Other' reason.");
                    return;
                  }
                  processRefund(selectedOrder);
                }}
                className="text-sm font-semibold text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-500"
                disabled={!refundReason || !refundMethod || (refundReason === "Other" && !refundDescription.trim())}
              >
                Request Refund
              </button>
            </div>
          </div>
        </div>
      )}

      {showInvoice && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-3xl max-h-[80vh] overflow-y-auto mt-20">
            <Invoice order={selectedOrder} onClose={() => closeInvoice()} />

          </div>
        </div>
      )}




    </div>
  );
}
