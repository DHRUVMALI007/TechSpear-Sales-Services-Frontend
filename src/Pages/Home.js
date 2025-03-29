import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../Helpers/ThemeContext";
import CategoryList from "../Components/CategoryList";
import BannerProduct from "../Components/BannerProduct";
import HorizontalCardProduct from "../Components/HorizontalCardProduct";
import VerticalCardProduct from "../Components/VerticalCardProduct";
import Footer from "../Components/Footer";
import { useSelector ,useDispatch } from "react-redux";
import { getAllProduct } from "../features/productSlice";

const Home = () => {
  // const [loading, setLoading] = useState(true);
  const { isDarkMode } = useContext(ThemeContext);

  const dispatch= useDispatch()
  const {product,loading,error}=useSelector((state)=>state.product)
console.log("MYHOME PROUDUCT",product)

  useEffect(()=>{
    dispatch(getAllProduct());
  },[dispatch])

  const trendingProd= product?.data?.filter((item)=>item.isTrending===true)
  const otherProd= product?.data?.filter((item)=>item.isTrending===false)
  // console.log("trend",trendingProd)
  // console.log("Other",otherProd)
  //console.log("Loading",loading) -comes with the backend api

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="px-4 md:px-8 lg:px-12 py-6 space-y-8">
          <CategoryList />
          <BannerProduct />
          <HorizontalCardProduct heading={"Trending Products"} products={trendingProd} loading={loading}/>
          <HorizontalCardProduct heading={"Other Products"} products={otherProd} loading={loading}/>

          {/* <HorizontalCardProduct heading={"Trending Productsss"}/> */}
       
        </div>
      )}
      <Footer /> {/* Ensure Footer is inside the return statement */}
    </div>
  );
};

export default Home;
