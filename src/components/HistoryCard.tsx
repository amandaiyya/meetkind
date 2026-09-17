"use client";

import { LocationIcon, UsersIcon } from '@/assets/assets';
import formatDate from '@/helpers/formatDate';
import { HistoryCardPlan } from '@/types/plan';
import React from 'react';

export default function HistoryCard({
  plan
}: {
  plan: HistoryCardPlan;
}) {
  return (
    <div className='w-full space-y-3 bg-light-secondary border border-dark-secondary cursor-pointer rounded-xl p-3 sm:p-4 md:p-5 shadow-md'>
      <div className='flex justify-between items-center'>
        <h3 className='font-semibold lg:text-lg'><q>{plan.category}</q></h3>
        <h4 className='text-xs lg:text-sm font-semibold'>{formatDate(plan.createdAt)}</h4>
      </div>
      <ul className='flex flex-col gap-1'>
        <li className='flex items-center flex-wrap gap-1.5 lg:gap-2.5'>
            <LocationIcon className='w-3.5 h-3.5 lg:w-4 lg:h-4'/>
            <span className='text-sm lg:text-base'>Midpoint location • {plan.venues} spots found</span>
        </li>
        <li className='flex items-center flex-wrap gap-1.5 lg:gap-2.5'>
            <UsersIcon className='#001D3D w-3.5 h-3.5 lg:w-4 lg:h-4'/>
            <span className='text-sm lg:text-base'>you + {plan.participants - 1} friends</span>
        </li>
      </ul>
    </div>
  )
}
