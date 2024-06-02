import React from "react";
import SideBarContent from "../components/SideBarContent";
import Questions from "../components/Questions";

const Home = () => {
  return (
    <div className="p-2">
      <div className="flex justify-between">
        <div className="p-4">
          <Questions/>
        </div>
        <div className="p-5 pr-20">
          <SideBarContent/>
        </div>
      </div>
    </div>
  );
};

export default Home;
