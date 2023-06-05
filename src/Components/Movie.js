import React from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Movies = ({ movie }) => {
  return (
    <>
      <div className="border bg-yellow-200 border-border p-1 hover:scale-95 transitions relative rounded overflow-hidden">
        <Link to={`/movie/${movie?.name}`} className="w-full">
          <img
            src={`/Images/${movie?.image}`}
            alt={movie.name}
            className="w-full h-64 object-cover"
          ></img>
        </Link>
        <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3">
          <h3 className="font-semibold truncate">{movie?.name}</h3>
          <button className="h-9 w-9 text-sm flex-cols transitions hover:bg-transparent border-subMain rounded-md bg-subMain text-white">
            <FaHeart/>
          </button>
        </div>
      </div>
    </>
  );
};

export default Movies;
