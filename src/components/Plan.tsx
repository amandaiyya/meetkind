"use client";

import { PlanProps } from '@/types/plan'
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import React from 'react'
import CardSwiper from './CardSwiper';

export default function Plan({
    data
}: {
    data: PlanProps | null;
}) {
  const router = useRouter();

  if (!data?.venues?.length) {
    return null;
  }
  
  return (
    <section className="flex-1 px-4 py-10 sm:px-6 xl:px-10 flex items-center justify-center">
      <div className="flex flex-col gap-4 items-center justify-center w-full h-full relative">
        <button 
          className='absolute top-0 left-0 hidden md:flex items-center gap-2 cursor-pointer'
          onClick={() => {
            router.replace("/account");
          }}
        >
          <ArrowLeftIcon className='text-dark-secondary size-4'/>
          <span className='underline font-semibold text-sm text-dark-secondary'>Go back</span>
        </button>
        <CardSwiper venues={data.venues}/>
      </div>
    </section>
  )
};
