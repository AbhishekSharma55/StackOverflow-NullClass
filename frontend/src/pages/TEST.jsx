import axios from "axios";
import React from "react";
import BrowserDetector from "./TypeOfBrowser";
// import DropDown from "../components/ui/dropdown/DropDown";
const TEST = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  
  const TestingAPICall = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/testing`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-10 items-center justify-center h-screen">
      <button
        className="border border-black p-2 rounded-md"
        onClick={() => {
          TestingAPICall();
        }}
      >
        Test
      </button>
      <h2></h2>
    </div>
  );
};

export default TEST;
