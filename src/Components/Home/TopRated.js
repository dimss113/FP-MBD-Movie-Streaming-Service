import React from "react";
import { useState } from "react";
import Titles from "../Titles";
import { BsBookmarkStarFill, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Swiper } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import { SwiperSlide } from "swiper/react";
import { MoviesData } from "../../Data/MoviesData";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import Rating from "../Stars";

const TopRated = () => {
  const [nextE1, setNextE1] = useState(null);
  const [prevE1, setPrevE1] = useState(null);
  const classNames = "w-12 h-12 flex-cols transitions hover:bg-subMain rounded-full bg-white bg-opacity-30 text-white";
  return (
    <div className="my-16">
      <Titles title="Top Rated" Icon={BsBookmarkStarFill} />
      <div className="mt-10">
        <Swiper
          navigation={{ nextE1, prevE1 }}
          slidesPerView={4}
          spaceBetween={40}
          autoPlay={true}
          speed={1000}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          modules={[Navigation, Autoplay]}
        >
          {MoviesData.map((movie, index) => (
            <SwiperSlide key={index}>
              {/* <div className="border bg-yellow-200 border-border p-1 hover:scale-95 transitions relative rounded overflow-hidden">
                  <Link to={`/movies/${movie?.name}`} className="w-full">
                    <img

                      src={`Images/${movie?.image}`}
                      alt={movie.name}
                      className="w-full h-64 object-cover"
                    ></img>
                  </Link>
                  <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3">
                    <h3 className="font-semibold truncate">{movie?.name}</h3>
                    <button className="h-9 w-9 text-sm flex-cols transitions hover:bg-transparent border-subMain rounded-md bg-subMain text-white">
                      <FaHeart />
                    </button>
                  </div>
                </div> */}
              <div className="p-4 h-rate hovered border border-border bg-dray rounded-lg overflow-hidden">
                <img
                  src={`Images/${movie?.image}`}
                  alt={movie?.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="px-4 hoveres gap-6 text-center absolute bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0 overflow-hidden">
                  <button className="w-12 h-12 flex-cols transitions hover:bg-subMain rounded-full bg-white bg-opacity-30 text-white">
                    <FaHeart />
                  </button>
                  <Link
                    className="font-semibold text-xl trancuted line-clamp-2"
                    to={`/movie/${movie?.name}`}
                  >
                    {movie?.name}
                  </Link>
                  <div className="flex gap-2 text-star ">
                    <Rating value={movie?.rate} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="w-full px-1 flex-rows gap-6 pt-12">
          {/* <button className={classNames} ref={(node) => setPrevE1(node)}>
            <BsChevronLeft className="w-6 h-6" />
          </button>
          <button className={classNames} ref={(node) => setNextE1(node)}>
            <BsChevronRight className="w-6 h-6" />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default TopRated;
