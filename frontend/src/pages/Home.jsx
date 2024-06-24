// src/pages/Home.jsx
import React, { useEffect } from "react";
import SideBarContent from "../components/SideBarContent";
import Questions from "../components/Questions";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { i18n } = useTranslation();
  useEffect(() => {
    if(localStorage.getItem("language"))
    {
      i18n.changeLanguage(localStorage.getItem("language"));
      if(localStorage.getItem("language") === "hi")
      {
        const body  = document.getElementById("root");
        body.className = "bg-blue-400";
      }
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , []);


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
