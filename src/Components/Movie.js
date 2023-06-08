import React from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const Movies = ({ movie }) => {
  return (
    <>
      <div className="border bg-yellow-200 border-border p-1 hover:scale-95 transitions relative rounded overflow-hidden">
        <Link to={`/movie/${movie?.slug}`} className="w-full">
          <img
            src={`http://localhost:5000/movie/movie-photo/${movie?.id}`}
            alt={movie.nama}
            className="w-full h-64 object-cover"
          ></img>
        </Link>
        <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3">
          <h3 className="font-semibold truncate">{movie?.nama}</h3>
        </div>
      </div>
    </>
  );
};

export default Movies;
