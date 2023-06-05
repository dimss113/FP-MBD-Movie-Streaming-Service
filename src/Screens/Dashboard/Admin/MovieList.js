import React from 'react'
import SideBar from '../SideBar'
import { MoviesData } from '../../../Data/MoviesData'
import Table from '../../../Components/Table'


const MovieList = () => {
  return (
    <SideBar>
      <div className='flex flex-col gap-6'>
        <div className='flex-btn gap-2'>
          <h2 className='text-xl font-bold'>Movie List</h2>
          <button className='bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded '>
            Delete All
          </button>
        </div>
        <Table data={MoviesData} admin={true} />
      </div>
    </SideBar>
  )
}

export default MovieList