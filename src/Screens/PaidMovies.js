import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import Head from "../Components/Head";
import Filters from "../Components/Filters";
import Movies from "../Components/Movie";
import { MoviesData } from "../Data/MoviesData";
import { CgSpinner } from "react-icons/cg";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PaidMovies = () => {
  const maxpage = 2;
  const [page, setPage] = useState(maxpage);
  const navigate = useNavigate();

  const HandleLoadingMore = () => {
    setPage(page + maxpage);
  };

  const [moviesData, setMoviesData] = useState([]);

  const GetAllPaidMovies = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/movie/movies-paid`
      );
      setMoviesData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const HandleCheckSubscription = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/subscription/status/${1}`
      );
      console.log(response.data.data);
      if (response.data.data.length === 0) {
        navigate("/subscribe");
      }
    } catch (error) {
      navigate("/subscribe");
      console.log(error);
    }
  };

  useEffect(() => {
    GetAllPaidMovies();
    HandleCheckSubscription();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-2 my-6">
        {/* <Filters /> */}
        {/* Create to Link button, first for free movie and second for paid movie */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link
              to="/freemovies"
              className="bg-subMain text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-transparent hover:border-2 hover:border-subMain transition"
            >
              Free Movies
            </Link>
            <Link
              to="/paidmovies"
              className="bg-subMain text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-transparent hover:border-2 hover:border-subMain transition ml-4"
            >
              Paid Movies
            </Link>
          </div>
        </div>
        <p className="text-lg font-medium my-6">
          Total{" "}
          <span className="font-bold text-subMain">{moviesData?.length}</span>{" "}
          items Found
        </p>
        <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl-grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
          {moviesData.slice(0, page)?.map((movie, index) => (
            <Movies key={index} movie={movie} />
          ))}
        </div>
        {/* Loading More */}
        <div className="w-full flex-cols md:my-20 my-10 ">
          <button
            onClick={HandleLoadingMore}
            className="w-40 h-12 bg-subMain text-white rounded-md text-lg font-medium hover:bg-transparent hover:border-2 hover:border-subMain transition"
          >
            Load More <CgSpinner className="inline animate-spin" />
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default PaidMovies;
