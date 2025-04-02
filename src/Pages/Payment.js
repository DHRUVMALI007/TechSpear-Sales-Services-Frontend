import { useNavigate } from "react-router-dom";
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import displayINRCurrency from "../Helpers/displayCurrency";
import { toast } from "react-toastify";
import { addAddress } from "../features/addressSlice";
import { createOrder } from "../features/orderSlice";
import { createPayment, verifyPayment } from "../features/paymentSlice";
import loadScript from "../Helpers/loadScript";

export default function Example() {

  const [formData, setFormData] = useState({
    email: "",
    fullAddress: "",
    apartment: "",
    city: "",
    country: "",
    state: "",
    pinCode: "",
    phone: "",
  });

  const navigate = useNavigate();

  const dispatch = useDispatch()

  const { cartItems } = useSelector((state) => state.cart)
  console.log(cartItems?.data)
  const { user } = useSelector((state) => state.auth)
  console.log(user)
  const userId = user?.data?.user?._id;

  const { address } = useSelector((state) => state.address)
  console.log("user add", address)

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })

  }

  const subtotal = cartItems?.data?.cartItem?.items?.reduce(
    (sum, item) => sum + (item.productId?.price || 0) * (item.quantity || 1),
    0
  ) || 0;

  // console.log(formData)

  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    console.log("Called fun confirm order")

    try {
      const isLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

      if (!isLoaded) {
        console.error("Razorpay SDK failed to load.");
        toast.error("Razorpay SDK failed to load.")
        return;
      }

      if (!userId) {
        toast.error("User not found, please login.");
        navigate("/login");
        return;
      }

      if (!cartItems?.data?.cartItem?._id) {
        toast.error("Your cart is empty.");
        navigate("/user-cart");
        return;
      }
      if (formData.email === "") {
        toast.error("Pls enter all the detail of Shipping.")
      }
      const res = await dispatch(addAddress({ userId, formData })).unwrap()

      console.log(res)
      toast.success(res?.message || res?.payload?.message)
      console.log(res?.data?._id)
      console.log(res?.payload?.data?._id)

      // if (!res?.payload?.data?._id) {
      //   toast.error("Address not found or not store in db. pls again refresh and set address.")
      // }

      try {

        const ordr = await dispatch(createOrder({ userId, addressInfo: res?.data?._id, cartItems: cartItems?.data?.cartItem?._id })).unwrap()

        toast.success(ordr?.message)
        console.log(ordr)

        const orderId = ordr?.data?._id;
        if (!orderId) {
          toast.error("Failed To create Order")
          return;
        }

        const paymentRs = await dispatch(createPayment({ userId, orderId, amount: subtotal })).unwrap()
        console.log(paymentRs)



        const options = {
          key: "rzp_test_pnNFdssTvAiGlD",
          amount: subtotal * 100, // Convert to paisa 
          currency: "INR",
          name: "Tech Speare",
          description: "Test Transaction",
          order_id: paymentRs?.data?.payment?.
            razorpayOrderId,
          handler: async function (response) {
            console.log("Payment Success:", response);
            console.log("Razorpay Payment ID:", response.razorpay_payment_id);
            console.log("Razorpay Order ID:", response.razorpay_order_id);
            console.log("Razorpay Signature:", response.razorpay_signature);

            if (!response.razorpay_order_id || !response.razorpay_signature) {
              console.error("Missing required Razorpay parameters.");
              toast.error("Payment verification failed.");
              return;
            }
            const verifyRes= await dispatch(
              verifyPayment({
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                orderId,
              })
            ).unwrap()
            console.log("Payment Verification Response:", verifyRes);
            toast.success(verifyRes.message);
          },
          prefill: {
            name: user?.data?.user?.name,
            email: user?.data?.user?.email
          },
          theme: {
            color: "#3399cc",
          },
        };

        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();



      }
      catch (er) {
        toast.error(er)
        console.log(er)
      }

    }
    catch (error) {
      console.log(error)
      toast.error(error)
    }


    // navigate("/payment-success", { state: { paymentStatus: "success" } });
  };


  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Checkout</h2>

        <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <div className=" lg:mt-0 lg:sticky lg:top-0 overflow-y-auto h-screen scrollbar-hide mb-32">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Contact information</h2>

              <div className="mt-4">
                <label htmlFor="email-address" className="block text-sm/6 font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleOnChange}
                    className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">Shipping information</h2>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">

                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm/6 font-medium text-gray-700">
                    Full Address
                  </label>
                  <div className="mt-2">
                    <input
                      id="address"
                      name="fullAddress"
                      type="text"
                      required
                      value={formData.address}
                      onChange={handleOnChange}
                      autoComplete="street-address"
                      className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="apartment" className="block text-sm/6 font-medium text-gray-700">
                    Apartment, suite, etc.
                  </label>
                  <div className="mt-2">
                    <input
                      id="apartment"
                      name="apartment"
                      type="text"
                      required
                      value={formData.apartment}
                      onChange={handleOnChange}
                      className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm/6 font-medium text-gray-700">
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      required
                      onChange={handleOnChange}
                      autoComplete="address-level2"
                      className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm/6 font-medium text-gray-700">
                    Country
                  </label>
                  <div className="mt-2 grid grid-cols-1">
                    <select
                      id="country"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleOnChange}
                      autoComplete="country-name"
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                      <option>Select Country</option>
                      <option>India</option>
                    </select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="region" className="block text-sm/6 font-medium text-gray-700">
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      id="region"
                      name="state"
                      type="text"
                      required
                      value={formData.state}
                      onChange={handleOnChange}
                      autoComplete="address-level1"
                      className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-700">
                    Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      id="postal-code"
                      name="pinCode"
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={handleOnChange}
                      autoComplete="postal-code"
                      className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-700">
                    Phone
                  </label>
                  <div className="mt-2">
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      autoComplete="tel"
                      required
                      value={formData.phone}
                      onChange={handleOnChange}
                      className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <ul className="divide-y divide-gray-200">
                {cartItems?.data?.cartItem?.items?.map((product) => (
                  <li key={product?.productId?._id} className="flex px-4 py-6 sm:px-6">
                    <div className="shrink-0">
                      <img alt={product?.productId?.productName} src={product?.productId?.mainProductImg} className="w-20 rounded-md" />
                    </div>

                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <a href={product.href} className="font-medium text-gray-700 hover:text-gray-800">
                              {product?.productId?.productName}
                            </a>
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">{product?.productId?.category}</p>
                          <p className="mt-1 text-sm text-gray-500">{product?.productId?.description}</p>
                        </div>

                        <div className="ml-4 flow-root shrink-0">
                          <p>Qty : {product?.quantity}</p>
                        </div>
                      </div>

                      <div className="flex flex-1 items-end justify-between pt-2">
                        <p className="mt-1 text-sm font-medium text-gray-900"> {displayINRCurrency(product?.productId?.price)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">

                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">{displayINRCurrency(subtotal)}</dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <button
                  type="submit"
                  onClick={(e) => handleConfirmOrder(e)}
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
