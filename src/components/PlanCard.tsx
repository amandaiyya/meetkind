import React from 'react';
import { ClockIcon, CupIconLight, ForkAndKnifeIcon, LocationIcon, ThumbsupIcon, UserIcon } from '@/assets/assets';
import { RankedVenue } from '@/types/venue';
import scoreToPercentage from '@/helpers/scoreToPercentage';
import formatTravelTime from '@/helpers/formatTravelTime';
import formatTravelDistance from '@/helpers/formatTravelDistance';

export default function PlanCard({
    data
}: {
    data: RankedVenue
}) {
  return (
    <div className='noise w-fit max-w-md min-h-2/3 px-8 py-6 bg-light-secondary border border-dark-primary shadow-md rounded-xl space-y-6'>
      <div className='flex items-center gap-4 flex-wrap'>
        <h2 className='text-xl font-extrabold'><q>{data.name}</q></h2>
        {data.category === "restaurant" ? (
          <ForkAndKnifeIcon className='w-7 h-7'/>
        ) : data.category === "cafe" ? (
          <CupIconLight className='w-7 h-7'/>
        ) : null}
      </div>
      <div className='space-y-2'>
        <h3 className=' font-semibold'>Average Travel Time & Distance</h3>
        <div className='flex items-center gap-4 flex-wrap'>
          <div className=' shadow-md cursor-pointer border-2 rounded font-semibold border-dark-secondary bg-light-primary text-dark-secondary px-2 py-1 text-center flex items-center text-sm gap-2'>
            <ClockIcon className='w-4 h-4'/>
            <span  className='w-[6ch] text-start'>{formatTravelTime(data.averageTravelTime)}</span>
          </div>
          <div className=' shadow-md cursor-pointer border-2 rounded font-semibold border-dark-secondary bg-light-primary text-dark-secondary px-2 py-1 text-center flex items-center text-sm gap-1.5'>
            <LocationIcon className='w-5 h-5'/>
            <span className='w-[7ch] text-start'>{formatTravelDistance(data.averageTravelDistance)}</span>
          </div>
        </div>
      </div>
      <div className='space-y-2'>
        <h3 className='font-semibold'>Travel</h3>
        <ul className='space-y-1.5'>
          {data.routes.map((route, i) => (
            <li key={data.placeId + `00${i}`} className='w-fit shadow-md cursor-pointer border-2 rounded font-semibold border-dark-secondary bg-light-primary text-dark-secondary px-3 py-1 text-center flex items-center text-sm'>
              <div className='flex items-center gap-2'>
                <UserIcon className='w-4 h-4'/>
                <span className='w-[9ch] text-start'>{route.userIndex === 0 ? "you" : `friend ${route.userIndex}`}</span>
              </div>
              <span className='ml-2 mr-4'>•</span>
              <span className='w-[6ch] text-start'>{formatTravelTime(route.travelTime)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex items-center gap-3 flex-wrap'>
        <h3 className='font-semibold text-lg'>Fairness Meter - {scoreToPercentage(data.score)}%</h3>
        {scoreToPercentage(data.score) >= 90 && (<ThumbsupIcon className='w-4 h-4'/>)}
      </div>
      <div className='flex items-center gap-3 flex-wrap'>
        <LocationIcon className='w-6.5 h-6.5'/>
        <p className='flex-1 max-w-[30ch] text-sm font-semibold'>{data.address}</p>
      </div>
    </div>
  )
}
