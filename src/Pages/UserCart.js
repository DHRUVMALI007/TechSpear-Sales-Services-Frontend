import { useEffect } from "react";
import { CheckIcon, ClockIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart, delteCartItem, updateCartQuntity } from "../features/cartSlice";
import { toast } from "react-toastify";
import displayINRCurrency from "../Helpers/displayCurrency";
import { findNonSerializableValue } from "@reduxjs/toolkit";

export default function ShoppingCart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  console.log("User:", user?.data?.user?._id);
  console.log("Cart Items:", cartItems);

  // Fetch Cart Data from Redux
  useEffect(() => {
    if (user?.data?.user?._id) {
      dispatch(getCart(user.data.user._id));
    }
  }, [user, dispatch]);


  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return; // Prevents setting quantity to 0 or negative values

    try {
      const res = await dispatch(
        updateCartQuntity({
          userId: user?.data?.user?._id,
          productId,
          quantity,
        })
      ).unwrap();

      console.log("Updated Cart Response:", res);
      toast.success(res?.message || res?.payload);

      dispatch(getCart(user?.data?.user?._id));
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  const handlePayment = ()=>{
    if (!cartItems?.data?.cartItem?.items || cartItems.data.cartItem.items.length === 0) {
      alert("Your cart is Empty. You can't Check it out.");
    } else {
      navigate("/payment-integration");
    }
    
  }

  // Remove Item from Cart
  const removeItem = async (id) => {
    try {
      const res = await dispatch(
        delteCartItem({ userId: user?.data?.user?._id, productId: id })
      ).unwrap();
      console.log(res);
      toast.success(res?.message);

      // Refresh cart after deleting item
      dispatch(getCart(user?.data?.user?._id));
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item.");
    }
  };

  // Calculate subtotal from Redux cartItems
  const subtotal = cartItems?.data?.cartItem?.items?.reduce(
    (sum, item) => sum + (item.productId?.price || 0) * (item.quantity || 1),
    0
  ) || 0;

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>

        {!cartItems?.data?.cartItem?.items || cartItems?.data?.cartItem?.items?.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg text-gray-500">Your cart is empty.</p>
            <Link
              to="/home"
              className="mt-4 inline-block rounded-md bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <form className="mt-12">
            <section aria-labelledby="cart-heading">
              <ul className="divide-y divide-gray-200 border-b border-t border-gray-200">
                {cartItems?.data?.cartItem?.items?.map((product) => (
                  <li key={product.productId?._id} className="flex py-6">
                    <div className="shrink-0">
                      <img
                        alt={product.productId?.productName || "Product image"}
                        src={product.productId?.mainProductImg}
                        className="size-24 rounded-md object-cover sm:size-32"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                      <Link to={`/product/${product.productId?._id}`} className="block">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium text-gray-700 hover:text-gray-800">
                            {product.productId?.productName}
                          </h4>
                          <p className="ml-4 text-sm font-medium text-gray-900">
                            {displayINRCurrency(product.productId?.price?.toFixed(2))}
                          </p>
                        </div>
                      </Link>

                      <div className="mt-4 flex items-center justify-between space-x-4">
                        <p className="flex items-center text-sm text-gray-700">
                          {product.quantity <= product.productId?.stock ? (
                            <CheckIcon className="h-5 w-5 text-green-500" />
                          ) : (
                            <ClockIcon className="h-5 w-5 text-gray-300" />
                          )}
                          <span className="ml-2">
                            {product.quantity <= product.productId?.stock ? "In stock" : "Out of stock"}
                          </span>
                        </p>

                        {/* Quantity Selector */}
                        <div className="flex items-center bg-gray-200 rounded-md">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(product?.productId?._id, product.quantity - 1)
                            }
                            className="px-3 py-1 text-gray-700"
                          >
                            -
                          </button>
                          <span className="px-4 text-sm font-medium">
                            {product.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(product?.productId?._id, product.quantity + 1)
                            }
                            className="px-3 py-1 text-gray-700"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(product.productId?._id)}
                          className="text-sm font-medium text-red-600 hover:text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Order Summary */}
            <section aria-labelledby="summary-heading" className="mt-10">
              <div>
                <dl className="space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-base font-medium text-gray-900">Subtotal</dt>
                    <dd className="ml-4 text-base font-medium text-gray-900">
                      {displayINRCurrency(subtotal.toFixed(2))}
                    </dd>
                  </div>
                </dl>
                <p className="mt-1 text-sm text-gray-500">
                  Shipping and taxes will be calculated at checkout.
                </p>
              </div>

              <div className="mt-10">
                <button
                  type="button"
                  onClick={() => handlePayment()}
                  className="w-full rounded-md bg-indigo-600 px-4 py-3 text-white hover:bg-indigo-700"
                >
                  Checkout
                </button>
              </div>

              <div className="mt-6 text-center text-sm">
                <p>
                  <Link
                    to="/home"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Continue Shopping <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </p>
              </div>
            </section>
          </form>
        )}
      </div>
    </div>
  );
}
