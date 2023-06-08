import React, { useState } from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GoEye } from "react-icons/go";
import axios from "axios";
import MovieModal from "./Modals/MovieModal";

const Rows = (movie, i, admin) => {
  const [movieImage, setMovieImage] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const HandleGetImage = async () => {
    try {
      const image = await axios.get(
        `http://localhost:5000/movie/movie-photo/${movie.id}`
      );
      setMovieImage(image.data.data);
    } catch (error) {
      if (error.response) {
        console.log(error);
      }
    }
  };

  const HandleDeleteMovie = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/movie/delete-movie/${id}`);
      setModalOpen(false);
      // reload window
      window.location.reload();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <>
      <MovieModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        singlemovie={movie}
      />
      <tr key={i} className="bg-main">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <img
                className="h-10 w-10 rounded-full"
                src={`http://localhost:5000/movie/movie-photo/${movie.id}`}
                alt=""
              />
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-drayGray">{movie.nama}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-drayGray">{movie.tahun_rilis}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-drayGray">{movie.resolusi}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-drayGray">{movie.durasi}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-drayGray">{movie.director}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-drayGray">{movie.studio_produksi}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-drayGray">{movie.genre_id}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-drayGray">{movie.rating_umur_id}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-drayGray">{movie.moviestatus_id}</div>
        </td>
        {/* <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-drayGray">{movie.duration}</div>
      </td> */}
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2">
          {admin ? (
            <>
              <button
                onClick={() => setModalOpen(true)}
                className="text-subMain hover:text-subMain"
              >
                Edit
              </button>
              <button
                onClick={() => HandleDeleteMovie(movie.id)}
                className="text-subMain hover:text-subMain"
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <button className="text-subMain hover:text-subMain">
                <FaCloudDownloadAlt />
              </button>
              <Link
                to={`/movie/${movie?.name}`}
                className="text-subMain hover:text-subMain"
              >
                <GoEye />
              </Link>
            </>
          )}
        </td>
      </tr>
    </>
  );
};

const Table = ({ data, admin }) => {
  console.log(data);
  const Head =
    "text-xs text-left text-drayGray font-medium font-semibold px-6 py-2 uppercase";
  const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3";

  return (
    <div className="overflow-x-scroll overflow-hidden relative w-full">
      <table className="w-full table-auto border border-border divide-y divide-border ">
        <thead>
          <tr className="bg-drayGray ">
            <th scope="col" className={`${Head}`}>
              Image
            </th>
            <th scope="col" className={`${Head}`}>
              Nama
            </th>
            <th scope="col" className={`${Head}`}>
              tahun rilis
            </th>
            <th scope="col" className={`${Head}`}>
              resolusi
            </th>
            <th scope="col" className={`${Head}`}>
              durasi
            </th>
            <th scope="col" className={`${Head}`}>
              director
            </th>
            <th scope="col" className={`${Head} text-end`}>
              studio
            </th>
            <th scope="col" className={`${Head} text-end`}>
              genre
            </th>
            <th scope="col" className={`${Head} text-end`}>
              rate umur
            </th>
            <th scope="col" className={`${Head} text-end`}>
              status
            </th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {data.map((movie, i) => Rows(movie, i, admin))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
