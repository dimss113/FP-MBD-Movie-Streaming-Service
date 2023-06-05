import React from "react";
import SideBar from "../SideBar";
import { MoviesData } from "../../../Data/MoviesData";
import Table from "../../../Components/Table";
import { HiPlus } from "react-icons/hi";
import TableCategory from "../../../Components/TableCategory";
import { CategoriesData } from "../../../Data/CategoriesData";
import { UserData } from "../../../Data/UserData";

const Users = () => {
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Categoris</h2>
          <button className="bg-subMain flex-rows gap-4 font-medium transitions hover:bg-main border border-subMain text-white py-2 px-4 rounded ">
            <HiPlus className="text-white" /> Create
          </button>
        </div>
        <TableCategory
          datas={UserData}
          users={true}
          ageRate={false}
          casts={false}
          moviestat={false}
        />
      </div>
    </SideBar>
  );
};

export default Users;
