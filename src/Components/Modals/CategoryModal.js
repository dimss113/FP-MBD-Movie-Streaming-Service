import React, { useState, useEffect } from "react";
import axios from "axios";
import MainModal from "./MainModal";
import { Input } from "../UsedInputs";
import { HiPlusCircle } from "react-icons/hi";

const CategoryModal = ({ modalOpen, setModalOpen, category }) => {
  const [title, setTitle] = useState("");

  const HandleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/category/add-category", {
        title: title,
      });
      setModalOpen(false);
      // reload window
      window.location.reload();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  const HandleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/category/update-category/${category.id}`,
        {
          title: title,
        }
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
    console.log({ title });
  }, [title]);

  return (
    <MainModal modalOpen={modalOpen} setModelOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <h2 className="text-3xl font-bold">{category ? "Update" : "Create"}</h2>
        {category ? (
          <form
            onSubmit={HandleUpdateCategory}
            className="flex flex-col gap-6 mt-6 text-left"
          >
            <div className="text-sm w-full">
              <label className="text-border font-semibold">Category Name</label>
              <input
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={category ? category.title : "category"}
                className={`w-full text-sm mt-2 p-4 border border-border rounded text-black bg-white" 
                }`}
              />
            </div>

            <button className="w-full flex-rows gap-4 py-4 text-lg font-bold transitions hover:bg-transparent hover:bg-dray border-2 border-subMain rounded-lg bg-subMain text-white">
              Update
            </button>
          </form>
        ) : (
          <form
            onSubmit={HandleAddCategory}
            className="flex flex-col gap-6 mt-6 text-left"
          >
            <div className="text-sm w-full">
              <label className="text-border font-semibold">Category Name</label>
              <input
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={title}
                className={`w-full text-sm mt-2 p-4 border border-border rounded text-black bg-white" 
                }`}
              />
            </div>

            <button className="w-full flex-rows gap-4 py-4 text-lg font-bold transitions hover:bg-transparent hover:bg-dray border-2 border-subMain rounded-lg bg-subMain text-white">
              Add
            </button>
          </form>
        )}
      </div>
    </MainModal>
  );
};

export default CategoryModal;
