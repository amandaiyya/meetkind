"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SignupSchema } from '@/schemas/SignupSchema';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Link from 'next/link';
import React from 'react';
import axios from "axios";
import * as z from "zod";

function SignupPage() {
  const router = useRouter();

  const {
    register, 
    handleSubmit, 
    reset,
    getValues,
    formState: {errors, isSubmitting}
  } = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema)
  });

  const handleSignup = async (body: z.infer<typeof SignupSchema>) => {
    try {
      const {data} = await axios.post('/api/sign-up',body);
      if(data.success) {
        const email = encodeURIComponent(getValues("email"));
        reset();
        console.log(data.message);
        router.replace(`/verify-user?email=${email}`);
      }
    } catch (error) {
      if(axios.isAxiosError(error)) {
        const msg = error.response?.data?.message || "Server Error";
        console.log(msg);
      } else {
        console.log(error);
        console.log("Signup Failed!");
      }
    }
  }

  const handleOauth = () => {
    signIn("google", { callbackUrl: "/" });
  }

  return (
    <main className='noise bg-light-primary dark:bg-dark-tertiary w-screen h-screen p-5 flex items-center gap-10'>
      <section className='hidden sm:block h-full w-full max-w-xl bg-[url("/wholesome.jfif")] bg-no-repeat bg-center bg-cover rounded-2xl p-3 shadow-lg'>
        <img 
          width="99px"
          height="89px" 
          src="/meetkind.svg"
          alt="meetkind"
        />
      </section>
      <section className='h-full w-full p-5 flex justify-center item-center'>
        <div className="w-full max-w-xl flex flex-col items-center gap-4 md:gap-6">
          <h1 className="text-center text-2xl font-black">Sign up</h1>
          <form onSubmit={handleSubmit(handleSignup)} className="space-y-3 w-full md:text-lg">
            <div>
              <label className="font-semibold mb-3">Username</label>
              <div className="border-2 rounded-sm py-1 px-2 mt-1 flex flex-wrap items-center gap-2">
                <div className="w-5">
                  <img src="/User.svg" alt="meetkind" />
                </div>
                <div className="w-[1.5px] h-5 bg-dark-secondary"></div>
                <input 
                  {...register("username")}
                  className="flex-1 outline-none font-semibold" 
                  placeholder="enter your username"
                />
              </div>
              <p className="text-red-500 text-sm w-full h-2">{errors.username && errors.username.message}</p>
            </div>
            <div>
              <label className="font-semibold mb-3">Email</label>
              <div className="border-2 rounded-sm py-1 px-2 mt-1 flex flex-wrap items-center gap-2">
                <div className="w-5">
                  <img src="/Mail.svg" alt="meetkind" />
                </div>
                <div className="w-[1.5px] h-5 bg-dark-secondary"></div>
                <input 
                  {...register("email")}
                  className="flex-1 outline-none font-semibold" 
                  placeholder="enter your email"
                />
              </div>
              <p className="text-red-500 text-sm w-full h-2">{errors.email && errors.email.message}</p>
            </div>
            <div>
              <label className="font-semibold mb-3">Password</label>
              <div className="border-2 rounded-sm py-1 px-2 mt-1 flex flex-wrap items-center gap-2">
                <div className="w-5">
                  <img src="/Eye.svg" alt="meetkind" />
                </div>
                <div className="w-[1.5px] h-5 bg-dark-secondary"></div>
                <input 
                  {...register("password")}
                  className="flex-1 outline-none font-semibold" 
                  placeholder="enter your password"
                />
              </div>
              <p className="text-red-500 text-sm w-full h-2">{errors.password && errors.password.message}</p>
            </div>
            <Link href="/forgot-password" className="underline text-dark-primary float-right font-semibold block py-2">Forgot Password?</Link>
            <Button
              type="submit"
              className="primary-dark w-full text-center flex justify-center items-center"
            >
              {isSubmitting ? (
                <>
                  <img src="/Loader.svg" className="w-4 sm:w-5 mr-2 animate-spin"/>
                  <span>Loading</span>
                </>
              ) : "Sign up"}
            </Button>
          </form>
          <div className="w-full flex items-center gap-3 text-black/50 md:text-lg font-semibold my-1">
            <div className="w-auto h-0.5 flex-1 bg-black/50"></div>
            <p>Or Continue With</p>
            <div className="w-auto h-0.5 flex-1 bg-black/50"></div>
          </div>
          <div
            role="button"
            onClick={handleOauth}
            className="w-13 h-13 my-2 border-2 border-black/50 bg-white rounded-full self-center shadow-md flex justify-center items-center cursor-pointer"
          >
            <img className="w-7 h-7" src="/Google.svg" alt="meetkind" />
          </div>
          <p className="text-center md:text-lg font-medium">
            Dont have an account?{" "}
            <Link className="underline text-dark-primary font-semibold" href="/sign-in">Login</Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default SignupPage;
