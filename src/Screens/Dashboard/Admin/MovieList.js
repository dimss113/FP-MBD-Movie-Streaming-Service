import React, { useState, useEffect } from "react";
import SideBar from "../SideBar";
import { MoviesData } from "../../../Data/MoviesData";
import Table from "../../../Components/Table";
import axios from "axios";
import MovieStatusModal from "../../../Components/Modals/MovieStatusModal";
import MovieModal from "../../../Components/Modals/MovieModal";

const MovieList = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [singleMovie, setSingleMovie] = useState();

  const HandleGetAllMoviesData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/movie/movies");
      console.log(response.data.data);
      setMoviesData(response.data.data);
    } catch (error) {
      if (error.response) {
        console.log(error);
      }
    }
  };

  // useEffect(() => {
  //   if (modalOpen === false) {
  //     setCategory();
  //   }
  // }, [modalOpen]);

  useEffect(() => {
    HandleGetAllMoviesData();
  }, []);

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Movie List</h2>
          <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded ">
            Delete All
          </button>
        </div>
        <Table data={moviesData} admin={true} />
      </div>
    </SideBar>
  );
};

export default MovieList;
