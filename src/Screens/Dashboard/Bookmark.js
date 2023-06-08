import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import Table from "../../Components/Table";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BookmarkMovies = () => {
  const [userId, setUserId] = useState(null);
  const [storedData, setStoredData] = useState(null);
  const navigate = useNavigate();
  const [isGetMovieData, setIsGetMovieData] = useState(false);
  const [movies, setMovies] = useState([]);

  const HandleGetStoredData = () => {
    const data = localStorage.getItem("data");
    if (!data) {
      console.log("No User Logged In");
      navigate("/login");
    } else {
      const dataObj = JSON.parse(data);
      console.log("USER ID BOS", dataObj[0].id);
      setUserId(dataObj[0].id);
    }
  };

  const HandleGetMovieById = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/movie/movie/${id}`);
      console.log("Movie Data", res.data.data);
      setMovies((prevMovies) => [...prevMovies, res.data.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const HandleGetAllBookmarkDataById = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/bookmark/user/${userId}`
      );
      console.log("All Bookmark Data", res.data.data);
      setStoredData(res.data.data);

      if (!isGetMovieData) {
        const moviePromises = res.data.data.map((item) =>
          HandleGetMovieById(item.movie_id)
        );
        await Promise.all(moviePromises);
        setIsGetMovieData(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    HandleGetStoredData();
  }, []);

  useEffect(() => {
    if (userId) {
      HandleGetAllBookmarkDataById();
    }
  }, [userId]);

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Favorite Movies</h2>
          <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded ">
            Delete All
          </button>
        </div>
        {isGetMovieData && <Table data={movies} admin={false} />}
      </div>
    </SideBar>
  );
};

export default BookmarkMovies;
