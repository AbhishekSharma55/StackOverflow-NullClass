import axios from "axios";
import React from "react";

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
    <div className="flex items-center justify-center h-screen">
      <button
      className="border border-black p-2 rounded-md"
        onClick={() => {
          TestingAPICall();
        }}
      >
        TEST
      </button>
    </div>
  );
};

export default TEST;
