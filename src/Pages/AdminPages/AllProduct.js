import React, { useState } from 'react';
import { FaEdit, FaTrash, FaTimes, FaSearch, FaCheck, FaTimesCircle, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { toast } from 'react-toastify';
import categoryData from '../../Helpers/ProductCategory';
import UploadProduct from '../../Components/UploadProduct';
import dell from './Dell_Logo.png';
import hp from './hp_logo.png';
import asus from './Asus.png';

const AllProducts = () => {
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Laptop A',
      price: '$1200',
      description: 'High performance laptop with 16GB RAM.',
      images: [dell, hp],
      category: 'Laptop',
    },
    {
      id: '2',
      name: 'Laptop B',
      price: '$900',
      description: 'Affordable laptop for daily tasks.',
      images: [hp, dell],
      category: 'Laptop',
    },
    {
      id: '3',
      name: 'Desktop C',
      price: '$1500',
      description: 'Powerful desktop with gaming capabilities.',
      images: [asus],
      category: 'Desktop',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [showUploadProduct, setShowUploadProduct] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [refundStatus, setRefundStatus] = useState({});
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [refunds, setRefunds] = useState([
    {
      userId: '101',
      userName: 'John Doe',
      orderId: 'ORD1234',
      reason: 'Defective Product',
      description: 'Received product with a damaged screen.',
      images: [hp, dell],
    },
  ]);
  const openModal = (images, index) => {
    setSelectedImages(images);
    setSelectedImageIndex(index);
  };
  const closeModal = () => {
    setSelectedImageIndex(null);
  };
  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % selectedImages.length);
  };
  const prevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? selectedImages.length - 1 : prev - 1
    );
  };
  const handleAccept = (orderId) => {
    setRefundStatus((prev) => ({ ...prev, [orderId]: "Accepted" }));
  };

  const handleReject = (orderId) => {
    setRefundStatus((prev) => ({ ...prev, [orderId]: "Rejected" }));
  };

  const handleEditClick = (product) => {
    setCurrentProduct({ ...product });
    setOpenEditModal(true);
  };


  const handleDeleteClick = (productId) => {
    setDeleteProductId(productId);
  };

  const confirmDelete = () => {
    setProducts((prev) => prev.filter((product) => product.id !== deleteProductId));
    toast.success('Product deleted successfully!');
    setDeleteProductId(null);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
    setOpenEditModal(false);
    toast.success('Product updated successfully!');
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setCurrentProduct({ ...currentProduct, images: [...currentProduct.images, ...newImages] });
  };
  const removeImage = (index) => {
    const updatedImages = currentProduct.images.filter((_, i) => i !== index);
    setCurrentProduct({ ...currentProduct, images: updatedImages });
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">All Products</h2>
        <div className="flex items-center space-x-2">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full pr-10"
              autoFocus={false} // Explicitly prevent autofocus

            />
            <FaSearch
              className={`absolute top-3 right-2 text-gray-500 transition-all duration-300 ${searchQuery ? 'text-blue-500' : ''}`}
            />
          </div>
          <button
            onClick={() => setShowUploadProduct(true)}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300"
          >
            Upload Product
          </button>

          {showUploadProduct && (
            <UploadProduct onClose={() => setShowUploadProduct(false)} />
          )}
        </div>

      </div>

      {/* Table with filtered products */}
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-slate-900 text-white">
            <th className="p-2 border">Images</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id} className="hover:bg-gray-100">
              <td className="p-2 border text-center">
                <div className="flex overflow-x-auto space-x-2 w-full h-20">
                  {product.images.slice(0, 5).map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt="product"
                      className="w-16 h-16 object-cover rounded"
                    />
                  ))}
                </div>
              </td>

              <td className="p-2 border">{product.name}</td>
              <td className="p-2 border">{product.price}</td>
              <td className="p-2 border">{product.category}</td>
              <td className="p-2 border">
                {product.description.length > 30 ? `${product.description.slice(0, 40)}...` : product.description}
              </td>
              <td className="p-2 border-t flex justify-center items-center gap-2">
                <button
                  onClick={() => handleEditClick(product)}
                  className="bg-yellow-500 text-white p-3 mt-4 w-12 h-12 flex justify-center items-center rounded"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteClick(product.id)}
                  className="bg-red-500 text-white p-3 mt-4 w-12 h-12 flex justify-center items-center rounded"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {deleteProductId && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete this product?</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setDeleteProductId(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {openEditModal && currentProduct && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-h-[80vh] overflow-auto mt-10 mb-5 relative">
            <button
              onClick={() => setOpenEditModal(false)}
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
            >
              <FaTimes className="w-6 h-6" />
            </button>
            <h3 className="text-lg font-bold mb-4">Edit Product</h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateProduct(currentProduct);
              }}
            >
              {/* Form fields for editing */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={currentProduct.name}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={currentProduct.category}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  {categoryData.map((cat) => (
                    <option key={cat.id} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={currentProduct.description}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Description"
                  rows={5}
                  style={{ resize: 'none', overflowY: 'auto' }}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  id="price"
                  name="price"
                  value={currentProduct.price}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Product Images
                </label>
                <div className="flex space-x-2 overflow-x-auto mt-2 relative">
                  {currentProduct.images.map((img, index) => (
                    <div key={index} className="relative">
                      <img src={img} alt="Product" className="w-16 h-16 object-cover rounded" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 bg-gray-800 text-white p-1 rounded-full hover:bg-gray-600"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="mt-2 w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setOpenEditModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
      <h2 className="font-bold text-lg mt-5">Refund Requests</h2>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 mb-6 mt-5">
          <thead className="bg-slate-900 text-white sticky top-0">
            <tr>
              <th className="p-2 border">User Name</th>
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Reason</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {refunds.map((refund, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-2 border">{refund.userName}</td>
                <td className="p-2 border">{refund.orderId}</td>
                <td className="p-2 border">{refund.reason}</td>
                <td className="p-2 border">{refund.description}</td>
                <td className="p-2 border text-center">
                  <div className="flex overflow-x-auto space-x-2 w-40 max-w-full">
                    {refund.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="refund"
                        className="w-16 h-16 object-cover rounded cursor-pointer shrink-0"
                        onClick={() => openModal(refund.images, i)}
                      />
                    ))}
                  </div>
                </td>
                <td className="p-2 border text-center">
                  {refundStatus[refund.orderId] ? (
                    <span
                      className={`font-semibold ${
                        refundStatus[refund.orderId] === "Accepted"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {refundStatus[refund.orderId]}
                    </span>
                  ) : (
                    <div className="flex space-x-2 justify-center">
                      <button
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 hidden xl:inline-block"
                        onClick={() => handleAccept(refund.orderId)}
                      >
                        Accept
                      </button>
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 hidden xl:inline-block"
                        onClick={() => handleReject(refund.orderId)}
                      >
                        Reject
                      </button>

                      {/* Icons for mobile */}
                      <button
                        className="text-green-600 xl:hidden"
                        onClick={() => handleAccept(refund.orderId)}
                      >
                        <FaCheck size={20} />
                      </button>
                      <button
                        className="text-red-600 xl:hidden"
                        onClick={() => handleReject(refund.orderId)}
                      >
                        <FaTimesCircle size={20} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Full-Screen Image Modal */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            className="absolute top-5 right-5 bg-gray-800 text-white p-2 rounded-full"
            onClick={closeModal}
          >
            <FaTimes size={24} />
          </button>

          {/* Previous Image */}
          <button
            className="absolute left-5 bg-gray-800 text-white p-3 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            <FaArrowLeft size={24} />
          </button>

          <img
            src={selectedImages[selectedImageIndex]}
            alt="Refund"
            className="max-w-[90%] max-h-[90vh] rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking image
          />

          {/* Next Image */}
          <button
            className="absolute right-5 bg-gray-800 text-white p-3 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            <FaArrowRight size={24} />
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default AllProducts;
