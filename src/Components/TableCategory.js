import React, { useState, useEffect } from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GoEye } from "react-icons/go";
import axios from "axios";

const Head =
  "text-xs text-left text-drayGray font-medium font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3";

const Rows = (
  data,
  i,
  users,
  ageRate,
  casts,
  moviestat,
  moviecast,
  onEditFunction,
  onDeleteFunction
) => {
  const [movieName, setMovieName] = useState("");
  const [castName, setCastName] = useState("");

  const HandleGetMovieName = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/movie/movie/${id}`);
      setMovieName(res.data.data.nama);
    } catch (err) {
      console.log(err);
    }
  };

  const HandleGetCastName = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/cast/cast/${id}`);
      setCastName(res.data.data.nama);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (moviecast) {
      HandleGetMovieName(data.movie_id);
      HandleGetCastName(data.cast_id);
    }
  }, []);

  return (
    <tr key={i} className="bg-main">
      {/* users */}
      {users ? (
        <>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10">
                <img
                  className="h-10 w-10 rounded-full"
                  src={`/Images/${data?.image}`}
                  alt={data.name}
                />
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-drayGray">
              {data?.id ? data.id : "2R75T8"}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-drayGray">
              {data?.createAt ? data.createAt : "29, May 2023"}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-drayGray">{data?.name}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-drayGray">{data?.email}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2">
            <button className="text-subMain hover:text-subMain">Delete</button>
          </td>
        </>
      ) : ageRate ? (
        <>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-drayGray font-bold">
              {data?.id ? data.id : "2R75T8"}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-drayGray">
              {data?.createAt ? data.createAt : "29, May 2023"}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-drayGray">{data?.rate}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2">
            <button
              onClick={() => onEditFunction(data)}
              className="text-subMain hover:text-subMain"
            >
              Edit
            </button>
            <button
              onClick={() => onDeleteFunction(data.id)}
              className="text-subMain hover:text-subMain"
            >
              Delete
            </button>
          </td>
        </>
      ) : casts ? (
        <>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-drayGray font-bold">
              {data?.id ? data.id : "2R75T8"}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-drayGray">
              {data?.createAt ? data.createAt : "29, May 2023"}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-drayGray">{data?.nama}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2">
            <button
              onClick={() => onEditFunction(data)}
              className="text-subMain hover:text-subMain"
            >
              Edit
            </button>
            <button
              onClick={() => onDeleteFunction(data.id)}
              className="text-subMain hover:text-subMain"
            >
              Delete
            </button>
          </td>
        </>
      ) : moviestat ? (
        <>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-drayGray font-bold">
              {data?.id ? data.id : "2R75T8"}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-drayGray">
              {data?.createAt ? data.createAt : "29, May 2023"}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-drayGray">{data?.jenis}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2">
            <button
              onClick={() => onEditFunction(data)}
              className="text-subMain hover:text-subMain"
            >
              Edit
            </button>
            <button
              onClick={() => onDeleteFunction(data.id)}
              className="text-subMain hover:text-subMain"
            >
              Delete
            </button>
          </td>
        </>
      ) : moviecast ? (
        <>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-drayGray font-bold">
              {data?.id ? data.id : "2R75T8"}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            {/* <div className="text-sm text-drayGray">
              {data?.movie_id ? data.movie_id : "29, May 2023"}
            </div> */}
            <div className="text-sm text-drayGray">
              {movieName ? movieName : "movie name"}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-drayGray">{castName}</div>
            {/* <div className="text-sm text-drayGray">{data?.cast_id}</div> */}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2">
            <button
              onClick={() => onEditFunction(data)}
              className="text-subMain hover:text-subMain"
            >
              Edit
            </button>
            <button
              onClick={() => onDeleteFunction(data.id)}
              className="text-subMain hover:text-subMain"
            >
              Delete
            </button>
          </td>
        </>
      ) : (
        // category
        <>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-drayGray font-bold">
              {data?.id ? data.id : "2R75T8"}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-drayGray">
              {data?.createAt ? data.createAt : "29, May 2023"}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-drayGray">{data?.title}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2">
            <button
              onClick={() => onEditFunction(data)}
              className="text-subMain hover:text-subMain"
            >
              Edit
            </button>
            <button
              onClick={() => onDeleteFunction(data.id)}
              className="text-subMain hover:text-subMain"
            >
              Delete
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

const TableCategory = ({
  datas,
  users,
  ageRate,
  casts,
  moviestat,
  moviecast,
  onEditFunction,
  onDeleteFunction,
}) => {
  return (
    <div className="overflow-x-scroll overflow-hidden relative w-full">
      <table className="w-full table-auto border border-border divide-y divide-border ">
        <thead>
          <tr className="bg-drayGray ">
            {/* use conditional statement, if ageRate true then do something, else if users true do something, else do something  */}
            {users ? (
              <>
                <th scope="col" className={`${Head}`}>
                  Image
                </th>
                <th scope="col" className={`${Head}`}>
                  Id
                </th>
                <th scope="col" className={`${Head}`}>
                  Date
                </th>
                <th scope="col" className={`${Head}`}>
                  Full Name
                </th>
                <th scope="col" className={`${Head}`}>
                  Email
                </th>
              </>
            ) : ageRate ? (
              <>
                <th scope="col" className={`${Head}`}>
                  Id
                </th>
                <th scope="col" className={`${Head}`}>
                  Date
                </th>
                <th scope="col" className={`${Head}`}>
                  Rate
                </th>
              </>
            ) : casts ? (
              <>
                <th scope="col" className={`${Head}`}>
                  Id
                </th>
                <th scope="col" className={`${Head}`}>
                  Date
                </th>
                <th scope="col" className={`${Head}`}>
                  Nama
                </th>
              </>
            ) : moviestat ? (
              <>
                <th scope="col" className={`${Head}`}>
                  Id
                </th>
                <th scope="col" className={`${Head}`}>
                  Date
                </th>
                <th scope="col" className={`${Head}`}>
                  status
                </th>
              </>
            ) : moviecast ? (
              <>
                <th scope="col" className={`${Head}`}>
                  Id
                </th>
                <th scope="col" className={`${Head}`}>
                  movie name
                </th>
                <th scope="col" className={`${Head}`}>
                  cast name
                </th>
              </>
            ) : (
              <>
                <th scope="col" className={`${Head}`}>
                  Id
                </th>
                <th scope="col" className={`${Head}`}>
                  Date
                </th>
                <th scope="col" className={`${Head}`}>
                  Title
                </th>
              </>
            )}
            <th scope="col" className={`${Head} text-end`}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {datas?.map((data, i) =>
            Rows(
              data,
              i,
              users,
              ageRate,
              casts,
              moviestat,
              moviecast,
              onEditFunction,
              onDeleteFunction
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableCategory;
