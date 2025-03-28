import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartProduct } from '../features/cartSlice';

const useAddToCart = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    // const {cartItem} = useSelector((state)=>state.cart)
//getting that user
    console.log("cart ka user ",user?.data?.user)

    const addToCart = (e, id) => {
        e?.stopPropagation();
        e?.preventDefault();

        console.log("CART -> Product ID:", id);

        try {
            if (!user?.data?.user?._id) {
                toast.error("Please log in to add products to the cart.");
                return;
            }

            dispatch(addToCartProduct({userId:user?.data?.user?._id,productId:id})); //  Pass data correctly
            // toast.success(cartItem?.data?.message);
            toast("Cart added")
        } catch (er) {
            console.log("Error:", er);
            toast.error(er.message || "Something went wrong.");
        }
    };

    return addToCart; // ✅ Return the function, not call it
};

export default useAddToCart;
