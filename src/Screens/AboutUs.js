import React from "react";
import Layout from "../Layout/Layout";
import Head from "../Components/Head";

const AboutUs = () => {
  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-2 my-6">
        <Head title="About Us" />
        <div className="xl:py-20 py-10 px-4">
          <div className="grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center">
            <div className="">
              <h3 className="text-xl lg:text-3xl mb-4 font-semibold">
                Welcome to Cimiflix
              </h3>
              <div className="mt-3 text-sm leading-8 text-text">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam voluptatum, quibusdam, quos, voluptate voluptas quia
                  quod exercitationem quae voluptatibus quidem dolorum. Quisquam
                  voluptatum, quibusdam, quos, voluptate voluptas quia quod
                  exercitationem quae voluptatibus quidem dolorum.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam voluptatum, quibusdam, quos, voluptate voluptas quia
                  quod exercitationem quae voluptatibus quidem dolorum. Quisquam
                  voluptatum, quibusdam, quos, voluptate voluptas quia quod
                  exercitationem quae voluptatibus quidem dolorum.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="p-8 bg-dray rounded-lg">
                  <span className="text-3xl block font-extrabold">10K</span>
                  <h4 className="text-lg font-semibold my-2">Listed Movies</h4>
                  <p className="mb-0 text-text leading-7 text-sm">
                    lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
                <div className="p-8 bg-dray rounded-lg">
                  <span className="text-3xl block font-extrabold">8K</span>
                  <h4 className="text-lg font-semibold my-2">Users Active</h4>
                  <p className="mb-0 text-text leading-7 text-sm">
                    lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
                <div className="p-8 bg-dray rounded-lg">
                  <span className="text-3xl block font-extrabold">10K</span>
                  <h4 className="text-lg font-semibold my-2">Listed Movies</h4>
                  <p className="mb-0 text-text leading-7 text-sm">
                    lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <img src="Images/head.jpg" alt="aboutus" className="w-full xl:block hidden h-header rounded-lg object-cover"/>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
