import React from "react";
import Layout from "../Layout/Layout";
import Banner from "../Components/Home/Banner";
import PopularMovies from "../Components/Home/PopularMovies";
import TopRated from "../Components/Home/TopRated";
import Promos from "../Components/Home/Promos";

const HomeScreen = () => {
  return (
    <Layout>
      {/* this is children of layout */}
      <div className="container mx-auto min-h-screen px-2 mb-6 ">
        <Banner />
        <PopularMovies />
        <Promos />
        {/* <TopRated /> */}
      </div>
    </Layout>
  );
};

export default HomeScreen;
