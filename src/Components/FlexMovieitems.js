import React, { useState, useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BiTime } from "react-icons/bi";
import axios from "axios";

const FlexMovieitems = ({ movie }) => {
  const [genreName, setGenreName] = useState();

  const HandleGetGenreName = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/category/get-category/${movie.genre_id}`
      );
      console.log("Data Genre Name", response.data.data.title);
      setGenreName(response.data.data.title);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    HandleGetGenreName();
  }, []);

  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{genreName}</span>
      </div>
      <div className="flex items-center gap-2">
        <FaRegCalendarAlt className="text-subMain w-3 h-3" />
        <span className="text-sm font-medium">{movie.tahun_rilis}</span>
      </div>
      <div className="flex items-center gap-2">
        <BiTime className="text-subMain w-3 h-3" />
        <span className="text-sm font-medium">{movie.durasi}</span>
      </div>
    </>
  );
};

export default FlexMovieitems;
