import React, { useState, useEffect } from "react";
import SideBar from "../SideBar";
import { FaRegListAlt, FaUser } from "react-icons/fa";
import { HiViewGridAdd } from "react-icons/hi";
import Table from "../../../Components/Table";
import { MoviesData } from "../../../Data/MoviesData";
import axios from "axios";

const Dashboard = () => {
  const [movies, setMovies] = useState([]);

  const HandleGetAllMovies = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/movie/movies`);
      console.log("All Movies", res.data.data);
      setMovies(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    HandleGetAllMovies();
  }, []);

  const DashboardData = [
    {
      bg: "bg-orange-600",
      icon: FaRegListAlt,
      title: "Total Movies",
      total: 100,
    },
    {
      bg: "bg-blue-600",
      icon: HiViewGridAdd,
      title: "Total Categories",
      total: 8,
    },
    {
      bg: "bg-green-600",
      icon: FaUser,
      title: "Total Users",
      total: 122,
    },
  ];
  return (
    <SideBar>
      <h2 className="text-xl font-bold">Dashboard</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {DashboardData.map((item, i) => (
          <div
            key={i}
            className="p-4 rounded bg-main border-border grid grid-cols-4 gap-2"
          >
            <div
              className={`col-span-1 rounded-full h-12 w-12 flex-cols ${item.bg}`}
            >
              <item.icon className="text-white m-auto" />
            </div>
            <div className="col-span-3">
              <h2>{item.title}</h2>
              <p className="text-text mt-2 font-bold">{item.total}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-md font-medium italic my-6 text-border">
        Recent Movies
      </h3>
      <Table data={movies.slice(0, 5)} admin={true} />
    </SideBar>
  );
};

export default Dashboard;
