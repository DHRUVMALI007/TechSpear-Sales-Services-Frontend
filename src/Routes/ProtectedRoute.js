import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProtectedRoute = () => {
  const { isAuthenticate ,user} = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart);

//   const hasItemsInCart = cartItems?.data?.cartItem?.items?.length  === 0;

  if (!isAuthenticate) {
    toast.error("Please Login.")
    return <Navigate to="/login" replace />;
  }

//   if (hasItemsInCart) {
//     alert("Your cart is empty. You can't proceed to checkout.");
//     return <Navigate to="/user-cart" replace />;
//   }

  return <Outlet />;
};

export default ProtectedRoute;
