import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Inbox, Search, Trophy, User, CircleHelp, Rows3 } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [showLogoutButton, setShowLogoutButton] = useState(false);

  const handleLogoClick = () => {
    window.location.href = "/";
  };

  const handleUserClick = () => {
    setShowLogoutButton((prevState) => !prevState);
  };

  return (
    <nav className="fixed bg-white w-full z-20">
      <div className="flex align-middle items-center p-2 md:px-40">
        <div className="flex items-center justify-between w-full">
          <button className="w-40" onClick={handleLogoClick}>
            <img src="/logo.png" alt="Stack Overflow Logo" className="h-7" />
          </button>
          <div className="flex gap-4 px-4 text-sm font-thin">
            <Link to="/products">Products</Link>
            <Link to="/overflowAPI">Overflow API</Link>
          </div>
          <div className="flex-grow">
            <form action="">
              <div className="flex w-full border border-gray-400 rounded-md p-1">
                <Search className="h-5 w-5 opacity-50 mx-1" />
                <input
                  type="text"
                  className="outline-none text-slate-500 w-full"
                  placeholder="Search..."
                />
              </div>
            </form>
          </div>
          <div className="relative flex">
            {isLoggedIn ? (
              <div className="relative">
                <button onClick={handleUserClick}>
                  <User className="mx-4" />
                </button>
                {showLogoutButton && (
                  <div className="absolute right-0 mt-2 bg-white border border-black p-2">
                    <button onClick={logout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="mx-4">
                Login
              </Link>
            )}
            <div className="flex mx-5 gap-4">
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
