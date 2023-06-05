import React from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import {GoEye} from 'react-icons/go'



const Table = ({ data, admin }) => {
  const Head =
    "text-xs text-left text-drayGray font-medium font-semibold px-6 py-2 uppercase";
  const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3";

  const Rows = (movie, i, admin) => {
  return(
    <tr key={i} className="bg-main">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">

          <div className="flex-shrink-0 h-10 w-10">
            <img

              className="h-10 w-10 rounded-full"
              src={`/Images/${movie.image}`}
              alt=""
            />
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-drayGray">{movie.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-drayGray">{movie.category}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-drayGray">{movie.language}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-drayGray">{movie.year}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-drayGray">{movie.time}</div>
      </td>
      {/* <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-drayGray">{movie.duration}</div>
      </td> */}
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2">
        {
          admin ? (
        <>
          <button className="text-subMain hover:text-subMain">
            Edit
          </button>
          <button className="text-subMain hover:text-subMain">
            Delete
          </button>
        </>
          ):(
            <>
            <button className="text-subMain hover:text-subMain">
            <FaCloudDownloadAlt/>
          </button>
          <Link to={`/movie/${movie?.name}`} className="text-subMain hover:text-subMain">
            <GoEye/>
          </Link>
            </>
          )
        }
      </td>
    </tr>
  )
}

  return (
    <div className="overflow-x-scroll overflow-hidden relative w-full">
      <table className="w-full table-auto border border-border divide-y divide-border ">
        <thead>
          <tr className="bg-drayGray ">
            <th scope="col" className={`${Head}`}>
              Image
            </th>
            <th scope="col" className={`${Head}`}>
              Name
            </th>
            <th scope="col" className={`${Head}`}>
              Category
            </th>
            <th scope="col" className={`${Head}`}>
              Language
            </th>
            <th scope="col" className={`${Head}`}>
              Year
            </th>
            <th scope="col" className={`${Head}`}>
              Hours
            </th>
            <th scope="col" className={`${Head} text-end`}>
              Actions
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
