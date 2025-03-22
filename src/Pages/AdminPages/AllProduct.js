import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaTimes, FaSearch, FaCheck, FaTimesCircle, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { toast } from 'react-toastify';
import categoryData from '../../Helpers/ProductCategory';
import UploadProduct from '../../Components/UploadProduct';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../../features/productSlice';
import { useSearchParams } from 'react-router-dom';
const AllProducts = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product)

  const [products, setProducts] = useState([]);
  useEffect(() => {
    dispatch(getAllProduct()).unwrap().then((data) => {
      setProducts(data.data); // Update local state with fetched products
    });

  }, [dispatch]);

  // console.log('products', products)

  const [searchQuery, setSearchQuery] = useState('');
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [showUploadProduct, setShowUploadProduct] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

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

  // const filteredProducts = products.filter((product) =>
  //   product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   product.category.toLowerCase().includes(searchQuery.toLowerCase())
  // );

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
          {products.map((prod) => (
            <tr key={prod._id} className="hover:bg-gray-100">
              <td className="p-2 border text-center">
                <div className="flex overflow-x-auto space-x-2 w-full h-20">
                  {prod.otherProductImg?.slice(0, 5).map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt="product"
                      className="w-16 h-16 object-cover rounded"
                    />
                  ))}
                </div>
              </td>
              <td className="p-2 border">{prod.productName}</td>
              <td className="p-2 border">{prod.price}</td>
              <td className="p-2 border">{prod.category}</td>
              <td className="p-2 border">
                {prod.description?.length > 40
                  ? `${prod.description.slice(0, 40)}...`
                  : prod.description}
              </td>
              <td className="p-2 border flex justify-center items-center gap-2">
                <button
                  onClick={() => handleEditClick(prod)}
                  className="bg-yellow-500 text-white p-3 w-12 h-12 flex justify-center items-center rounded"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteClick(prod._id)}
                  className="bg-red-500 text-white p-3 w-12 h-12 flex justify-center items-center rounded"
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
    </div>
  );
};

export default AllProducts;
