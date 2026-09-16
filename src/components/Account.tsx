"use client";

import React, { useEffect, useRef, useState } from 'react';
import Profile from './Profile';
import HistoryCard from './HistoryCard';
import { Session } from "next-auth";
import axios from 'axios';
import { HistoryCardPlan } from '@/types/plan';
import { useRouter } from 'next/navigation';

type ProfileProps = {
  user: Session['user'];
  history: {
    plans: HistoryCardPlan[];
    hasMore: boolean;
  }
};

export default function Account({
  user,
  history
}: ProfileProps ) {
  const [plans, setPlans] = useState<HistoryCardPlan[]>(history.plans);
  const [hasMore, setHasMore] = useState<boolean>(history.hasMore);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false);
  const pageRef = useRef(1);

  const router = useRouter();

  const fetchNextPage = async () => {
    if (loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    setLoading(true);

    try {
        const nextPage = pageRef.current + 1;

        const { data } = await axios(`/api/history?page=${nextPage}`);

        if (data.success) {
          setPlans((prev) => [
            ...prev,
            ...data.data.plans
          ]);

          pageRef.current = nextPage;
          setHasMore(data.data.hasMore);   
        }
    } catch (error) {
      if(axios.isAxiosError(error)) {
        const msg = error.response?.data?.message || "Server Error";
        console.log(msg);
      } else {
        console.log(error);
        console.log("Failed fetching next page!");
      }
    } finally {
        loadingRef.current = false;
        setLoading(false);
    }
  };

  useEffect(() => {
    const loader = loaderRef.current;

    if (!loader) return;

    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                fetchNextPage();
            }
        },
        {
            threshold: 0.1,
        }
    );

    observer.observe(loader);

    return () => {
        observer.disconnect();
    };
  }, [hasMore]);

  return (
    <div className="flex-1 px-4 py-8 md:py-10 sm:px-6 xl:px-10 flex flex-col max-[768px]:items-center md:flex-row gap-5 lg:gap-8">
      <section className='w-full max-w-md md:max-w-none bg-light-primary shadow-md rounded-xl p-8 noise'>
        <Profile user={user}/>
      </section>
      <section className='flex flex-col w-full max-w-md md:max-w-none bg-light-primary shadow-md rounded-xl p-8 noise'>
        <h2 className='font-semibold text-lg lg:text-xl mb-6 lg:mb-8'>History</h2>
        <div className='flex-1 overflow-y-auto no-scrollbar'>
          <ul className='max-h-[300px] md:h-0 flex flex-col gap-5'>
            {plans.map((plan) => (
              <li 
                key={plan._id} 
                role="button"
                onClick={() => router.push(`/account/history/${plan._id}`)}
                className='max-w-xl'
              >
                <HistoryCard plan={plan}/>
              </li>
            ))}
            {hasMore && (
            <div
                ref={loaderRef}
                className="py-4 text-center text-sm"
            >
                {loading && "Loading more plans..."}
            </div>
          )}
          </ul>
        </div>
      </section>
    </div>
  )
};
