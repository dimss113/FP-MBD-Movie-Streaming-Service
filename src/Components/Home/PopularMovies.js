import React, { useState, useEffect } from "react";
import Titles from "../Titles";
import { BsCollectionFill } from "react-icons/bs";
import { MoviesData } from "../../Data/MoviesData";
import Movie from "../Movie";
import axios from "axios";

const PopularMovies = () => {
  const [moviesData, setMoviesData] = useState([]);

  const HandleGetAllMovies = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/movie/movies`);
      setMoviesData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    HandleGetAllMovies();
  }, []);

  return (
    <div className="my-16">
      <Titles title="Popular Movies" Icon={BsCollectionFill} />
      <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {moviesData.slice(0, 8).map((movie, index) => (
          <Movie key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default PopularMovies;
