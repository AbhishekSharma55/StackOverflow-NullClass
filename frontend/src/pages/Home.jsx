// src/pages/Home.jsx
import React, { useContext, useEffect } from "react";
import SideBarContent from "../components/common/SideBar2";
import Questions from "../components/Questions";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useAlert } from "../context/AlertContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

const Home = () => {
  const { logout } = useContext(AuthContext);
  const showAlert = useAlert();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  useEffect(
    () => {
      if (localStorage.getItem("language")) {
        i18n.changeLanguage(localStorage.getItem("language"));
        if (localStorage.getItem("language") === "hi") {
          const body = document.getElementById("root");
          body.className = "bg-blue-400";
        }
        if (localStorage.getItem("language") === "zh") {
          const body = document.getElementById("root");
          body.className = "bg-green-400";
        }
        if (localStorage.getItem("language") === "fr") {
          const body = document.getElementById("root");
          body.className = "bg-yellow-400";
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    const CheckLoginStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          showAlert("Please Login To Continue", "success");
          return;
        }
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${apiUrl}/api/auth/isloggedin`,
          config
        );
        if (response.data.err) {
          logout();
          showAlert("Session Expired , Please Login Again.", "error");
        }
      } catch (error) {
        console.log(error);
      }
    };
    CheckLoginStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-2">
      <div className="flex justify-between">
        <div className="p-4">
          <Questions />
        </div>
        <div className="lg:p-5 lg:pr-20">
          <SideBarContent />
        </div>
      </div>
    </div>
  );
};

export default Home;
