import React from 'react'
import { BsCollection, BsCollectionPlay } from 'react-icons/bs'
import { CgMenuBoxed } from 'react-icons/cg';
import { FiHeart, FiUser, FiUserCheck } from 'react-icons/fi';
import { NavLink } from 'react-router-dom'

const MobileFooter = () => {

  const active = 'bg-white text-white';
  const inActive = 'transitions text-2xl flex-cols hover:bg-white hover:text-main text-white rounded-md px-4 py-3';

  const Hover = ({isActive}) => 
    isActive ? `${active} ${inActive}` : inActive
  
  return (
    <>
      <div className='flex-btn h-full bg-white rounded cursor-pointer overflow-y-scroll flex-grow w-full'>
        {/* Drawer */}
      </div>
      <footer className='lg:hidden fixed z-50 bottom-0 w-full px-1'>
        <div className='bg-dry rounded-md flex-btn w-full p-1'>
          <NavLink to="/movies" className={Hover}>
            <BsCollectionPlay />
          </NavLink>
          <NavLink to="/favorites" className={inActive}>
            <div className='relative'>
              <div className="w-5 h-5 flex-cols rounded-full text-xs bg-subMain text-white absolute -top-5 -right-1">
                2
              </div>
              <FiHeart /> 
            </div>
          </NavLink>
          <NavLink to="/login" className={Hover}>
            <FiUserCheck/>
          </NavLink>
          <button className={inActive}>
            <CgMenuBoxed/>
          </button>
        </div>
      </footer>
    </>
  )
}

export default MobileFooter