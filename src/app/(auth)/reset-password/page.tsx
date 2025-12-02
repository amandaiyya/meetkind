"use client";

import Button from '@/components/Button';
import { ResetPasswordSchema } from '@/schemas/ResetPasswordSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod";

function page() {
  const queryParams = useSearchParams();
  const id = queryParams.get("id") ?? "";
  const token = queryParams.get("token") ?? "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [newPasswordVisibility, setNewPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);

  const {
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: {errors, isSubmitting}
  } = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      id: id,
      token: token,
      password: ""
    }
  });

  const onSubmit = async (body: z.infer<typeof ResetPasswordSchema>) => {
    try {
        const {data} = await axios.patch('/api/reset-password', body);
        if(data.success) {
          reset();
          setNewPassword("");
          setConfirmPassword("");
          console.log(data.message);
        }
    } catch (error) {
        if(axios.isAxiosError(error)) {
            const msg = error.response?.data?.message || "Server Error";
            console.log(msg);
        } else {
            console.log(error);
            console.log("Password reset failed!")
        }
    }
  }

  const onLocalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(newPassword.length < 6) {
      setError("password", {type: "minLength", message: "Password must be at least 6 characters"})
      return;
    }

    if(newPassword !== confirmPassword) {
      setError("password", {type: "manual", message: "Passwords must match each other"})
      return;
    }

    setValue("password", newPassword);

    await handleSubmit(onSubmit)();
  }

  return (
    <main className='noise bg-light-primary dark:bg-dark-tertiary w-screen h-screen p-5 flex justify-center items-center relative'>
        <div className='absolute top-0 left-0 px-3 py-2 bg-light-primary shadow-sm rounded-md'>
            <img 
                width="79px"
                height="69px" 
                src="/meetkind.svg"
                alt="meetkind"
            />
        </div>
        <div className="w-full max-w-sm sm:max-w-lg flex flex-col items-center gap-4 md:gap-7">
            <h1 className="text-center text-3xl font-black">Reset Password</h1>
            <form onSubmit={(e) => onLocalSubmit(e)} className="w-full md:text-lg flex flex-col items-center">
                <div className="w-full">
                  <label className="font-semibold mb-3">New Password</label>
                  <div className="border-2 rounded-sm py-1 px-2 mt-1 flex flex-wrap items-center gap-2">
                    <div 
                      role="button"
                      onClick={() => setNewPasswordVisibility(!newPasswordVisibility)}
                      className="w-5 cursor-pointer"
                    >
                      <img src={newPasswordVisibility ? "/Eye-close.svg" : "/Eye.svg"} alt="meetkind" />
                    </div>
                    <div className="w-[1.5px] h-5 bg-dark-secondary"></div>
                    <input 
                      type={newPasswordVisibility ? "text" : "password"}
                      className="flex-1 outline-none font-semibold" 
                      placeholder="enter your password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <p className="text-red-500 text-sm w-full h-4 mb-2">{/* {errors.password && errors.password.message} */}</p>
                </div>
                <div className="w-full">
                  <label className="font-semibold mb-3">Confirm Password</label>
                  <div className="border-2 rounded-sm py-1 px-2 mt-1 flex flex-wrap items-center gap-2">
                    <div 
                      role="button"
                      onClick={() => setConfirmPasswordVisibility(!confirmPasswordVisibility)}
                      className="w-5 cursor-pointer"
                    >
                      <img src={confirmPasswordVisibility ? "/Eye-close.svg" : "/Eye.svg"} alt="meetkind" />
                    </div>
                    <div className="w-[1.5px] h-5 bg-dark-secondary"></div>
                    <input 
                      type={confirmPasswordVisibility ? "text" : "password"}
                      className="flex-1 outline-none font-semibold" 
                      placeholder="enter your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <p className="text-red-500 text-sm w-full h-4 mb-2">{errors.password && errors.password.message}</p>
                </div>
                <Button
                    type="submit"
                    className="primary-dark w-full text-center flex justify-center items-center mt-2 px-3 py-2"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                        <img src="/Loader.svg" className="w-4 sm:w-5 mr-2 animate-spin"/>
                        <span>Loading</span>
                        </>
                    ) : "Reset"}
                </Button>
            </form> 
            <div className="w-full h-0.5 bg-black/50"></div>
            <p className="text-center md:text-lg font-medium">
                Go back to{" "}
                <Link className="underline text-dark-primary font-semibold" href="/sign-in">Login</Link>
            </p>
        </div>
    </main>
  )
}

export default page;
