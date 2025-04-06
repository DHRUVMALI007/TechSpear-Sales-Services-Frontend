import React, { useState } from "react";

const StockManagement = () => {
    const [products, setProducts] = useState([
        { id: "P1001", name: "Laptop", stock: 10 },
        { id: "P1002", name: "Mouse", stock: 50 },
        { id: "P1003", name: "Keyboard", stock: 5 },
        { id: "P1004", name: "Monitor", stock: 20 },
        { id: "P1005", name: "CPU", stock: 100 },
        { id: "P1006", name: "Graphic Card", stock: 200 },
    ]);
    const [newProduct, setNewProduct] = useState({ id: "", name: "", stock: "" });
    const [stockFilter, setStockFilter] = useState("All");

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedProduct = { ...newProduct, [name]: value };

        if (name === "id") {
            const existingProduct = products.find((p) => p.id === value);
            updatedProduct.name = existingProduct ? existingProduct.name : "";
        }

        setNewProduct(updatedProduct);
    };

    // Add or update product stock
    const addOrUpdateProduct = () => {
        if (!newProduct.id || !newProduct.stock || isNaN(newProduct.stock)) return;

        setProducts((prevProducts) => {
            const existingProduct = prevProducts.find((p) => p.id === newProduct.id);
            return existingProduct
                ? prevProducts.map((p) =>
                    p.id === newProduct.id ? { ...p, stock: p.stock + Number(newProduct.stock) } : p
                )
                : [...prevProducts, { ...newProduct, stock: Number(newProduct.stock) }];
        });

        setNewProduct({ id: "", name: "", stock: "" });
    };

    // Filter products based on stock
    const filteredProducts = products.filter((p) => {
        if (stockFilter === "All") return true;
        if (stockFilter === "Less than 15") return p.stock < 15;
        if (stockFilter === "15 to 50") return p.stock >= 15 && p.stock <= 50;
        if (stockFilter === "50 to 100") return p.stock > 50 && p.stock <= 100;
        if (stockFilter === "More than 100") return p.stock > 100;
        return true;
    });

    return (
        <div className="p-5 bg-gray-50 rounded-lg shadow-md w-full max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Stock Management</h2>

            {/* Input Fields */}
            <div className="mb-4 flex flex-wrap gap-2">
                <input 
                    type="text" 
                    name="id" 
                    value={newProduct.id} 
                    placeholder="Product ID" 
                    onChange={handleChange} 
                    className="border p-2 rounded-md flex-1 min-w-[150px]"
                />
                <input 
                    type="text" 
                    name="name" 
                    value={newProduct.name} 
                    placeholder="Product Name (Auto-fill if exists)" 
                    className="border p-2 rounded-md flex-1 min-w-[150px] bg-gray-200 text-gray-700" 
                    disabled 
                />
                <input 
                    type="number" 
                    name="stock" 
                    value={newProduct.stock} 
                    placeholder="Stock" 
                    onChange={handleChange} 
                    className="border p-2 rounded-md flex-1 min-w-[150px]"
                />
                <button 
                    onClick={addOrUpdateProduct} 
                    className="border px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition min-w-[120px]"
                >
                    Add/Update
                </button>
            </div>

            {/* Filter Dropdown */}
            <div className="flex justify-end mb-3">
                <select
                    value={stockFilter}
                    onChange={(e) => setStockFilter(e.target.value)}
                    className="border p-2 rounded-md bg-white text-gray-700"
                >
                    <option value="All">All</option>
                    <option value="Less than 15">Less than 15</option>
                    <option value="15 to 50">15 to 50</option>
                    <option value="50 to 100">50 to 100</option>
                    <option value="More than 100">More than 100</option>
                </select>
            </div>

            {/* Stock Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border bg-white shadow-md rounded-lg text-sm">
                    <thead>
                        <tr className="bg-slate-900 text-white">
                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">Product</th>
                            <th className="p-3 text-left">Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product, index) => (
                                <tr key={product.id} className={`border-t ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
                                    <td className="p-3 whitespace-nowrap">{product.id}</td>
                                    <td className="p-3 whitespace-nowrap">{product.name}</td>
                                    <td 
                                        className={`p-3 whitespace-nowrap ${
                                            product.stock < 15 ? "text-red-600 font-bold" :
                                            product.stock > 100 ? "text-green-600 font-bold" : ""
                                        }`}
                                    >
                                        {product.stock}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center p-4 text-gray-500">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StockManagement;
