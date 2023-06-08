import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import { useParams } from "react-router-dom";
import { MoviesData } from "../Data/MoviesData";
import MovieInfo from "../Components/Single/MovieInfo";
import MovieCasts from "../Components/Single/MovieCasts";
import MovieRates from "../Components/Single/MovieRates";
import Titles from "../Components/Titles";
import { BsCollectionFill } from "react-icons/bs";
import Movies from "../Components/Movie";
import ShareMovieModal from "../Components/Modals/ShareModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const SingleMovie = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [RelatedMovies, setRelatedMovies] = useState([]);
  const [storedData, setStoredData] = useState(null);
  const [like, setLike] = useState(false);
  const [bookmark, setBookmark] = useState(false);

  const [movieId, setMovieId] = useState(null);
  const [userId, setUserId] = useState(null);

  const [isSetUserId, setIsSetUserId] = useState(false);
  const [isSetMovieId, setIsSetMovieId] = useState(false);
  const navigate = useNavigate();

  const HandleGetUserId = () => {
    const data = localStorage.getItem("data");
    if (!data) {
      console.log("No User Logged In");
      navigate("/login");
    } else {
      const dataObj = JSON.parse(data);
      console.log("USER ID BOS", dataObj[0].id);
      setUserId(dataObj[0].id);
      setIsSetUserId(true);
    }
  };

  const HandleGetMovieId = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/movie/movie-slug/${id}`
      );
      console.log("Movie IDDDDDDDD", res.data.data);
      setMovieId(res.data.data.id);
      setIsSetMovieId(true);
    } catch (err) {
      console.log(err);
    }
  };

  const HandleGetStoredData = () => {
    const data = JSON.parse(localStorage.getItem("data"));
    setStoredData(data);
    if (!data) {
      navigate("/login");
    }
    console.log("STORED DATA", data);
  };

  const HandleAddLike = async (e) => {
    e.preventDefault();
    setLike(1);
    if (userId && movieId) {
      try {
        await axios.post(`http://localhost:5000/like/add-like`, {
          like_status: 1,
          movie_id: movieId,
          user_id: userId,
        });
        console.log("User Liked");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const HandleAddBookmark = async (e) => {
    e.preventDefault();
    setBookmark(1);
    if (userId && movieId) {
      try {
        await axios.post(`http://localhost:5000/bookmark`, {
          bookmark_status: 1,
          movie_id: movieId,
          user_id: userId,
        });
        console.log("movie bookmarked");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const HandleUpdateAddLike = async (e, likeId, likeStatus) => {
    e.preventDefault();
    if (userId && movieId) {
      try {
        await axios.put(`http://localhost:5000/like/update-like/${likeId}`, {
          like_status: !likeStatus,
          movie_id: movieId,
          user_id: userId,
        });
        console.log("User Liked");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const HandleUpdateBookmark = async (e, bookmarkId, bookmarkStatus) => {
    e.preventDefault();
    if (userId && movieId) {
      try {
        await axios.put(`http://localhost:5000/bookmark/${bookmarkId}`, {
          bookmark_status: !bookmarkStatus,
          movie_id: movieId,
          user_id: userId,
        });
        console.log("movie bookmarked");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const HandleCheckIfUserHasLike = async (e) => {
    e.preventDefault();
    console.log("User ID", userId);
    console.log("Movie ID", movieId);
    const res = await axios.get(
      `http://localhost:5000/like/like-by-user-movie/${userId}/${movieId}`
    );
    console.log("User has like this movie", res.data);
    if (!!res.data.data[0]) {
      console.log("User Has like This Movie");
      setLike(!res.data.data[0].like_status);
      console.log("Like Status from user updated", like);
      HandleUpdateAddLike(e, res.data.data[0].id, res.data.data[0].like_status);
    } else {
      console.log("User Has not like This Movie");
      setLike(1);
      HandleAddLike(e);
    }
  };

  const HandleCheckIfUserHasBookmark = async (e) => {
    e.preventDefault();
    console.log("User ID", userId);
    console.log("Movie ID", movieId);
    const res = await axios.get(
      `http://localhost:5000/bookmark/user/${userId}/movie/${movieId}`
    );
    console.log("User has bookmark this movie", res.data);
    if (!!res.data.data[0]) {
      console.log("User Has bookmark This Movie");
      setBookmark(!res.data.data[0].bookmark_status);
      console.log("bookmark Status from user updated", bookmark);
      HandleUpdateBookmark(
        e,
        res.data.data[0].id,
        res.data.data[0].bookmark_status
      );
    } else {
      console.log("User Has not like This Movie");
      setBookmark(1);
      HandleAddBookmark(e);
    }
  };

  const HandleCheckIfUserHasLike2 = async () => {
    console.log("User ID", userId);
    console.log("Movie ID", movieId);
    const res = await axios.get(
      `http://localhost:5000/like/like-by-user-movie/${userId}/${movieId}`
    );
    console.log("User Has like This Movie BROOOOOOOO", res.data);
    if (res.data.data[0]) {
      console.log("User Has like This Movie", res.data.data[0].like_status);
      setLike(res.data.data[0].like_status);
    } else {
      setLike(0);
    }
  };

  const HandleCheckIfUserHasBookmark2 = async () => {
    console.log("User ID", userId);
    console.log("Movie ID", movieId);
    const res = await axios.get(
      `http://localhost:5000/bookmark/user/${userId}/movie/${movieId}`
    );
    console.log("User Has bookmark This Movie BROOOOOOOO", res.data);
    if (res.data.data[0]) {
      console.log("User Has like This Movie", res.data.data[0].bookmark_status);
      setBookmark(res.data.data[0].bookmark_status);
    } else {
      setBookmark(0);
    }
  };

  useEffect(() => {
    HandleGetUserId();
    HandleGetMovieId();
    HandleGetMoviebySlug();
    HandleGetStoredData();
  }, []);

  useEffect(() => {
    if (isSetUserId && isSetMovieId) {
      HandleCheckIfUserHasLike2();
      HandleCheckIfUserHasBookmark2();
    }
  }, [isSetUserId, isSetMovieId]);

  const HandleGetMoviebySlug = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/movie/movie-slug/${id}`
      );
      console.log("Data Slug", response.data.data);
      const movieData = response.data.data;
      setMovie(movieData);
      console.log("Data Movie", movie);
      console.log("Data Movie", movie.genre_id);
    } catch (error) {
      console.log(error);
    }
  };

  const HandleGetMoviesByGenreId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/movie/movies-genre/${movie?.genre_id}`
      );
      console.log("Data Genre Id", response.data.data);
      setRelatedMovies(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    HandleGetMoviesByGenreId();
  }, [movie]);

  return (
    <Layout>
      <ShareMovieModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        movie={movie}
      />
      {movie && (
        <MovieInfo
          movie={movie}
          setModalOpen={setModalOpen}
          onSubmit={HandleCheckIfUserHasLike}
          onSubmitBookmark={HandleCheckIfUserHasBookmark}
          like={like}
          bookmark={bookmark}
        />
      )}
      <div className="container mx-auto min-h-screen px-2 my-6">
        <MovieCasts />
        <MovieRates movie={movie} />
        {RelatedMovies && (
          <div className="my-16">
            <Titles title="Related Movies" Icon={BsCollectionFill} />
            <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl-grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
              {RelatedMovies.map((movie, index) => (
                <Movies key={index} movie={movie} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SingleMovie;
