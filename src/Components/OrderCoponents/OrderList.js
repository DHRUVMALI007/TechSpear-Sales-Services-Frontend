import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
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
    setSelectedOrder(order); // Ensure selected order is set
    setShowInvoice(true);
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

  return (
    <div className="bg-slate-200">
      <div className="py-16 sm:py-x24">
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Order history</h1>
            <p className="mt-2 text-sm text-gray-500">
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
                  className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
                >
                  <h3 className="sr-only">
                    Order placed on <time dateTime={order.createdDatetime}>{order.createdDate}</time>
                  </h3>

                  <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                    <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                      <div>
                        <dt className="font-medium text-gray-900">Order number</dt>
                        <dd className="mt-1 text-gray-500">{order.number}</dd>
                      </div>
                      <div className="hidden sm:block">
                        <dt className="font-medium text-gray-900">Date placed</dt>
                        <dd className="mt-1 text-gray-500">
                          <time dateTime={order.createdDatetime}>{order.createdDate}</time>
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">Total amount</dt>
                        <dd className="mt-1 font-medium text-gray-900">{order.total}</dd>
                      </div>
                    </dl>

                    <Menu as="div" className="relative flex justify-end lg:hidden">
                      <div className="flex items-center">
                        <MenuButton className="-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500">
                          <span className="sr-only">Options for order {order.number}</span>
                          <EllipsisVerticalIcon aria-hidden="true" className="w-6 h-6" />
                        </MenuButton>
                      </div>

                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        <div className="py-1">
                          <MenuItem>
                            <a
                              href={order.href}
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                            >
                              View
                            </a>
                          </MenuItem>
                          <MenuItem>
                            <a
                              href={order.invoiceHref}
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                            >
                              Invoice
                            </a>
                          </MenuItem>
                          {/* Refund Button */}
                          {order.status === 'Delivered' && !order.refunded && (
                            <MenuItem>
                              <button
                                onClick={() => handleRefundClick(order)}
                                className="block px-4 py-2 text-sm text-red-600"
                              >
                                Request Refund
                              </button>
                            </MenuItem>
                          )}
                        </div>
                      </MenuItems>
                    </Menu>

                    <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                      <a
                        href={order.href}
                        className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span>View Order</span>
                        <span className="sr-only">{order.number}</span>
                      </a>
                      <button
                        onClick={() => handleViewInvoice(order)}
                        className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span>View Invoice</span>
                        <span className="sr-only">for order {order.number}</span>
                      </button>
                      {/* Refund Button for Desktop */}
                      {order.status === "Delivered" && (
                        <>
                          {order.refunded ? (
                            <span className="text-sm font-medium text-green-600">Refunded</span>
                          ) : (
                            <button
                              onClick={() => handleRefundClick(order)}
                              className="flex items-center justify-center rounded-md border border-red-600 bg-red-50 px-2.5 py-2 text-sm font-medium text-red-600 shadow-sm hover:bg-red-100"
                            >
                              Request Refund
                            </button>
                          )}
                        </>
                      )}

                    </div>
                  </div>

                  {/* Products */}
                  <h4 className="sr-only">Items</h4>
                  <ul className="divide-y divide-gray-200">
                    {order.products.map((product) => (
                      <li key={product.id} className="p-4 sm:p-6">
                        <div className="flex items-center sm:items-start">
                          <div className="w-20 shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:w-40">
                            <img alt={product.imageAlt} src={product.imageSrc} className="w-full object-cover" />
                          </div>
                          <div className="ml-6 flex-1 text-sm">
                            <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                              <h5>{product.name}</h5>
                              <p className="mt-2 sm:mt-0">{product.price}</p>
                            </div>
                            <p className="hidden text-gray-500 sm:mt-2 sm:block">{product.description}</p>
                          </div>
                        </div>

                        <div className="mt-6 sm:flex sm:justify-between">
                          <div className="flex items-center">
                            <CheckCircleIcon aria-hidden="true" className="w-5 h-5 text-green-500" />
                            <p className="ml-2 text-sm font-medium text-gray-500">
                              Delivered on <time dateTime={order.deliveredDatetime}>{order.deliveredDate}</time>
                            </p>
                          </div>

                          <div className="mt-6 flex items-center divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0">
                            <div className="flex flex-1 justify-center pr-4">
                              <a
                                href={product.href}
                                className="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
                              >
                                View product
                              </a>
                            </div>
                            <div className="flex flex-1 justify-center pl-4">
                              <a href="/" className="whitespace-nowrap text-indigo-600 hover:text-indigo-500">
                                Buy again
                              </a>
                            </div>
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
        <Invoice order={selectedOrder} onClose={() => setShowInvoice(true)} />
      )}
    </div>
  );
}
