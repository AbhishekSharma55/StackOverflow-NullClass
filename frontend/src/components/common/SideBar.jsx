import { FileQuestion, Tag, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SideBar = () => {
  const { t } = useTranslation();

  return (
    <div className="hidden md:block absolute w-64 md:w-80 h-full pt-20 z-21">
      <div className="flex flex-col items-center">
        <div>
          <ul className="text-sm">
            <li className="text-slate-500">
              <Link to="/" className="py-2 flex font-bold text-black">
                <FileQuestion className="mr-2 w-5" />
                {t("questions")}
              </Link>
            </li>
          </ul>
          <ul className="text-sm">
            <li className="text-slate-500">
              <Link to="/users" className="py-2 flex font-bold text-black">
                <User className="mr-2 w-5" />
                {t("Users")}
              </Link>
            </li>
            <li className="text-slate-500">
              <Link to="/tags" className="py-2 flex font-bold text-black">
                <Tag className="mr-2 w-5" />
                {t("Tags")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
