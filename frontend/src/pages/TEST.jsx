import axios from "axios";
import React from "react";
import BrowserDetector from "./TypeOfBrowser";
// import DropDown from "../components/ui/dropdown/DropDown";
const TEST = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  
  const TestingAPICall = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/testing`);
      console.log(response.data.msg);
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
        TEST
      </button>
      <BrowserDetector />
    </div>
    // <div className="flex flex-row min-h-screen justify-center items-center">
    //   <DropDown buttonText="Profile" content={<p>Hello World</p>}></DropDown>
    // </div>
  );
};

export default TEST;
