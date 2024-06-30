import React, { useState } from "react";
import DropDownButton from "../dropdown/DropDownButton";
import DropDownContent from "../dropdown/DropDownContent";

const DropDown = ({ buttonText, content }) => {
  const [open, setOpen] = useState(false);
  const toggleDropDown = () => {
    setOpen(!open);
  };

  return (
    <div className="relative">
      <DropDownButton toggle={toggleDropDown} open={open}>
        {buttonText}
      </DropDownButton>
      <DropDownContent open={open}>{content}</DropDownContent>
    </div>
  );
};

export default DropDown;
