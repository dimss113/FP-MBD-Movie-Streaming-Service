import React, { useState, useEffect } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { MoviesData } from "./../../Data/MoviesData";
import FlexMovieitems from "../FlexMovieitems";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

const Banner = () => {
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
    <div className="relative w-full">
      <Swiper
        direction="vertical"
        speed={1000}
        modules={[Autoplay]}
        // spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="w-full xl:h-96 bg-dry lg:h-64 h-48"
      >
        {moviesData.slice(0, 4).map((movie, index) => (
          <SwiperSlide key={index} className="relative rounded overflow-hidden">
            <img
              src={`http://localhost:5000/movie/movie-photo/${movie.id}`}
              alt={movie.nama}
              className="w-full h-full object-cover"
            />
            <div className="absolute linear-bg xl:pl-52 sm:pl-32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4">
              <h1 className="xl:text-4xl truncate capitalize font-sans sm:text-2xl text-xl font-bold">
                {movie.nama}
              </h1>
              <div className="flex gap-5 items-center text-drayGray">
                <FlexMovieitems movie={movie} />
              </div>
              <div className="flex gap-5 items-center">
                <Link
                  to={`/movie/${movie?.slug}`}
                  className="bg-subMain hover-text-main transitions text-white px-8 py-3 rounded font-medium sm:text-sm text-xs"
                >
                  Watch Now
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
