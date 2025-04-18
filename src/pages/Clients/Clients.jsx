import React, { useEffect, useState } from "react";
import "./Clients.css";
import HeaderComponent from "./component/HeaderComponent";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import ClientHead from "./component/ClientHead";
import CustomerList from "./component/CustomerList";
import ClientGroups from "./component/ClientGroups";

import { useCookies } from "react-cookie";
import { Request } from "../../components/utils/Request";
import { useSearchParams } from "react-router-dom";

import { allclients } from "../Products/dummyProducts";

function Clients({ darkMode, setDarkMode, userInfo }) {
  const [cookies, setCookie] = useCookies(["usertoken"]);
  const currentUser = JSON.parse(localStorage.getItem("userInfo"));

  const [clients, setclients] = useState([]);
  const [totalClients, settotalClients] = useState();
  const [CountUsersfirst, setCountUsersfirst] = useState();

  const [searchParams] = useSearchParams();
  const searach = searchParams.get("search");

  useEffect(() => {
    const getclients = async () => {
      try {
        // const { data } = await Request({
        //   url: `/api/UsersController/CountUsersFirstOrder`,
        //   headers: {
        //     Authorization: `Bearer ${cookies.usertoken}`,
        //   },
        // });
        setclients(allclients);
      } catch (error) {
        console.log(error);
      }
    };
    getclients();
  }, []);

  useEffect(() => {
    const getTotalClients = async () => {
      try {
        // const { data } = await Request({
        //   url: `/api/UsersController/CountUsers?name=${searach}&mobile=${searach}&admin_id=${currentUser.userId}`,
        //   headers: {
        //     Authorization: `Bearer ${cookies.usertoken}`,
        //   },
        // });
      } catch (error) {
        console.log(error);
      }
    };
    getTotalClients();
  }, []);
  useEffect(() => {
    const getCountUsersfirst = async () => {
      try {
      } catch (error) {
        console.log(error);
      }
    };
    getCountUsersfirst();
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
        <ClientGroups
          style={{ width: "98%" }}
          CountUsersfirst={5}
          totalClients={8}
        />
        <ClientHead style={{ width: "100%" }} />
        <CustomerList clients={clients} />
      </main>
    </div>
  );
}

export default Clients;
