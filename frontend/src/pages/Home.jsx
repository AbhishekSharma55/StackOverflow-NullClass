import React, { useEffect } from "react";
import SideBarContent from "../components/SideBarContent";
import Questions from "../components/Questions";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const { verificationMessage } = location.state || {};

  useEffect(() => {
    if (verificationMessage) {
      const timeoutId = setTimeout(() => {
        const element = document.getElementById("verification-message");
        if (element) {
          element.remove();
        }
      }, 3000);
  
      return () => clearTimeout(timeoutId);
    }
  }, [verificationMessage]);
  

  return (
    <div className="p-2">
      {verificationMessage && (
        <div
          id="verification-message"
          className="fixed bg-green-200 text-green-800 p-4 mb-4 rounded-lg"
        >
          {verificationMessage}
        </div>
      )}
      <div className="flex justify-between">
        <div className="p-4">
          <Questions />
        </div>
        <div className="p-5 pr-20">
          <SideBarContent />
        </div>
      </div>
    </div>
  );
};

export default Home;
