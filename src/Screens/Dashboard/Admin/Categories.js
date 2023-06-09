import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../SideBar";
import { MoviesData } from "../../../Data/MoviesData";
import Table from "../../../Components/Table";
import { HiPlus } from "react-icons/hi";
import TableCategory from "../../../Components/TableCategory";
import { CategoriesData } from "../../../Data/CategoriesData";
import CategoryModal from "../../../Components/Modals/CategoryModal";

const Categories = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState();
  const [categoriesData, setCategoriesData] = useState([]);

  const HandleGetAllCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/category/categories"
      );
      console.log(response.data.data);
      setCategoriesData(response.data.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  const onEditFunction = (id) => {
    setCategory(id);
    setModalOpen(!modalOpen);
  };

  const HandleDeleteCategory = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/category/delete-category/${id}`
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
      setCategory();
    }
  }, [modalOpen]);

  useEffect(() => {
    HandleGetAllCategories();
  }, []);

  return (
    <SideBar>
      <CategoryModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        category={category}
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
          datas={categoriesData}
          users={false}
          ageRate={false}
          casts={false}
          moviestat={false}
          onEditFunction={onEditFunction}
          onDeleteFunction={HandleDeleteCategory}
        />
      </div>
    </SideBar>
  );
};

export default Categories;
