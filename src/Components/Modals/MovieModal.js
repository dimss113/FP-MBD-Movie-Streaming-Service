import React, { useState, useEffect } from "react";
import axios from "axios";
import MainModal from "./MainModal";
import { Input } from "../UsedInputs";
import { HiPlusCircle } from "react-icons/hi";
import { FiUploadCloud } from "react-icons/fi";
import { ImUpload } from "react-icons/im";

const MovieModal = ({ modalOpen, setModalOpen, singlemovie }) => {
  const [nama, setNama] = useState(singlemovie.nama);
  const [tahunRilis, setTahunRilis] = useState(singlemovie.tahun_rilis);
  const [deskripsi, setDeskripsi] = useState(singlemovie.deskripsi);
  const [resolusi, setResolusi] = useState(singlemovie.resolusi);
  const [durasi, setDurasi] = useState(singlemovie.durasi);
  const [director, setDirector] = useState(singlemovie.director);
  const [studioProduksi, setStudioProduksi] = useState(
    singlemovie.studio_produksi
  );
  const [movieStatusId, setMovieStatusId] = useState(
    singlemovie.moviestatus_id
  );
  const [movieStatusName, setMovieStatusName] = useState();

  const [genreId, setGenreId] = useState(singlemovie.genre_id);
  const [genreName, setGenreName] = useState(singlemovie.genre_id);

  const [ratingUmurId, setRatingUmurId] = useState(singlemovie.rating_umur_id);
  const [ratingUmurName, setRatingUmurName] = useState();

  const [movieImage, setMovieImage] = useState(singlemovie.gambar);

  const [categories, setCategories] = useState([]);
  const [ratingUmurData, setRatingUmurData] = useState([]);
  const [movieStatusData, setMovieStatusData] = useState([]);

  // console.log("SINGLE MOVIE JANCOK", singlemovie);
  console.log("GENRE ID", genreId);

  const HandleGetGenreById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/category/get-category/${genreId}`
      );
      console.log("GET GENRE BY ID BOSSSSSSSSSSSSSS", response.data.data.title);
      setGenreName(response.data.data.title);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  console.log("genre name", genreName);

  const HandleGetRatingUmurById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/agerate/get-agerate/${ratingUmurId}`
      );
      console.log(response.data.data.rate);
      setRatingUmurName(response.data.data.rate);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  const HandleGetMovieStatusById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/moviestatus/get-moviestatus/${movieStatusId}`
      );
      console.log(response.data.data.jenis);
      setMovieStatusName(response.data.data.jenis);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  const HandleGetAllCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/category/categories"
      );
      // console.log(response.data.data);
      setCategories(response.data.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  const HandleGetAllRatingUmur = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/agerate/agerates"
      );
      // console.log(response.data.data);
      setRatingUmurData(response.data.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  const HandleGetAllMovieStatus = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/moviestatus/moviestatuss"
      );
      // console.log(response.data.data);
      setMovieStatusData(response.data.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  const HandleUpdateMovie = async (e) => {
    e.preventDefault();
    try {
      const movieData = new FormData();
      movieData.append("nama", nama);
      movieData.append("tahun_rilis", tahunRilis);
      movieData.append("deskripsi", deskripsi);
      movieData.append("resolusi", resolusi);
      movieData.append("durasi", parseInt(durasi));
      movieData.append("director", director);
      movieData.append("studio_produksi", studioProduksi);
      movieData.append("genre_id", parseInt(genreId));
      movieData.append("rating_umur_id", parseInt(ratingUmurId));
      movieData.append("moviestatus_id", parseInt(movieStatusId));
      movieData.append("gambar", movieImage);
      await axios.put(
        `http://localhost:5000/movie/update-movie/${singlemovie.id}`,
        movieData
      );
      setModalOpen(false);
      window.location.reload();
    } catch (error) {
      if (error.response) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    HandleGetAllCategories();
    HandleGetAllRatingUmur();
    HandleGetAllMovieStatus();
    HandleGetGenreById();
    HandleGetRatingUmurById();
    HandleGetMovieStatusById();
  }, []);

  // useEffect(() => {
  //   // HandleGetRatingUmurById();
  //   // HandleGetMovieStatusById();
  // }, [genreId, ratingUmurId, movieStatusId]);

  return (
    <MainModal modalOpen={modalOpen} setModelOpen={setModalOpen}>
      <form onSubmit={HandleUpdateMovie}>
        <div className="flex bg-subMain rounded-lg w-full flex-col gap-6">
          <h2 className="text-xl font-bold">Update Movie</h2>
          <div className="w-full grid md:grid-cols-2 gap-6">
            <Input
              label="Movie Title"
              placeholder="Movie Title"
              type="text"
              bg={true}
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
            <Input
              value={tahunRilis}
              onChange={(e) => setTahunRilis(e.target.value)}
              label="Release Year"
              placeholder="Release Year"
              type="number"
              bg={true}
            />
          </div>
          <div className="w-full grid md:grid-cols-2 gap-6">
            <Input
              label="Description"
              placeholder="Description"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              type="text"
              bg={true}
            />
            <Input
              label="Resolution"
              value={resolusi}
              onChange={(e) => setResolusi(e.target.value)}
              placeholder="Resolution"
              type="number"
              bg={true}
            />
          </div>
          <div className="w-full grid md:grid-cols-2 gap-6">
            <Input
              label="Duration"
              placeholder="Duration"
              value={durasi}
              onChange={(e) => setDurasi(e.target.value)}
              type="number"
              bg={true}
            />
            <Input
              label="Director"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              placeholder="Director"
              type="text"
              bg={true}
            />
          </div>

          <div className="w-full grid md:grid-cols-2 gap-6">
            <Input
              label="studioProduksi"
              placeholder="studioProduksi"
              value={studioProduksi}
              onChange={(e) => setStudioProduksi(e.target.value)}
              type="text"
              bg={true}
            />
            <div className="flex flex-col gap-2">
              <p className="text-border font-semibold text-sm">Genre</p>
              <select
                className="border bg-main text-white border-border rounded-lg px-4 py-2 focus:outline-none"
                onChange={(e) => setGenreId(e.target.value)}
              >
                <option key={genreId} value={genreId}>
                  {genreName}
                </option>
                {categories.map((category, index) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-border font-semibold text-sm">Rating Umur</p>
              <select
                className="border bg-main text-white border-border rounded-lg px-4 py-2 focus:outline-none"
                onChange={(e) => setRatingUmurId(e.target.value)}
              >
                <option key={ratingUmurId} value={ratingUmurId}>
                  {ratingUmurName}
                </option>
                {ratingUmurData.map((umur, index) => (
                  <option key={umur.id} value={umur.id}>
                    {umur.rate}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-border font-semibold text-sm">Movie Status</p>
              <select
                className="border bg-main text-white border-border rounded-lg px-4 py-2 focus:outline-none"
                onChange={(e) => setMovieStatusId(e.target.value)}
              >
                <option key={movieStatusId} value={movieStatusId}>
                  {movieStatusName}
                </option>
                {movieStatusData.map((movie, index) => (
                  <option key={movie.id} value={movie.id}>
                    {movie.jenis}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit */}
          {/* <div className="flex justify-end items-center my-4"> */}
          <button className="bg-main font-medium transitions hover:bg-dry border border-subMain  text-white py-4  rounded w-full flex-rows gap-6">
            <ImUpload /> Update Movie
          </button>
          {/* </div> */}
        </div>
      </form>
    </MainModal>
  );
};

export default MovieModal;
