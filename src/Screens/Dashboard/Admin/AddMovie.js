import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { Input, Message, Select } from "../../../Components/UsedInputs";
import Uploader from "../../../Components/Uploader";
import { CategoriesData } from "../../../Data/CategoriesData";
import { UserData } from "../../../Data/UserData";
import { HiPlus } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ImUpload } from "react-icons/im";
import CastsModal from "../../../Components/Modals/CastsModal";
import axios from "axios";
import { FiUploadCloud } from "react-icons/fi";

const AddMovie = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [cast, setCast] = useState(UserData[0]);
  const [nama, setNama] = useState("");
  const [tahunRilis, setTahunRilis] = useState(0);
  const [deskripsi, setDeskripsi] = useState("");
  const [resolusi, setResolusi] = useState("");
  const [durasi, setDurasi] = useState(0);
  const [director, setDirector] = useState("");
  const [studioProduksi, setStudioProduksi] = useState("");
  const [genreId, setGenreId] = useState(0);
  const [ratingUmurId, setRatingUmurId] = useState(0);
  const [movieStatusId, setMovieStatusId] = useState(0);
  const [movieImage, setMovieImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [ratingUmurData, setRatingUmurData] = useState([]);
  const [movieStatusData, setMovieStatusData] = useState([]);

  const HandleGetAllCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/category/categories"
      );
      console.log(response.data.data);
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
      console.log(response.data.data);
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
      console.log(response.data.data);
      setMovieStatusData(response.data.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  const HandleAddMovie = async (e) => {
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
      await axios.post("http://localhost:5000/movie/add-movie", movieData);

      window.location.reload();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (modalOpen === false) {
      setCast();
    }
  }, [modalOpen]);

  return (
    <SideBar>
      <CastsModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        cast={cast}
      />
      <form onSubmit={HandleAddMovie}>
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-bold">Add Movie</h2>
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
            <Input
              label="Genre ID"
              value={genreId}
              onChange={(e) => setGenreId(e.target.value)}
              placeholder="Genre ID"
              type="number"
              bg={true}
            />
          </div>

          <div className="w-full grid md:grid-cols-2 gap-6">
            <Input
              label="Rating Umur ID"
              placeholder="Rating Umur ID"
              value={ratingUmurId}
              onChange={(e) => setRatingUmurId(e.target.value)}
              type="number"
              bg={true}
            />
            <Input
              label="Movie Status ID"
              value={movieStatusId}
              onChange={(e) => setMovieStatusId(e.target.value)}
              placeholder="Movie Status ID"
              type="number"
              bg={true}
            />
          </div>
          {/* images */}
          <div className="w-full grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-border font-semibold text-sm">
                Image without title
              </p>
              {/* <Uploader
                type="file"
                name="photo"
                id="photo"
                accept="image/*"
                onChange={(e) => setMovieImage(e.target.files[0])}
                // className="sr-only"
                placeholder="Upload Image"
              /> */}
              <div className="w-full text-center ">
                <div className="px-6 pt-5 pb-6 border-2 border-border border-dashed bg-main rounded-md cursor-pointer">
                  <input
                    type="file"
                    name="photo"
                    id="photo"
                    accept="image/*"
                    onChange={(e) => setMovieImage(e.target.files[0])}
                    // className="sr-only"
                    placeholder="Upload Image"
                  />
                  <span className="mx-auto flex-cols text-subMain text-3xl">
                    <FiUploadCloud />
                  </span>
                  <p className="text-sm mt-2">Drag your image here</p>
                  <em className="text-xs text-border">
                    (only .jpg and .png files are accepted)
                  </em>
                </div>
              </div>
              <label
                htmlFor="photo"
                className="w-64 h-12 p-2 bg-main border border-border rounded cursor-pointer"
              >
                {movieImage ? movieImage.name : "Upload Image"}
              </label>
              {/* <div className="w-32 h-32 p-2 bg-main border border-border rounded">
                <img
                  src="/Images/user.jpg"
                  alt=""
                  className="w-full h-full object cover rounded"
                />
              </div> */}
            </div>
          </div>

          {/* Submit */}
          {/* <div className="flex justify-end items-center my-4"> */}
          <button className="bg-main font-medium transitions hover:bg-dry border border-subMain  text-white py-4  rounded w-full flex-rows gap-6">
            <ImUpload /> Add Movie
          </button>
          {/* </div> */}
        </div>
      </form>
    </SideBar>
  );
};

export default AddMovie;
