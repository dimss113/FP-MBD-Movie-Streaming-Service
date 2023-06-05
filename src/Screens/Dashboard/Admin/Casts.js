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

const Casts = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [cast, setCast] = useState();
  const [castData, setCastData] = useState([]);

  const HandleGetAllCast = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cast/casts");
      console.log(response.data.data);
      setCastData(response.data.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  const onEditFunction = (id) => {
    setCast(id);
    setModalOpen(!modalOpen);
  };

  const HandleDeleteCast = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/cast/delete-cast/${id}`);
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
      setCast();
    }
  }, [modalOpen]);

  useEffect(() => {
    HandleGetAllCast();
  }, []);

  return (
    <SideBar>
      <CastsModal2
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        cast_={cast}
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
          datas={castData}
          users={false}
          ageRate={false}
          casts={true}
          moviestat={false}
          onEditFunction={onEditFunction}
          onDeleteFunction={HandleDeleteCast}
        />
      </div>
    </SideBar>
  );
};

export default Casts;
