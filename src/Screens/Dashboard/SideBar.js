import React from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaHeart, FaListAlt, FaUsers } from "react-icons/fa";
import { RiLockPasswordFill, RiMovie2Fill } from "react-icons/ri";
import { HiViewGridAdd } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import Layout from "../../Layout/Layout";
import { NavLink } from "react-router-dom";
import { hover } from "@testing-library/user-event/dist/hover";

const SideBar = ({ children }) => {
  const SideLinks = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: BsFillGridFill,
    },
    {
      name: "Movies List",
      link: "/movieslist",
      icon: FaListAlt,
    },
    {
      name: "Add Movie",
      link: "/addmovie",
      icon: RiMovie2Fill,
    },
    {
      name: "Categories",
      link: "/categories",
      icon: HiViewGridAdd,
    },
    {
      name: "Users",
      link: "/users",
      icon: FaUsers,
    },
    // {
    //   name: "Update Profile",
    //   link: "/profile",
    //   icon: FiSettings,
    // },
    {
      name: "Favorites Movie",
      link: "/favorites",
      icon: FaHeart,
    },
    // {
    //   name: "Change Password",
    //   link: "/password",
    //   icon: RiLockPasswordFill,
    // },
    {
      name: "Age Rate",
      link: "/agerate",
      icon: FaListAlt,
    },
    {
      name: "Casts",
      link: "/casts",
      icon: FaListAlt,
    },
    {
      name: "Movie Status",
      link: "/moviestatus",
      icon: FaListAlt,
    },
    {
      name: "Movie Cast",
      link: "/moviecast",
      icon: FaListAlt,
    },
    {
      name: "Bookmark",
      link: "/bookmark",
      icon: FaListAlt,
    },
    {
      name: "Payment Method",
      link: "/paymentmethod",
      icon: FaListAlt,
    },
  ];

  const active = "bg-drayGray text-subMain";
  const hover = "hover:text-white hover:bg-main";
  const inActive =
    "rounded font-medium text-sm transitions flex gap-3 items-center p-4";
  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;

  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-2">
        <div className="xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6">
          <div className="col-span-2 sticky bg-dry border border-gray-800 p-6 rounded-md xl:mb-0 mb-5">
            {
              // sidebar links
              SideLinks.map((link, index) => (
                <NavLink to={link.link} key={index} className={Hover}>
                  <link.icon /> <p>{link.name}</p>
                </NavLink>
              ))
            }
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="10"
            data-aos-offset="100"
            className="col-span-6 rounded-md bg-dray border border-gray-800 p-6"
          >
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SideBar;
