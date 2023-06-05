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

const AgeRate = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [ageRate, setAgeRate] = useState();
  const [ageRateData, setAgeRateData] = useState([]);

  const HandleGetAllAgeRate = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/agerate/agerates"
      );
      console.log(response.data.data);
      setAgeRateData(response.data.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  const onEditFunction = (id) => {
    setAgeRate(id);
    setModalOpen(!modalOpen);
  };

  const HandleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/agerate/delete-agerate/${id}`);
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
      setAgeRate();
    }
  }, [modalOpen]);

  useEffect(() => {
    HandleGetAllAgeRate();
  }, []);

  return (
    <SideBar>
      <AgeRateModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        agerate={ageRate}
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
          datas={ageRateData}
          users={false}
          ageRate={true}
          casts={false}
          moviestat={false}
          onEditFunction={onEditFunction}
          onDeleteFunction={HandleDeleteCategory}
        />
      </div>
    </SideBar>
  );
};

export default AgeRate;
