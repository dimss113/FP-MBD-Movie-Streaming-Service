import React from 'react'
import { FiUser } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Promos = () => {
  return (
    <div className="my-20 py-10 md:px-20 px-8 bg-dry">
      <div className="lg:grid lg:grid-cols-2 lg:gap-10 items-center">
        <div className="flex lg:gap-10 gap-6 flex-col">
          <h1 className="xl:text-3xl text-xl capitalize font-sans font-medium xl:leading-relaxed">
            Subscribe and Watch All Movies <br /> Enjoy on Your Mobile
          </h1>
          <p className="text-text text-sm xl:text-base leading-6 xl:leading-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptatum, quibusdam, quos, voluptate voluptas quia quod
            exercitationem quae voluptatibus quidem dolorum. Quisquam
            voluptatum, quibusdam, quos, voluptate voluptas quia quod
            exercitationem quae
          </p>
          <div className="flex gap-4 md:text-lg text-sm">
            <div className="flex-cols bg-black text-subMain px-6 py-3 rounded font-bold">
              HD 4K
            </div>
            <div className="flex-rows gap-4 bg-black text-subMain px-6 py-3 rounded font-bold">
              <FiUser /> 2K
            </div>
          </div>
        </div>
        <div className="">
          {/* <button className='bg-subMain hover-text-main transitions text-white px-8 py-3 rounded font-medium sm:text-sm text-xs'>
            Subscribe Now
          </button> */}
          <Link
            to="/subscribe"
            className="bg-subMain hover-text-main transitions text-white px-8 py-3 rounded font-medium sm:text-sm text-xs"
          >
            Subscribe Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Promos