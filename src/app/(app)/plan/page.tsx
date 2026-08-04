"use client";

import AddressAutocomplete from '@/components/AddressAutocomplete';
import Button from '@/components/Button';
import React, { useEffect, useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PlanningSchema } from '@/schemas/PlanningSchema';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { usePlanStore } from '@/stores/plan-store';
import { LoaderIcon } from '@/assets/assets';

const venueCategory = {
  cafe: "cafe",
  restaurants: "restaurant"
}

export default function Plan() {
  const router = useRouter();

  const { setVenues } = usePlanStore();

  const [mounted, setMounted] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const {
    control,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: {isSubmitting, errors}
  } = useForm<z.infer<typeof PlanningSchema>>({
    resolver: zodResolver(PlanningSchema),
    defaultValues: {
      venue: venueCategory.cafe,
      myAddress: {
        address: "",
        coordinates: {}
      },
      friendsAddresses: [{
        address: "",
        coordinates: {}
      }],
    }
  }) 

  const { fields, append, remove } = useFieldArray({
    name: "friendsAddresses",
    control,
  })

  const onSubmit = async (body: z.infer<typeof PlanningSchema>) => {
    try {
      const {data} = await axios.post("/api/plan", body);
      if(data.success) {
        console.log(data.message);
        setVenues(data.data);
        router.push("/results");
      }
    } catch (error) {
      if(axios.isAxiosError(error)) {
        const msg = error.response?.data?.message || "Server Error";
        console.log(msg);
      } else {
        console.log(error);
        console.log("Planning Failed!");
      }
    }
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if(
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowOptions(false);
      }
    }

    setMounted(true);

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  },[])
   
  if(!mounted) return null;

  return (
    <section className="flex-1 px-4 py-3 sm:px-6 xl:px-10 flex items-center justify-center">
        <form 
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 items-center justify-center w-full h-full"
        >
          <div className='noise w-full max-w-md min-h-2/3 p-4 bg-light-secondary border border-dark-primary shadow-md rounded-xl'>
              <ul>
                <li className="flex flex-wrap items-center gap-4 relative mb-3">
                    <h3 className="font-semibold text-sm">venue to Search</h3>
                    <Button
                      type='button'
                      onClick={() => setShowOptions(true)}
                      className='primary-dark py-2 px-3 text-sm'
                    >
                      {getValues('venue')}
                    </Button>
                    <input 
                      {...register("venue")}
                      type='hidden'
                    />

                    {showOptions && (
                      <div className='bg-black/50 fixed inset-0 z-10 w-screen h-screen p-4 flex justify-center items-center'>
                        <div ref={wrapperRef} className="p-4 space-y-3 bg-light-primary border border-dark-primary shadow-md rounded-xl text-center">
                            <h2 className="text-lg font-semibold">Where to meet?</h2>
                            <div className='flex flex-col items-center gap-2 text-sm font-medium'>
                              <div 
                                role="button"
                                onClick={() => {
                                  setShowOptions(false);
                                  setValue("venue", venueCategory.cafe);
                                }}
                                className="px-1 py-2 rounded-md bg-light-secondary w-full border border-dark-secondary cursor-pointer shadow-md"
                              >
                                  {venueCategory.cafe}
                              </div>
                              <div 
                                role="button"
                                onClick={() => {
                                  setShowOptions(false);
                                  setValue("venue", venueCategory.restaurants);
                                }}
                                className="px-1 py-2 rounded-md bg-light-secondary w-full border border-dark-secondary cursor-pointer shadow-md"
                              >
                                  {venueCategory.restaurants}
                              </div>
                            </div>
                        </div>
                      </div>
                    )}
                </li>

                <li className="flex flex-col gap-2 mb-6">
                  <h3 className="font-semibold text-sm">Your location</h3>
                  <AddressAutocomplete 
                    register={register}
                    setValue={setValue}
                    name='myAddress'
                    placeholder='where i live'
                    errors={errors}
                  />
                </li>

                {fields.map((field, i) => (
                  <li key={field.id} className="flex flex-col gap-2 mb-6">
                    <h3 className="font-semibold text-sm">{`Friend ${i + 1}'s location`}</h3>
                    <div className="flex items-center">
                      <AddressAutocomplete 
                        register={register}
                        setValue={setValue}
                        name={`friendsAddresses.${i}`}
                        placeholder='where they live'
                        errors={errors}
                        className="w-full"
                      />
                      {fields.length > 1 && (
                        <button
                          type="button"
                          className="cursor-pointer p-2"
                          onClick={() => remove(i)}
                        >
                          <XMarkIcon className='size-4'/>
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              
              <Button 
                type="button"
                className="text-xs px-3 py-2 mt-2 border-dashed border-dark-primary text-dark-primary"
                onClick={() => append({address: "", coordinates: {lat: 0, lon: 0}})}
              >+ Add another friend</Button>
          </div>
          <Button
            type="submit"
            className='primary-dark px-4 py-1 text-center flex items-center'
            disabled={isSubmitting}
          >
            {isSubmitting ? (
                <>
                  <LoaderIcon className="w-4 sm:w-5 mr-2 animate-spin"/>
                  <span>Finding</span>
                </>
              ) : "Find"}
          </Button>
        </form>
    </section>
  )
}