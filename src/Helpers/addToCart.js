import { toast } from 'react-toastify';

const addToCart = (e, id) => {
    e?.stopPropagation();
    e?.preventDefault();

    if (!id) return;

    // Get the cart from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product already exists in the cart
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        toast.info("Product is already in the cart");
    } else {
        // Add new product to the cart
        cart.push({ id, quantity: 1 });
        localStorage.setItem('cart', JSON.stringify(cart));
        toast.success("Product added to cart");
    }
};

export default addToCart;
