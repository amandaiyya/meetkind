"use client";

import CardSwiper from '@/components/CardSwiper';
import { usePlanStore } from '@/stores/plan-store';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function page() {
  const router = useRouter();
  const { venues, hasHydrated, clearCurrentPlan } = usePlanStore();

  useEffect(() => {
    if (hasHydrated && !venues.length) {
        router.replace("/plan");
    }
  }, [hasHydrated, venues, router]);

  if (!hasHydrated) {
    return (
      <section className="flex-1 px-4 py-10 sm:px-6 xl:px-10 flex items-center justify-center">
        <h2 className='font-semibold'>Fetching plan results...</h2>
      </section>
    )
  }

  if (!venues.length) {
    return null;
  }

  return (
    <section className="flex-1 px-4 py-10 sm:px-6 xl:px-10 flex items-center justify-center">
      <div className="flex flex-col gap-4 items-center justify-center w-full h-full relative">
        <button 
          className='absolute top-0 left-0 hidden md:flex items-center gap-2 cursor-pointer'
          onClick={() => {
            clearCurrentPlan();
            router.replace("/plan");
          }}
        >
          <ArrowLeftIcon className='text-dark-secondary size-4'/>
          <span className='underline font-semibold text-sm text-dark-secondary'>Plan another</span>
        </button>
        <CardSwiper venues={venues}/>
      </div>
    </section>
  )
}