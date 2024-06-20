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
            <Link to="#">Products</Link>
            <Link to="#">Overflow API</Link>
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
          <div className="relative flex items-center">
            {isLoggedIn ? (
              <div className="relative">
                <button onClick={handleUserClick}>
                  <User className="mx-4" />
                </button>
                {showLogoutButton && (
                  <div className="absolute right-0 mt-2 bg-white border border-black p-2 text-lg rounded">
                    <Link
                      className="border border-black m-1 px-2 rounded"
                      to={"/MyProfile"}
                    >
                      Profile
                    </Link>
                    <button
                      className="border border-black m-1 px-2 rounded"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="mx-4">
                Login
              </Link>
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
