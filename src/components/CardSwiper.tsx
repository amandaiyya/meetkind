"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import PlanCard from './PlanCard';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Button from "./Button";
import { RankedVenue } from "@/types/venue";

export default function CardSwiper({
  venues = []
}: {
  venues: RankedVenue[];
}){
  return (
    <div className="slider-wrapper">

        <button className="slider-btn prev">
          &#8249;
        </button>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: ".prev",
            nextEl: ".next",
          }}
          pagination={{
            clickable: true,
          }}
        >
          {venues.map((v) => (
            <SwiperSlide key={v.placeId}>
                <PlanCard data={v}/>
                <Button
                  type="submit"
                  className='primary-dark px-4 py-1 text-center flex items-center text-sm mt-6'
                  onClick={() => {
                    const url = `https://www.google.com/maps/search/?api=1&query=${v.coordinates.lat},${v.coordinates.lon}`;
                    window.open(url, "_blank", "noopener,noreferrer");
                  }}
                >
                  Show on map
                </Button>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="slider-btn next">
          &#8250;
        </button>

      </div>
  )
}
