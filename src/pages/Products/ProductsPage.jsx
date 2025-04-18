import React, { useState, useEffect, useContext } from "react";
import HeaderComponent from "./component/HeaderComponent";
import ProductHead from "./component/ProductHead";
import ProductList from "./component/Products";

import "./ProductPage.css";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
// import Helper from "../../components/Helper";
import { Request } from "../../components/utils/Request";
import { ProductContext } from "../../components/context/Product";

import { ToastContainer } from "react-toastify";
import DotLoader from "react-spinners/DotLoader";

import { productsDummy } from "./dummyProducts";
import { useSearchParams } from "react-router-dom";

const ProductsPage = (props) => {
  const { dispatch, products } = useContext(ProductContext);
  const [allProducts, setallProducts] = useState([]);

  const [loading, setloading] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("userInfo"))?.userId;
  const [searchParams] = useSearchParams();
  const searach = searchParams.get("search");
  const override = {
    position: "absolute",
    inset: "50%",
  };
  useEffect(() => {
    const getProduts = async () => {
      setloading(true);
      try {
        // const { data } = await Request({
        //   url: searach
        //     ? `/api/Clients/search?name=${searach}`
        //     : `/api/Product_details/Getall?userid=${currentUser}`,
        // });
        dispatch({
          type: "fetchProducts",
          payload: productsDummy,
        });
        setallProducts(productsDummy);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    };
    getProduts();
  }, [searach]);

  return (
    <div
      className={`slidePage flex flex-wrap' ${props.darkMode ? "dark" : ""}`}
      style={{ backgroundColor: props.darkMode ? "#282828" : "transparent" }}
    >
      <Sidebar userInfo={props.userInfo} />
      <Navbar
        darkMode={props.darkMode}
        setDarkMode={props.setDarkMode}
        userInfo={props.userInfo}
      />
      <main
        className="w-full h-full lg:w-[calc(100%-260px)] pt-0 px-0 lg:px-10 pb-[60px]"
        style={{
          flexGrow: 2,
          marginTop: "80px",
          marginRight: "250px",
          height: "100%",
          width: "calc(100% - 260px)",
          minHeight: "100vh",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <div className="headerComponent" style={{ width: "98%" }}>
          <HeaderComponent />
          <ProductHead allProducts={products} />
          {loading ? (
            <DotLoader
              color="#2ffff3"
              size={60}
              cssOverride={override}
              loading={loading}
            />
          ) : (
            <ProductList />
          )}
        </div>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      />
    </div>
  );
};

export default ProductsPage;
