import React, { useEffect, useState } from "react";
import "./Clients.css";
import HeaderComponent from "./component/HeaderComponent";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import OrderSummary from "../Orders/component/OrderSummary";
import { Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Request } from "../../components/utils/Request";
import { allclients, allorders } from "../Products/dummyProducts";

function Clients({ darkMode, setDarkMode, userInfo }) {
  const [showReleaseModal, setShowReleaseModal] = useState(false);
  const handleShowReleaseModal = () => setShowReleaseModal(true);
  const handleCloseReleaseModal = () => setShowReleaseModal(false);

  const [showeditClient, setShoweditClient] = useState(false);
  const handleShoweditClient = () => setShoweditClient(true);
  const handleCloseeditClient = () => setShoweditClient(false);

  const [showblockClient, setShowblockClient] = useState(false);
  const handleShowblockClient = () => setShowblockClient(true);
  const handleCloseblockClient = () => setShowblockClient(false);

  const [cookies, setCookie] = useCookies(["usertoken"]);
  const currentUser = JSON.parse(localStorage.getItem("userInfo"));
  const [loading, setloading] = useState(false);
  const [selectedorders, setselectedorders] = useState([]);

  const [client, setclient] = useState({});
  const [order, setorder] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    const getclient = async () => {
      try {
        // const { data } = await Request({
        //   url: `/api/UsersController/getuserbyid?id=${id}&admin_id=${currentUser.userId}`,
        //   headers: {
        //     Authorization: `Bearer ${cookies.usertoken}`,
        //   },
        // });
        setclient(allclients[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getclient();
  }, []);

  useEffect(() => {
    const getorder = async () => {
      try {
        // const { data } = await Request({
        //   url: `/api/Clients/getorder_client?userid=${id}`,
        //   headers: {
        //     Authorization: `Bearer ${cookies.usertoken}`,
        //   },
        // });
        setorder(allorders);
      } catch (error) {
        console.log(error);
      }
    };
    getorder();
  }, []);

  const updateClientImage = async (name, value) => {
    const formData = new FormData();
    formData.append("photo", value);

    try {
      setloading(true);
      handleClientChange(name, value);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  const updateClient = async () => {
    try {
      setloading(true);
      // const { data } = await Request({
      //   url: `/api/UsersController/Userprofile?id=${id}&admin_id=${currentUser.userId}`,
      //   data: [{ ...client }],
      //   headers: {
      //     Authorization: `Bearer ${cookies.usertoken}`,
      //   },
      // });
      setclient(allclients[0]);
      setloading(false);
      handleCloseeditClient();
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };

  const handleClientChange = (name, value) => {
    setclient((prev) => ({ ...prev, [name]: value }));
  };

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
          marginTop: "75px",
          height: "100%",
          // width: "calc(100% - 260px)",
          minHeight: "100vh",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <HeaderComponent />
        <div className="client container mt-5">
          <div className="d-flex justify-between">
            <h1>العميل</h1>
            <div
              className="client-options cursor-pointer"
              onClick={handleShowReleaseModal}
            >
              <i class="sicon-user ml-1"></i>
              <span>خيارات العميل</span>
            </div>
          </div>
          <div className="client-info">
            <div className="client-image">
              <input
                type="file"
                id="clientImage"
                onChange={(e) =>
                  updateClientImage(e.target.name, e.target.files[0])
                }
                name="userPhoto"
                style={{ display: "none" }}
              />
              <label className="editClient-image" htmlFor="clientImage">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </label>
              <img
                alt="صورة العميل"
                height="80"
                src={
                  typeof client.userPhoto === "string"
                    ? "https://storage.googleapis.com/a1aa/image/26DILztuhfSpdi6cjDSaJtd2eNBre8W4Md2vDfeATr56bwDhC.jpg"
                    : URL.createObjectURL(client.userPhoto)
                }
                width="80"
              />
              <p>{client.name}</p>
              <p>تاريخ الميلاد غير مدخل</p>
            </div>
            <div className="client-details">
              <p>
                <i class="ml-2 sicon-location v-align-middle"></i>
                المنطقة: نجران, Saudi Arabia
              </p>
              <p>
                <i class="ml-2 sicon-lang"></i>
                اللغة: العربية
              </p>
              <p>
                <i class="ml-2 sicon-calendar"></i>
                تاريخ التسجيل في المتجر: 2025-01-25
              </p>
              <p>
                <i class="ml-2 sicon-group"></i>
                منضم لمجموعة العملاء: اول طلب
              </p>
              <div className="phone-cover ">
                <a href={`tel:${client.mobile}`}>
                  {client.mobile}
                  <i class="ml-2 sicon-phone center inline-icon start"></i>
                </a>
              </div>
              <div className="client-contact">
                <a href={`https://wa.me/${client.mobile}`} target="_blank">
                  <i class="ml-2 sicon-whatsapp"></i>
                  واتساب
                </a>
                <a
                  href={`sms:${client.mobile}?body=${client.email}Hello%20there!`}
                >
                  <i class="ml-2 sicon-chat-message-alt"></i>
                  رسالة نصية
                </a>
                <a href={`mailto:${client.email}`}>
                  <i class="ml-2 sicon-mail"></i>
                  {client.email}{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
        <OrderSummary
          setselectedorders={setselectedorders}
          selectedorders={selectedorders}
          orders={order}
          setorders={setorder}
        />
      </main>
      <Modal
        show={showReleaseModal}
        onHide={handleCloseReleaseModal}
        dialogClassName="client left-aligned-service-release"
      >
        <Modal.Body>
          <div className="dropdown-item-service">
            <div className="text-container-service">
              <p>ارسال رسالة</p>
            </div>
            <div className="icon-container-drop">
              <i class="sicon-chat-conversation"></i>
            </div>
          </div>
          <div className="dropdown-item-service">
            <div
              className="text-container-service"
              onClick={handleShoweditClient}
            >
              <p>تعديل العميل</p>
            </div>
            <div className="icon-container-drop">
              <i class="sicon-edit"></i>
            </div>
          </div>
          <div
            className="dropdown-item-service"
            onClick={handleShowblockClient}
          >
            <div className="text-container-service">
              <p> حظر العميل</p>
            </div>
            <div className="icon-container-drop">
              <i class="sicon-block"></i>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={showeditClient}
        onHide={handleCloseeditClient}
        dialogClassName="client "
      >
        <Modal.Body>
          <div className="modal-header">
            <h5 className="modal-title">تعديل معلومات المستخدم (فجر جابر)</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  الاسم الأول
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="firstName"
                  onChange={(e) =>
                    handleClientChange(e.target.name, e.target.value)
                  }
                  value={client?.name}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  رقم الجوال
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="mobile"
                  id="lastName"
                  value={client?.mobile}
                  onChange={(e) =>
                    handleClientChange(e.target.name, e.target.value)
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={client?.email}
                  onChange={(e) =>
                    handleClientChange(e.target.name, e.target.value)
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="birthDate" className="form-label">
                  تاريخ الميلاد
                </label>
                <input type="date" className="form-control" id="birthDate" />
              </div>
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  النوع
                </label>
                <select className="form-select" id="gender">
                  <option>ذكر</option>
                  <option>أنثي</option>
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-save mr-auto"
              onClick={updateClient}
            >
              {loading ? "Loading ..." : "حفظ"}
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showblockClient}
        onHide={handleCloseblockClient}
        dialogClassName="client "
      >
        <Modal.Body>
          <div className="modal-header">
            <h5 className="modal-title">سبب الحظر</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  سبب الحظر
                </label>
                <select className="form-select" id="gender">
                  <option disabled> سبب الحظر</option>
                  <option>العميل لا يجيب عند التواصل</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  تفاصيل اخرى{" "}
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="تفاصيل اخرى"
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-save mr-auto">
              حفظ
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Clients;
