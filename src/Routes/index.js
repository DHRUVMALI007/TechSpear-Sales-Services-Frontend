import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import ForgetPassword from "../Pages/ForgetPassword";
import SignUp from "../Pages/Signup";
import AboutUs from "../Pages/AboutUs";
import Services from "../Pages/Services";
import ContactUs from "../Pages/ContactUs";
import AdminPanel from "../Pages/AdminPages/AdminPanel";
import AllUser from "../Pages/AdminPages/AllUser";
import AllProduct from "../Pages/AdminPages/AllProduct";
import CategoryProduct from "../Pages/CategoryProduct";
import AdminDeshboard from "../Pages/AdminPages/AdminDeshboard";
import OrderManagement from "../Pages/AdminPages/OrderManagement";
import PaymentManagement from "../Pages/AdminPages/PaymentManagement";
import ServiceManagement from "../Pages/AdminPages/ServiceManagement";
import UserProfile from "../Pages/UserPage/UserProfile";
import UserPanel from "../Pages/UserPage/UserPanel";
import OrderManage from "../Pages/UserPage/OrderManage";
import AppoitmentHistory from "../Pages/UserPage/AppointmentHistory";
import PaymentHistory from "../Pages/UserPage/PaymentHistory"
import UserSetting from "../Pages/UserPage/UserSetting"
import ProductDisplay from "../Pages/ProductDetails.js"
import UserCart from "../Pages/UserCart.js";
import Payment from "../Pages/Payment.js"
import PaymentSuccess from "../Components/PaymentSuccess.js"
import WriteReview from "../Pages/WriteReview.js"


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgetPassword />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
      {
        path: "user-cart",
        element: <UserCart />,
      },
      {
        path: "payment-integration",
        element: <Payment />,
      },
      {
        path: "product/:id",
        element: <ProductDisplay />,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess  />,
        children : [
          {
            path: "write-review",
            element: <WriteReview/>,
          }
        ]
      },
      {
        path: "user-panel",
        element: <UserPanel />,
        children: [
          {
            path: "",
            element: <UserProfile />,
          },
          {
            path: "order-manage",
            element: <OrderManage />,
          },
          {
            path: "Appointment-history",
            element: <AppoitmentHistory />,
          },
          {
            path: "Payment-history",
            element: <PaymentHistory />,
          },
          {
            path: "User-Setting",
            element: <UserSetting />,
          },

        ]
      },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "",
            element: <AdminDeshboard />,
          },
          {
            path: "all-user",
            element: <AllUser />,
          },
          {
            path: "all-product",
            element: <AllProduct />,
          },
          {
            path: "order-management",
            element: <OrderManagement />,
          },
          {
            path: "payment-management",
            element: <PaymentManagement />,
          },
          {
            path: "service-management",
            element: <ServiceManagement />,
          },
        ]
      },
      {
        path: "product-category",
        element: <CategoryProduct />,
      },
    ],
  },
]);

export default router;