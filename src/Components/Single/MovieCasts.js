import React from "react";
import Titles from "../Titles";
import { FaUserFriends } from "react-icons/fa";
import { Autoplay } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import { CastData } from "../../Data/CastData.js";

const MovieCasts = () => {
  return (
    <div className="my-12">
      <Titles title="Casts" Icon={FaUserFriends} />
      <div className="mt-10">
        <Swiper
          autoplay={{
            delay: 1000,
            disabelOnInteraction: false,
          }}
          loop={true}
          speed={1000}
          modules={[Autoplay]}
          spaceBetween={10}
          breakpoints={{
            0: {
              slidesPerView: 1,
              // spaceBetween: 10,
            },
            400: {
              slidesPerView: 2,
              // spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              // spaceBetween: 10,
            },
            1024: {
              slidesPerView: 4,
              // spaceBetween: 10,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
        >
          {
            CastData.map((cast, index) => (
              <SwiperSlide key={index} className="">
                <div className="w-full p-3 italic text-xs text-text rounded flex-cols bg-dry border border-gray-800">
                  <img src={`/Images/${cast?.image}`} alt={`${cast?.name}`} className="w-full h-64 object-cover rounded mb-4" />
                  <p className="font-medium text-sm">{cast?.name}</p>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </div>
  );
};

export default MovieCasts;
