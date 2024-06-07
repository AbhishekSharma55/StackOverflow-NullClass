import { FileQuestion, Tag, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="hidden md:block fixed border border-slate-300 w-64 md:w-80 h-full pt-20 z-21">
      <div className="flex flex-col ml-10 md:ml-20 lg:ml-40">
        <ul className="text-sm">
          <li className="text-slate-500">
            <Link to="/" className="py-2 flex font-bold text-black">
              <FileQuestion className="mr-2 w-5" />
              Questions
            </Link>
          </li>
        </ul>
        <ul className="text-sm">
          <li className="text-slate-500">
            <Link to="/users" className="py-2 flex font-bold text-black">
              <User className="mr-2 w-5" />
              Users
            </Link>
          </li>
          <li className="text-slate-500">
            <Link to="/tags" className="py-2 flex font-bold text-black">
              <Tag className="mr-2 w-5" />
              Tags
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
