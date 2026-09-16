"use client";

import React, { useState } from 'react';
import Button from './Button';
import { ExitIcon, LoaderIcon, UserIcon } from '@/assets/assets';
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { ProfileSchema } from '@/schemas/ProfileSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Session } from "next-auth";
import { signOut, useSession } from 'next-auth/react';
import axios from 'axios';

export default function Profile({
  user
}: {
  user: Session['user']
}) {
  const { update } = useSession();

  const [editProfile, setEditProfile] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: {errors, isSubmitting}
  } = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      username: user.username,
      email: user.email
    }
  });

  const handleEdit = async (body: z.infer<typeof ProfileSchema>) => {
    try {
      const { data } = await axios.put("/api/edit-profile", body);
      if(data.success) {
        console.log(data.message);
        await update({
          username: data.data.username,
          email: data.data.email,
        });
        setEditProfile(false);
      }
    } catch (error) {
      if(axios.isAxiosError(error)) {
        const msg = error.response?.data?.message || "Server Error";
        console.log(msg);
      } else {
        console.log(error);
        console.log("Something went wrong!");
      }
    }
  }

  const handleCancel = () => {
    setValue("username", user.username);
    setValue("email", user.email);
    clearErrors();
    setEditProfile(false);
  }

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/",
    });
  }

  return (
    <form onSubmit={handleSubmit(handleEdit)} className='space-y-4 lg:space-y-5'>
      <div className='flex items-center gap-2 md:gap-4 lg:gap-6'>
          <div className='w-10 h-10 lg:w-15 lg:h-15 p-2 lg:p-3 shadow-md rounded-full border-2 border-dark-secondary bg-dark-primary flex items-center justify-center'>
              <UserIcon className='w-full h-full' strokeWidth='2.5' stroke='#FFD60A'/>
          </div>
        <div className='flex gap-1 md:gap-2 flex-wrap'>
            {editProfile &&
              <Button 
              type="submit"
              disabled={isSubmitting}
              className='primary-dark text-sm lg:text-base px-3 py-1'
              >
                {isSubmitting ? (
                  <>
                    <LoaderIcon className="w-4 sm:w-5 mr-2 animate-spin"/>
                    <span>Saving</span>
                  </>
                ) : "Save"}
              </Button>
            }
            {!editProfile && 
              <Button 
              type="button"
              onClick={() => setEditProfile(true)}
              className='primary-dark text-sm lg:text-base px-3 py-1'
              >
                Edit Profile
              </Button>
            }

            <Button 
              type='button'
              onClick={() => editProfile ? handleCancel() : handleLogout()}
              className='secondary-dark text-sm lg:text-base px-3 py-1 flex items-center gap-2'
            >
              {editProfile ? "Cancel" : (
                <>
                  <span>Logout</span>
                  <ExitIcon className='w-3 h-3 lg:w-4 lg:h-4 hidden min-[500px]:block' stroke='#001D3D'/>
                </>
              )}
            </Button>
        </div>
      </div>
      <div className=''>
        <div className='flex flex-col gap-2 lg:text-lg'>
          <label className="font-semibold">Username</label>
          <div className="w-full border-2 rounded-sm py-1 px-2 flex flex-wrap items-center gap-2">
            <input 
              type="text"
              {...register("username")}
              disabled={!editProfile}
              className="flex-1 outline-none font-semibold" 
              placeholder="enter your username"
              required
            />
          </div>
        </div>
        <p className="text-red-500 text-sm w-full h-2 mb-2">{errors.username && errors.username.message}</p>
        <div className='flex flex-col gap-2 lg:text-lg'>
          <label className="font-semibold">Email</label>
          <div className="w-full border-2 rounded-sm py-1 px-2 flex flex-wrap items-center gap-2">
            <input 
              type="email"
              {...register("email")}
              disabled={!editProfile}
              className="flex-1 outline-none font-semibold" 
              placeholder="enter your email"
              required
            />
          </div>
        </div>
        <p className="text-red-500 text-sm w-full h-2 mb-2">{errors.email && errors.email.message}</p>
      </div>
    </form>
  )
}
