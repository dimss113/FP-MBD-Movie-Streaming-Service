import React from "react";
import MainModal from "./MainModal";
import { Input } from "../UsedInputs";
import { HiPlusCircle } from "react-icons/hi";
import Uploader from "../Uploader";

const CastsModal = ({ modalOpen, setModalOpen, cast }) => {
  return (
    <MainModal modalOpen={modalOpen} setModelOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <h2 className="text-3xl font-bold">{cast ? "Update Cast" : "Create Cast"}</h2>
        <form className="flex flex-col gap-6 mt-6 text-left">
          <Input
            label="Cast Name"
            type="text"
            placeholder={cast ? cast.name : "John Doe"}
            bg={true}
          />
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">
              Cast Image
            </p>
            <Uploader />
            <div className="w-32 h-32 p-2 bg-main border border-border rounded">
              <img
                src={`${cast}` ? `/Images/user.jpg` : "/Images/user.jpg"}
                alt={cast?.name}
                className="w-full h-full object cover rounded"
              />
            </div>
          </div>
          <button
            onClick={() => setModalOpen(false)}
            className="w-full flex-rows gap-4 py-4 text-lg font-bold transitions hover:bg-transparent hover:bg-dray border-2 border-subMain rounded-lg bg-subMain text-white"
          >
            {cast ? (
              "Update"
            ) : (
              <>
                <HiPlusCircle />
                Add
              </>
            )}
            {/* <HiPlusCircle /> Add */}
          </button>
        </form>
      </div>
    </MainModal>
  );
};

export default CastsModal;
