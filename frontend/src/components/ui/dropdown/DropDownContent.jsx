import React from "react";
import "./dropdown.css";
const DropDownContent = ({ children , open }) => {
  return (
    <div className={`opacity-0 absolute flex flex-col items-center p-4 mt-2 bg-white rounded-md shadow-lg max-h-[40vh] overflow-y-scroll scrollbar-hide ${open? "content-open" : null} overflow-auto`}>
      {children}
    </div>
  );
};

export default DropDownContent;
