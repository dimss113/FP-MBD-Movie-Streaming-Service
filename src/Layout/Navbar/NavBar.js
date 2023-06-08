import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaHeart, FaSearch } from "react-icons/fa";
import { CgUser } from "react-icons/cg";

const NavBar = () => {
  const [storedData, setStoredData] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  const HandleGetStoredData = () => {
    const data = JSON.parse(localStorage.getItem("data"));
    setStoredData(data);
    if (!data) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }

    console.log("STORED DATA", data);
  };

  const handleRemoveData = () => {
    // Menghapus data dari local storage
    localStorage.removeItem("data");

    // Lakukan sesuatu setelah data dihapus
    console.log("Data telah dihapus dari local storage.");
    window.location.reload();
  };

  useEffect(() => {
    HandleGetStoredData();
  }, []);

  const hover = "hover:text-subMain transitions text-white";
  const Hover = ({ isActive }) => (isActive ? "text-subMain" : hover);
  return (
    <>
      <div className="bg-main shadow-md sticky top-0 z-20">
        <div className="contain mx-auto py-6 px-3 lg:grid gap-10 grid-cols-7 justify-between items-center">
          {/* Logo Name */}
          <div className="col-span-1 lg:block hidden">
            <Link to="/">
              {/* <img
                src="/images/logo.png"
                alt="logo"
                className="w-full h-12 object-contain"
              /> */}
              <div className="w-full h-12 flex justify-center">
                <span className="text-yellow-500 font-bold tracking-widest text-3xl">
                  Cimiflix
                </span>
              </div>
            </Link>
          </div>
          {/* Search Bar */}
          <div className="col-span-2">
            <form className="w-full text-sm bg-dryGray rounded flex-btn gap-4 ">
              <button
                type="submit"
                className="bg-subMain w-12 text-white flex-cols h-12 rounded"
              >
                <FaSearch className="w-6 h-6 m-auto" />
              </button>
              <input
                type="text"
                placeholder="Search Movie name"
                className="font-medium placeholder:text-border text-sm w-11/12 h-12 bg-transparent border-none px-2 text-black"
              />
            </form>
          </div>
          {/* Menus */}
          <div className="col-span-4 font-medium text-sm hidden xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end items-center ">
            {isLogin ? (
              <>
                <NavLink to="/movies" className={Hover}>
                  Movies
                </NavLink>
                <NavLink to="/about-us" className={Hover}>
                  About Us
                </NavLink>
                <NavLink to="/contact-us" className={Hover}>
                  Contact Us
                </NavLink>
                {/* <NavLink className={Hover}>
                  <CgUser className="w-6 h-6 inline-block" /> LogOut
                </NavLink> */}
                {/* create logout button */}
                <button onClick={() => handleRemoveData()} className={Hover}>
                  <CgUser className="w-6 h-6 inline-block" /> LogOut
                </button>
                <NavLink to="/favorites" className={`${Hover} relative`}>
                  <FaHeart className="w-6 h-6 inline-block" /> favorite
                  <div className="w-5 h-5 flex-cols rounded-full text-xs bg-subMain text-white absolute -top-5 -right-1">
                    2
                  </div>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/movies" className={Hover}>
                  Movies
                </NavLink>
                <NavLink to="/about-us" className={Hover}>
                  About Us
                </NavLink>
                <NavLink to="/contact-us" className={Hover}>
                  Contact Us
                </NavLink>
                <NavLink to="/login" className={Hover}>
                  <CgUser className="w-6 h-6 inline-block" /> Login
                </NavLink>
                <NavLink to="/register" className={Hover}>
                  <CgUser className="w-6 h-6 inline-block" /> Register
                </NavLink>
                <NavLink to="/favorites" className={`${Hover} relative`}>
                  <FaHeart className="w-6 h-6 inline-block" /> favorite
                  <div className="w-5 h-5 flex-cols rounded-full text-xs bg-subMain text-white absolute -top-5 -right-1">
                    2
                  </div>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
