import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaTimes, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { CgClose } from "react-icons/cg";
import UploadProduct from '../../Components/UploadProduct';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getAllProduct, updateProduct } from '../../features/productSlice';

import productCategory from "../../Helpers/ProductCategory";
import { FaCloudUploadAlt } from "react-icons/fa";

const AllProducts = () => {
  const dispatch = useDispatch();

  const { loading, error, product } = useSelector((state) => state.product)

  const [products, setProducts] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [showUploadProduct, setShowUploadProduct] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [editId, setEditId] = useState(null)


  const [data, setData] = useState({
    productName: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    underlinePrice: "",
    mainProductImg: null, // Change to `null` to store File object
    otherProductImg: [],
  });


  useEffect(() => {
    dispatch(getAllProduct()).unwrap().then((data) => {
      setProducts(data.data);
      toast.info("Getting all products")
    }).catch((error) => {
      console.error("Error fetching products:", error);
      console.log(error.message)
      toast.error(error?.message || error);
    });
  }, [dispatch]);

  // console.log('products ary stateuse', products)

  const handleEditClick = (productId) => {
    const selectedProduct = products.find((p) => p._id === productId);
    if (!selectedProduct) {
      toast.error("Product not found!");
      return;
    }

    setEditId(productId);
    setCurrentProduct(selectedProduct);
    setData({
      productName: selectedProduct.productName,
      description: selectedProduct.description,
      price: selectedProduct.price,
      category: selectedProduct.category,
      stock: selectedProduct.stock,
      underlinePrice: selectedProduct.underlinePrice,
      mainProductImg: selectedProduct.mainProductImg || null,
      otherProductImg: selectedProduct.otherProductImg || [],
    });
    setOpenEditModal(true);
  };

  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData((prev) => ({ ...prev, mainProductImg: file }));
    }
  };

  const handleOtherImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    setData((prev) => ({
      ...prev,
      otherProductImg: [...prev.otherProductImg, ...files],
    }));
  };

  const handleDeleteMainImage = () => {
    setData((prev) => ({ ...prev, mainProductImg: null }));
  };

  const handleDeleteOtherImage = (index) => {
    setData((prev) => {
      const updatedImages = [...prev.otherProductImg];
      updatedImages.splice(index, 1);
      return { ...prev, otherProductImg: updatedImages };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!editId) {
      toast.error("Product ID is missing. Unable to update the product.");
      return;
    }
  
    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("stock", data.stock);
    formData.append("underlinePrice", data.underlinePrice);
  
    // if (data.mainProductImg instanceof File) {
    //   formData.append("mainProductImg", data.mainProductImg);
    // }
  
    // data.otherProductImg.forEach((file) => {
    //   if (file instanceof File) {
    //     formData.append("otherProductImg", file);
    //   }
    // });
    if (data.mainProductImg) {
      formData.append("mainProductImg", data.mainProductImg);
  }

  // ✅ Append Other Product Images
  if (data.otherProductImg.length > 0) {
      data.otherProductImg.forEach((img, index) => {
          formData.append("otherProductImg", img);
      });
  }
    console.log("Dispatching Redux action with FormData...");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      // let tdata= {name:"nandnai",description:"learning finding er."};
      const response = await dispatch(updateProduct({ editId, formData })).unwrap();
      console.log("Updated product response:", response);
      toast.success(response?.message)
  
      // toast.success("Product updated successfully!");
      setOpenEditModal(false);
      
      dispatch(getAllProduct()); // Refresh the product list
    } catch (error) {
      console.error("Update product error:", error);
      toast.error(error?.message || "Failed to update product.");
    }
  };
  

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


  const handleDeleteClick = (productId) => {
    setDeleteProductId(productId);
  };

  const confirmDelete = () => {
    dispatch(deleteProduct(deleteProductId))
    setProducts((prev) => {
      console.log(prev);
      return prev.filter((product) => product._id !== deleteProductId)
    });
    toast.success('Product deleted successfully!');
    setDeleteProductId(null);
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
                  onClick={() => handleEditClick(prod._id)}
                  className="bg-blue-500 text-white p-3 w-12 h-12 text-[13px] flex justify-center items-center rounded"
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

            <form className="grid p-4 gap-2 overflow-auto h-full pb-5" onSubmit={handleSubmit} encType='multipart/form-data'>
              <label htmlFor="productName">Product Name:</label>
              <input
                type="text"
                id="productName"
                placeholder="Enter product name"
                value={data.productName}
                onChange={(e) => setData({ ...data, productName: e.target.value })}
                className="p-2 bg-slate-100 border rounded"
                required
              />

              <label htmlFor="category" className="mt-3">Category:</label>
              <select
                required
                value={data.category}
                onChange={(e) => setData({ ...data, category: e.target.value })}
                className="p-2 bg-slate-100 border rounded"
              >
                <option value="">Select Category</option>
                {productCategory.map((el, index) => (
                  <option value={el.value} key={el.value + index}>{el.label}</option>
                ))}
              </select>

              {/* ✅ Main Product Image Upload */}
              <label className="mt-3">Main Product Image:</label>
              <label htmlFor="uploadMainImageInput">
                <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
                  <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                    <span className="text-4xl"><FaCloudUploadAlt /></span>
                    <p className="text-sm">Upload Main Product Image</p>
                    <input type="file" id="uploadMainImageInput" className="hidden" onChange={handleMainImageUpload} />
                  </div>
                </div>
              </label>
              {data.mainProductImg && (
                <div className="relative group mt-2">
                  <img src={data.mainProductImg} alt="Main Product" width={100} className="bg-slate-100 border cursor-pointer" />
                  <div
                    className="absolute top-0 right-0 p-1 text-white bg-red-600 rounded-full cursor-pointer"
                    onClick={handleDeleteMainImage}
                  >
                    <CgClose className="text-lg" />
                  </div>
                </div>
              )}

              {/* ✅ Other Product Images Upload */}
              <label className="mt-3">Other Product Images:</label>
              <label htmlFor="uploadOtherImagesInput">
                <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
                  <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                    <span className="text-4xl"><FaCloudUploadAlt /></span>
                    <p className="text-sm">Upload Other Product Images</p>
                    <input type="file" id="uploadOtherImagesInput" className="hidden" onChange={handleOtherImagesUpload} multiple />
                  </div>
                </div>
              </label>
              <div className="flex gap-2 flex-wrap mt-2">
                {data.otherProductImg.map((img, index) => (
                  <div className="relative group" key={index}>
                    <img src={img} alt="Other Product" width={80} height={80} className="bg-slate-100 border cursor-pointer" />
                    <div
                      className="absolute top-0 right-0 p-1 text-white bg-red-600 rounded-full cursor-pointer"
                      onClick={() => handleDeleteOtherImage(index)}
                    >
                      <CgClose className="text-lg" />
                    </div>
                  </div>
                ))}
              </div>

              <label htmlFor="price" className="mt-3">Price:</label>
              <input
                type="number"
                id="price"
                placeholder="Enter price"
                value={data.price}
                onChange={(e) => setData({ ...data, price: e.target.value })}
                className="p-2 bg-slate-100 border rounded"
                required
              />

              <label htmlFor="underlinePrice" className="mt-3">Underline Price:</label>
              <input
                type="number"
                id="underlinePrice"
                placeholder="Enter underline price"
                value={data.underlinePrice}
                onChange={(e) => setData({ ...data, underlinePrice: e.target.value })}
                className="p-2 bg-slate-100 border rounded"
                required
              />

              <label htmlFor="stock" className="mt-3">Stock:</label>
              <input
                type="number"
                id="stock"
                placeholder="Enter stock quantity"
                value={data.stock}
                onChange={(e) => setData({ ...data, stock: e.target.value })}
                className="p-2 bg-slate-100 border rounded"
                required
              />

              <label htmlFor="description" className="mt-3">Product Description:</label>
              <textarea
                id="description"
                placeholder="Enter product description"
                value={data.description}
                onChange={(e) => setData({ ...data, description: e.target.value })}
                className="p-2 bg-slate-100 border rounded resize-none h-24"
                required
              ></textarea>
              <button
                type="submit"
                disabled={loading}
                className={`px-3 py-2 mb-10 text-white flex justify-center items-center ${loading ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                  }`}
              >
                {loading ? (
                  <div className="h-5 w-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Update Product"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
