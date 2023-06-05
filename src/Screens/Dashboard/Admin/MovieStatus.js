import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../SideBar";
import { MoviesData } from "../../../Data/MoviesData";
import Table from "../../../Components/Table";
import { HiPlus } from "react-icons/hi";
import TableCategory from "../../../Components/TableCategory";
import { CategoriesData } from "../../../Data/CategoriesData";
import CategoryModal from "../../../Components/Modals/CategoryModal";
import AgeRateModal from "../../../Components/Modals/AgaRateModal";
import CastsModal2 from "../../../Components/Modals/CastsModal2";
import MovieStatusModal from "../../../Components/Modals/MovieStatusModal";

const MovieStatus = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [jenis, setJenis] = useState();
  const [jenisData, setJenisData] = useState([]);

  const HandleGetAllJenis = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/moviestatus/moviestatuss"
      );
      console.log(response.data.data);
      setJenisData(response.data.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  const onEditFunction = (id) => {
    setJenis(id);
    setModalOpen(!modalOpen);
  };

  const HandleDeleteJenis = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/moviestatus/delete-moviestatus/${id}`
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
      setJenis();
    }
  }, [modalOpen]);

  useEffect(() => {
    HandleGetAllJenis();
  }, []);

  return (
    <SideBar>
      <MovieStatusModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        status={jenis}
      />
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Movie Status</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-subMain flex-rows gap-4 font-medium transitions hover:bg-main border border-subMain text-white py-2 px-4 rounded "
          >
            <HiPlus className="text-white" /> Create
          </button>
        </div>
        <TableCategory
          datas={jenisData}
          users={false}
          ageRate={false}
          casts={false}
          moviestat={true}
          onEditFunction={onEditFunction}
          onDeleteFunction={HandleDeleteJenis}
        />
      </div>
    </SideBar>
  );
};

export default MovieStatus;
