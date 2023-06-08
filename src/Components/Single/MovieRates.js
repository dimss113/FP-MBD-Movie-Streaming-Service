import React, { useState, useEffect } from "react";
import Titles from "../Titles";
import { useParams } from "react-router-dom";
import { BsBookmarkStarFill } from "react-icons/bs";
import { Message, Select } from "../UsedInputs";
import Rating from "../Stars";
import { UserData } from "../../Data/UserData";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MovieRates = ({ movie }) => {
  const { id } = useParams();
  const [userRating, setUserRating] = useState(null);
  const [userReview, setUserReview] = useState(null);
  const [movieId, setMovieId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isSetUserId, setIsSetUserId] = useState(false);
  const [isSetMovieId, setIsSetMovieId] = useState(false);
  const [userComments, setUserComments] = useState([]);
  const [userName, setUserName] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  const navigate = useNavigate();

  console.log("Movie Slug", id);

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

  const HandleAddUserRating = async (e) => {
    e.preventDefault();
    if (userId) {
      try {
        console.log("User rating", userRating);
        await axios.post(`http://localhost:5000/userrating/`, {
          movie_id: movieId,
          user_id: userId,
          rating: userRating,
        });
        console.log("User Rating Added");
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("User Has Not Rated This Movie");
    }
  };

  const HandleAddUserReview = async (e) => {
    e.preventDefault();
    if (userId) {
      try {
        console.log("User Review", userReview);
        await axios.post(`http://localhost:5000/comment/`, {
          movie_id: movieId,
          user_id: userId,
          message: userReview,
        });
        console.log("User Review Added");
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("User Has Not Reviewed This Movie");
    }
  };

  const HandleGetUsersComments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/comment/`);
      console.log("User Comments", res.data);
      setUserComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const HandleUpdateUserRating = async (e, rateId) => {
    e.preventDefault();
    if (userId) {
      try {
        await axios.put(`http://localhost:5000/userrating/${rateId}`, {
          rating: userRating,
        });
        console.log("User Rating Updated");
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("User Has Not Rated This Movie");
    }
  };

  const HandleCheckIfUserHasRating = async (e) => {
    e.preventDefault();
    console.log("User ID", userId);
    console.log("Movie ID", movieId);
    const res = await axios.get(
      `http://localhost:5000/userrating/user/${userId}/movie/${movieId}`
    );
    // console.log("User Has Rated This Movie", res.data[0].id);
    if (!!res.data[0]) {
      console.log("User Has Rated This Movie");
      setUserRating(res.data[0].rating);
      HandleUpdateUserRating(e, res.data[0].id);
    } else {
      HandleAddUserRating(e);
    }
  };

  const HandleCheckIfUserHasRating2 = async () => {
    console.log("User ID", userId);
    console.log("Movie ID", movieId);
    const res = await axios.get(
      `http://localhost:5000/userrating/user/${userId}/movie/${movieId}`
    );
    console.log("User Has Rated This Movie BROOOOOOOO", res.data);
    if (res.data[0]) {
      console.log("User Has Rated This Movie");
      setUserRating(res.data[0].rating);
    }
  };

  const HandleGetUserName = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/user/users/${userId}}`
      );
      console.log("User Name", res.data.data.nama);
      // setUserName(res.data.data.nama);
      setAllUsers([...allUsers, res.data.data.nama]);
      console.log("All Users", allUsers);
    } catch (err) {
      console.log(err);
    }
  };

  const HandleGetAllUserName = () => {
    if (userComments) {
      userComments.map((userComment) => HandleGetUserName(userComment.user_id));
    }
  };

  useEffect(() => {
    HandleGetUserId();
    HandleGetMovieId();
    HandleGetUsersComments();
  }, []);

  useEffect(() => {
    HandleGetAllUserName();
  }, [userComments]);

  useEffect(() => {
    if (isSetUserId && isSetMovieId) {
      HandleCheckIfUserHasRating2();
    }
  }, [isSetUserId, isSetMovieId]);

  useEffect(() => {
    HandleGetMovieId();
  }, [id]);

  const Ratings = [
    {
      title: "0 - Poor",
      value: 0,
    },
    {
      title: "1 - Fair",
      value: 1,
    },
    {
      title: "2 - Good",
      value: 2,
    },
    {
      title: "3 - Very Good",
      value: 3,
    },
    {
      title: "4 - Excellent",
      value: 4,
    },
    {
      title: "5 - Superb",
      value: 5,
    },
  ];

  const [rating, setRating] = useState();

  return (
    <>
      {userId && movieId ? (
        <>
          <div className="my-12 ">
            <Titles title="Reviews" Icon={BsBookmarkStarFill} />
            <div className="mt-10 xl:grid flex-cols grid-cols-5 gap-12 bg-dry xs:p-10 py-10 px-2 sm:p-20 rounded">
              {/* write review */}
              <div className="xl:col-span-2 w-full flex flex-cols gap-8">
                <h3 className="text-xl text-text font-semibold">
                  Review "{movie?.nama}"
                </h3>
                <p className="text-sm leading-7 font-medium text-border">
                  Write a review for this movie. It will be shown here after
                  approval. lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ut enim ad minim veniam, quis nostrud
                </p>
                <form onSubmit={HandleCheckIfUserHasRating} className="w-full">
                  <div className="text-sm w-full">
                    <Select
                      label="Select Rating"
                      options={Ratings}
                      value={userRating}
                      onChange={(e) => setUserRating(e.target.value)}
                    />
                    <div className="flex mt-4 text-lg gap-2 text-star">
                      <Rating value={userRating} />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-subMain my-5 text-white py-3 w-full flex-cols rounded"
                  >
                    Submit
                  </button>
                </form>
                {/* Message */}
                <form onSubmit={HandleAddUserReview} className="w-full">
                  <Message
                    onChange={(e) => setUserReview(e.target.value)}
                    value={userReview}
                    label="Message"
                    placeholder="Write your review here..."
                  />
                  {/* Submit */}
                  <button className="bg-subMain my-5 text-white py-3 w-full flex-cols rounded">
                    Submit
                  </button>
                </form>
              </div>
              {/* REVIEWERS */}
              <div className="col-span-3 flex flex-cols gap-6">
                <h3 className="text-xl text-text font-semibold">
                  Reviews (56)
                </h3>
                <div className="w-full flex flex-col bg-main gap-6 rounded-lg md:p-12 p-6 h-header overflow-y-scroll">
                  {userComments.map((user, index) =>
                    console.log("user comments", user.message)
                  )}
                  {userComments.map((user, index) => (
                    <div className="md:grid flex flex-col w-full grid-cols-12 gap-6 bg-dry p-4 border border-gray-800 rounded-lg">
                      <div className="col-span-2 bg-main hidden md:block">
                        <img
                          src={`/Images/user.jpg`}
                          alt={`user${index}`}
                          className="w-full h-24 rounded-lg object-cover"
                        />
                      </div>
                      <div className="col-span-7 flex flex-col gap-2">
                        <h2>Anonymous</h2>
                        <p className="text-xs leading-6 font-medium text-text">
                          {user?.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default MovieRates;
