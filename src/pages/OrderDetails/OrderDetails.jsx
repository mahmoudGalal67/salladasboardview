import React, { useEffect, useState } from "react";
import HeaderComponent from "./component/HeaderComponent";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./Order.css";

import { useCookies } from "react-cookie";
import { Request } from "../../components/utils/Request";
import { useParams } from "react-router-dom";

function Orders({ darkMode, setDarkMode, userInfo }) {
  const currentUser = JSON.parse(localStorage.getItem("userInfo"));

  const [cookies, setCookie] = useCookies(["usertoken"]);

  const [order, setorder] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const getorders = async () => {
      try {
        // const { data } = await Request({
        //   url: `/api/Clients/get_order_with_shopping?orderid=${id}`,
        //   headers: {
        //     Authorization: `Bearer ${cookies.usertoken}`,
        //   },
        // });
        // setorder(data);
      } catch (error) {
        console.log(error);
      }
    };
    getorders();
  }, []);

  return (
    <div
      className={`flex flex-wrap' ${darkMode ? "dark" : ""}`}
      style={{ backgroundColor: darkMode ? "#282828" : "transparent" }}
    >
      <Sidebar userInfo={userInfo} />
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        userInfo={userInfo}
      />
      <main
        className="w-full h-full lg:w-[calc(100%-260px)] pt-0 px-4 lg:px-10 pb-[60px]"
        style={{
          flexGrow: 2,
          marginTop: "80px",
          height: "100%",
          width: "calc(100% - 260px)",
          minHeight: "100vh",
          display: "flex",
          flexWrap: "wrap",

          justifyContent: "space-around",
        }}
      >
        <div style={{ width: "98%" }}>
          <HeaderComponent />
          <div className="container my-8">
            <div className="order-card">
              <div className="row">
                <div className="col text-center order-detailss">
                  <i className="fas fa-hashtag"></i> تعديل الطلب رقم
                </div>
                <div className="col text-center order-detailss">
                  <i className="fas fa-calendar-alt"></i> تاريخ الطلب
                </div>
                <div className="col text-center order-detailss">
                  <i className="fas fa-info-circle"></i> حالة الطلب
                </div>
              </div>
              <div className="row mt-2">
                <div className="col text-center order-statuss">
                  {order[0]?.payment_id}
                </div>
                <div className="col text-center order-date">
                  {order[0]?.created_at}
                </div>
                <div className="col text-center order-number">
                  {order[0]?.status}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col text-end tags">الوسوم:</div>
              </div>
            </div>
            <div className="container">
              <div className="summary-container">
                <div className="summary-header">
                  <i class="sicon-page ml-2"></i> ملخص الطلب
                </div>
                <div className="summary-item">
                  <span>مجموع السلة</span>
                  <span className="value">SAR {order[0]?.total_amount}</span>
                </div>
                <div className="summary-item">
                  <span>خيارات الطلب</span>
                  <span className="value">SAR {order[0]?.total_amount}</span>
                </div>
                <div className="summary-item">
                  <span>كوبونات التخفيض</span>
                  <input placeholder="ابحث عن كوبون" className="coupon-input" />
                </div>
                <div className="summary-footer">
                  <span> إجمالي الطلب </span>
                  <span className="value">SAR {order[0]?.total_amount}</span>
                </div>
              </div>
            </div>
            <div className="table-container mt-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                {/* <button className="btn btn-outline-success btn-add-product">
                  <i className="fas fa-plus"></i> إضافة منتج
                </button> */}
                <h5 className="mb-0 mx-2">
                  <i class="sicon-t-shirt ml-2"></i> المنتجات
                </h5>
              </div>
              <table className="table">
                <thead className="table-header">
                  <tr>
                    <th>المنتج</th>
                    <th>إجمالى الوزن</th>
                    <th>الكمية</th>
                    <th>وزن القطعة الواحدة</th>
                    <th>السعر</th>
                    <th>المجموع</th>
                  </tr>
                </thead>
                <tbody>
                  {order[0]?.shopping_carddto.map((cart) => (
                    <tr key={cart.shopping_cart_id}>
                      <td>
                        {" "}
                        <a
                          href={`http://localhost:5173/productDetails/${cart.product_id}?id=${currentUser.userId}`}
                          target="blank"
                        >
                          {cart.product_name}
                        </a>
                      </td>

                      <td>--------</td>
                      <td>{cart.quantity}</td>
                      <td>--------</td>
                      <td>{cart.price} SAR</td>
                      <td>{cart.total} SAR</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Orders;
