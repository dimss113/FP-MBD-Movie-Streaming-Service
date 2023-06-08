import React, { useState, useEffect } from "react";
import MainModal from "./MainModal";
import { Input } from "../UsedInputs";
import { HiPlusCircle } from "react-icons/hi";
import Uploader from "../Uploader";
import axios from "axios";

const MovieCastModal = ({ modalOpen, setModalOpen, singleMovieCast }) => {
  const [castData, setCastData] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [castId, setCastId] = useState();
  const [castNama, setCastNama] = useState();

  const [movieId, setMovieId] = useState();
  const [movieNama, setMovieNama] = useState();

  const getCastNamaById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/cast/${id}`);
      setCastNama(response.data.data.nama);
    } catch (error) {
      if (error.response) {
        console.log(error);
      }
    }
  };

  const getMovieNamaById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/movie/${id}`);
      setMovieNama(response.data.data.nama);
    } catch (error) {
      if (error.response) {
        console.log(error);
      }
    }
  };

  const HandleGetCastData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cast/casts");
      setCastData(response.data.data);
    } catch (error) {
      if (error.response) {
        console.log(error);
      }
    }
  };

  const HandleGetMovieData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/movie/movies");
      setMovieData(response.data.data);
    } catch (error) {
      if (error.response) {
        console.log(error);
      }
    }
  };

  const HandleAddMovieCast = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/moviecast/add-moviecast", {
        cast_id: castId,
        movie_id: movieId,
      });
      setModalOpen(false);
      window.location.reload();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  const HandleUpdateMovieCast = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/moviecast/update-moviecast/${singleMovieCast.id}`,
        {
          cast_id: castId,
          movie_id: movieId,
        }
      );
      setModalOpen(false);
      window.location.reload();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  useEffect(() => {
    HandleGetCastData();
    HandleGetMovieData();
  }, []);

  useEffect(() => {
    if (modalOpen === false) {
      setCastId();
      setMovieId();
    }
  }, []);

  useEffect(() => {
    if (singleMovieCast) {
      getMovieNamaById(singleMovieCast.movie_id);
      getCastNamaById(singleMovieCast.cast_id);
    }
  }, []);

  return (
    <MainModal modalOpen={modalOpen} setModelOpen={setModalOpen}>
      <div className="flex flex-col gap-6">
        {singleMovieCast ? (
          <form onSubmit={HandleUpdateMovieCast}>
            <div className="w-full grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <p className="text-border font-semibold text-sm">Rating Umur</p>
                <select
                  className="border bg-main  border-border rounded-lg px-4 py-2 focus:outline-none"
                  onChange={(e) => setMovieId(e.target.value)}
                >
                  <option
                    key={singleMovieCast.movie_id}
                    value={singleMovieCast.movie_id}
                  >
                    {movieNama}
                  </option>
                  {movieData.map((movie, index) => (
                    <option key={movie.id} value={movie.id}>
                      {movie.nama}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-border font-semibold text-sm">
                  Movie Status
                </p>
                <select
                  className="border bg-main  border-border rounded-lg px-4 py-2 focus:outline-none"
                  onChange={(e) => setCastId(e.target.value)}
                >
                  <option
                    key={singleMovieCast.cast_id}
                    value={singleMovieCast.cast_id}
                  >
                    {castNama}
                  </option>
                  {castData.map((cast, index) => (
                    <option key={cast.id} value={cast.id}>
                      {cast.nama}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  className="bg-main text-white px-4 py-2 rounded-lg"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={HandleAddMovieCast}>
            <div className="w-full grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <p className="text-border font-semibold text-sm">Rating Umur</p>
                <select
                  className="border bg-main  border-border rounded-lg px-4 py-2 focus:outline-none"
                  onChange={(e) => setMovieId(parseInt(e.target.value))}
                >
                  <option value="">Select Movie</option>
                  {/* {movieData.map((movie, index) =>
                    console.log("Data movie", movie.nama, movie.id)
                  )} */}
                  {movieData.map((movie, index) => (
                    <option key={movie.id} value={movie.id}>
                      {movie.nama}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-border font-semibold text-sm">
                  Movie Status
                </p>
                <select
                  className="border bg-main  border-border rounded-lg px-4 py-2 focus:outline-none"
                  onChange={(e) => setCastId(parseInt(e.target.value))}
                >
                  {/* {castData.map((cast, index) =>
                    console.log("Data cast", cast.nama, cast.id)
                  )} */}
                  <option value="">Select Cast</option>
                  {castData.map((cast, index) => (
                    <option key={cast.id} value={cast.id}>
                      {cast.nama}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-full justify-center gap-4 mt-4">
              <button
                className="bg-main w-full text-white px-4 py-2 rounded-lg"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        )}
      </div>
    </MainModal>
  );
};

export default MovieCastModal;
