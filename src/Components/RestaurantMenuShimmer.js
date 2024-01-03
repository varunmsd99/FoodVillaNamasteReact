import React from 'react'
import { shimmer_display_count } from '../Helpers/Constant';

const RestaurantMenuShimmer = () => {
  const shimArr = Array(shimmer_display_count).fill("");
  return (
    <div className='mx-auto mt-32 max-w-[75%]'>
      <div className='max-w-[35%] bg-[#eef0f5] h-3 mb-12 rounded' />
      <div className='flex justify-between items-center my-5 rounded h-fit'>
        <div className='flex-1'>
          <div className='mb-4 w-[30%] bg-[#eef0f5] h-6 rounded-sm' />
          <div className='mb-4 w-[15%] bg-[#eef0f5] h-3 rounded-sm' />
          <div className='mb-4 w-[10%] bg-[#eef0f5] h-3 rounded-sm' />
        </div>
        <div className='pb-4 bg-[#eef0f5] h-[76px] w-[70px] rounded-xl'></div>
      </div>
      <div className='mb-4 max-w-[30%] bg-[#eef0f5] h-5 rounded-sm' />
      <div className='mb-4 max-w-[30%] bg-[#eef0f5] h-7 rounded-sm' />
      <div className='flex mt-8 overflow-hidden'>
        {shimArr.map((e, i) => {
            return <div className='h-16 min-w-[200px] rounded-xl bg-[#eef0f5] mr-4' key={i} />
        })}
        </div>
        <div className='mt-8 max-w-[30%] bg-[#eef0f5] h-7 rounded-sm' />
        <div className='mt-8 overflow-hidden'>
        {shimArr.map((e, i) => {
            return <div className='flex' key={i}>
              <div className='flex-1 mb-6'>
              <div className='mb-4 w-3 bg-[#eef0f5] h-3 rounded-sm' />
          <div className='mb-4 w-[30%] bg-[#eef0f5] h-4 rounded-sm' />
          <div className='mb-4 w-[5%] bg-[#eef0f5] h-3 rounded-sm' />
          <div className='mb-4 w-[50%] bg-[#eef0f5] h-3 rounded-sm' />
        </div>
        <div className='pb-4 max-w-[10%] bg-[#eef0f5] h-24 min-w-[120px] rounded-xl'></div>
            </div>
        })}
        </div>
    </div>
  )
}

export default RestaurantMenuShimmer;