import React from "react";
import "./CustomerList.css";
import Image1 from "../IMG/avatar_male.webp";
import { Link } from "react-router-dom";

const CustomerList = ({ clients }) => {
  const customers = [
    { name: "عيسي همامي", status: "جديد", country: "صبيا" },
    { name: "Layan الشهراني", status: "جديد", country: "أبو ظبي" },
    { name: "AMAL AL MANA", status: "جديد", country: "الدوحة" },
    { name: "Elham A", status: "جديد", country: "مكة" },
    { name: "mohab mamdouh", status: "جديد", country: "Riyadh" },
    { name: "Mohammad Suleimani", status: "جديد", country: "" },
    { name: "Hehffk Dhdhfb", status: "جديد", country: "" },
    { name: "Nazar Elshareef", status: "جديد", country: "" },
    { name: "Mohammad Ibrahim", status: "جديد", country: "الرياض" },
  ];

  return (
    <div className="customer-list-container">
      <div className="header-client">
        <div className="header-title-client p-3">
          <h2 className="mx-1" style={{ fontSize: "20px" }}>
            <span>
              <input
                type="checkbox"
                className="head-checkbox-client-input-head"
              />
            </span>
            <i className="sicon-users mx-1" style={{ fontSize: "20px" }}></i>
            <span style={{ fontSize: "28px", color: "black" }}> العملاء </span>
            <span>(38 عميل)</span>
          </h2>
        </div>
        <button className="edit-button-client">
          <i className="sicon-magic-wand flip-x"></i> تحرير سريع
        </button>
      </div>
      <div className="customerList-section">
        <div>
          <ul className="customer-list">
            {clients.map((client, index) => (
              <li key={index} className="customer-list-item">
                <div className="customer-info">
                  <input
                    type="checkbox"
                    className="header-checkbox-client-list"
                  />
                  <Link to={`/client/${client.userId}`}>
                    <span className="customer-avatar">
                      <img
                        src={
                          client.userPhoto == "string"
                            ? Image1
                            : client.userPhoto
                        }
                        alt=""
                      />
                    </span>
                  </Link>
                  <div className="customer-details">
                    <span className="customer-name">
                      {client.name}{" "}
                      <span className="customer-status mx-1">
                        {client.status}
                      </span>
                    </span>
                    {/* <button className="first-order-btn">
                        {" "}
                        <i
                          className="sicon-group"
                          style={{ color: "#00414d" }}
                        ></i>
                        اول طلب
                      </button> */}
                  </div>
                </div>

                <div>
                  <span className="customer-country-name">{client.email}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
