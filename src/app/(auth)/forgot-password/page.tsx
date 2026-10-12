"use client";

import { LoaderIcon, MailIcon, MeetKindLogo } from '@/assets/assets';
import Button from '@/components/Button';
import { ForgotPasswordSchema } from '@/schemas/ForgotPasswordSchema';
import { useThemeStore } from '@/stores/theme-store';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from "zod";

function ForgotPasswordPage() {
  const { theme } = useThemeStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting}
  } = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
        email: ""
    }
  });

  const onSubmit = async (body: z.infer<typeof ForgotPasswordSchema>) => {
    try {
        const {data} = await axios.post('/api/forgot-password', body);
        if(data.success) {
            reset();
            toast.success(data.message);
        }
    } catch (error) {
        if(axios.isAxiosError(error)) {
            const msg = error.response?.data?.message || "Server Error";
            toast.error(msg);
        } else {
            console.log(error);
            toast.error("Password forgot process failed!");
        }
    }
  }

  return (
    <main className='noise bg-light-primary dark:bg-dark-tertiary w-screen h-screen p-5 flex justify-center items-center relative'>
        <div className='absolute top-0 left-0 px-3 py-2 bg-light-primary shadow-sm rounded-md'>
            <MeetKindLogo className='w-[79px] h-[52px] text-dark-secondary'/>
        </div>
        <div className="w-full max-w-sm sm:max-w-lg flex flex-col items-center gap-4 md:gap-7">
            <h1 className="text-center text-3xl font-black">Forgot Password ?</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full md:text-lg flex flex-col items-center">
                <label className="font-semibold mb-5 text-center">No worries, meetkind will send you reset link.</label>
                <div className="w-full border-2 rounded-sm py-1 px-2 mt-1 flex flex-wrap items-center gap-2">
                    <div className="w-5">
                        <MailIcon className=''/>
                    </div>
                    <div className="w-[1.5px] h-5 bg-dark-secondary dark:bg-light-primary"></div>
                    <input 
                        type="email"
                        {...register("email")}
                        className="flex-1 outline-none font-semibold" 
                        placeholder="enter your email"
                        required
                    />
                </div>
                <p className="text-red-500 text-sm text-center w-full h-4 mb-3">{errors.email && errors.email.message}</p>
                <Button
                    type="submit"
                    className={`${theme === "dark" ? "primary-light" : "primary-dark"} w-full text-center flex justify-center items-center px-3 py-2`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                        <LoaderIcon className="w-4 sm:w-5 mr-2 animate-spin"/>
                        <span>Loading</span>
                        </>
                    ) : "Submit"}
                </Button>
            </form> 
            <div className="w-full h-0.5 bg-black/50"></div>
            <p className="text-center md:text-lg font-medium">
                Go back to{" "}
                <Link className="underline text-dark-primary dark:text-light-secondary font-semibold" href="/sign-in">Login</Link>
            </p>
        </div>
    </main>
  )
}

export default ForgotPasswordPage;