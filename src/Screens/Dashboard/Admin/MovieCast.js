import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../SideBar";
import { MoviesData } from "../../../Data/MoviesData";
import Table from "../../../Components/Table";
import { HiPlus } from "react-icons/hi";
import TableCategory from "../../../Components/TableCategory";
import { CategoriesData } from "../../../Data/CategoriesData";
import CategoryModal from "../../../Components/Modals/CategoryModal";
import MovieCastModal from "../../../Components/Modals/MovieCastModal";

const MovieCast = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [moviecast, setMovieCast] = useState();
  const [movieCastData, setMovieCastData] = useState([]);

  const HandleGetAllMovieCast = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/moviecast/moviecasts"
      );
      console.log(response.data.data);
      setMovieCastData(response.data.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  const onEditFunction = (moviedata) => {
    setMovieCast(moviedata);
    setModalOpen(!modalOpen);
  };

  const HandleDeleteMovieCast = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/moviecast/delete-moviecast/${id}`
      );
      setModalOpen(false);
      // reload window
      window.location.reload();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (modalOpen === false) {
      setMovieCast();
    }
  }, [modalOpen]);

  useEffect(() => {
    HandleGetAllMovieCast();
  }, []);

  return (
    <SideBar>
      <MovieCastModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        singleMovieCast={moviecast}
      />
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Categoris</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-subMain flex-rows gap-4 font-medium transitions hover:bg-main border border-subMain text-white py-2 px-4 rounded "
          >
            <HiPlus className="text-white" /> Create
          </button>
        </div>
        <TableCategory
          datas={movieCastData}
          users={false}
          ageRate={false}
          casts={false}
          moviestat={false}
          moviecast={true}
          onEditFunction={onEditFunction}
          onDeleteFunction={HandleDeleteMovieCast}
        />
      </div>
    </SideBar>
  );
};

export default MovieCast;
