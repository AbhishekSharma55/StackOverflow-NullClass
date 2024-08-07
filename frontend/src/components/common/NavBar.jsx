import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Inbox, Search, Trophy, User, CircleHelp, Rows3 } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const NavBar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [showLogoutButton, setShowLogoutButton] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const navBar = document.getElementById("navbar");
    navBar.classList.remove("bg-blue-200", "bg-green-200", "bg-yellow-300", "bg-white");
    if (localStorage.getItem("language")) {
      if (localStorage.getItem("language") === "hi") {
        navBar.classList.add("bg-blue-200");
      }
      if (localStorage.getItem("language") === "zh") {
        navBar.classList.add("bg-green-200");
      }
      if (localStorage.getItem("language") === "fr") {
        navBar.classList.add("bg-yellow-300");
      }
    } else {
      navBar.classList.add("bg-white");
    }
  });

  const handleLogoClick = () => {
    navigate("/");
  };

  const HandleRedirect = (link) => {
    setShowLogoutButton(false);
    navigate(link);
  };

  const handleUserClick = () => {
    setShowLogoutButton((prevState) => !prevState);
  };

  return (
    <nav id="navbar" className="absolute w-full z-20">
      <div className="flex align-middle items-center p-2 md:px-10">
        <div className="flex items-center justify-between w-full">
          <button className="w-auto pr-5" onClick={handleLogoClick}>
            <img
              src="/logo.png"
              alt="Stack Overflow Logo"
              className="hidden lg:block h-7 min-w-[120px] md:min-w-[160px]"
            />
            <img
              src="/minimallogo.png"
              alt="Stack Overflow Logo"
              className="block lg:hidden h-10 w-10 min-h-10 min-w-10"
            />
          </button>
          <div className="hidden lg:flex gap-4 px-4 text-sm font-thin">
            <Link to="#">{t("Products")}</Link>
            <Link to="#">{t("OverflowAPI")}</Link>
          </div>
          <div className="flex-grow">
            <form action="">
              <div className="flex w-full border border-gray-400 rounded-md p-1">
                <Search className="h-5 w-5 opacity-50 mx-1" />
                <input
                  type="text"
                  className="outline-none bg-transparent text-slate-500 w-full"
                  placeholder="Search..."
                />
              </div>
            </form>
          </div>
          <div className="relative flex items-center">
            {isLoggedIn ? (
              <div className="relative">
                <button onClick={handleUserClick}>
                  <User className="mx-4" />
                </button>
                {showLogoutButton && (
                  <div className="absolute right-0 mt-2 bg-transparent border border-black text-lg rounded bg-white">
                    <button
                      className="m-1 px-2 rounded text-xs"
                      onClick={() => {
                        HandleRedirect("/MyProfile");
                      }}
                    >
                      {t("Profile")}
                    </button>
                    <button
                      className="m-1 px-2 rounded text-xs"
                      onClick={logout}
                    >
                      {t("Logout")}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="mx-4"
                onClick={() => {
                  HandleRedirect("/login");
                }}
              >
                {t("Login")}
              </button>
            )}
            <div className="hidden md:flex mx-5 gap-4">
              <Inbox />
              <Trophy />
              <CircleHelp />
              <Rows3 />
            </div>
          </div>
        </div>
      </div>
      <hr className="bg-slate-500" />
    </nav>
  );
};

export default NavBar;
