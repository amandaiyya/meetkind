"use client";

import { LoaderIcon, MeetKindLogo } from '@/assets/assets';
import Button from '@/components/Button';
import { VerifySchema } from '@/schemas/verirySchema';
import { useThemeStore } from '@/stores/theme-store';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useRef } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from "zod";

function VerifyUser() {
  const queryParams = useSearchParams();
  const email = queryParams.get("email") ?? "";

  const codeLength = 6;

  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  const router = useRouter();

  const { theme } = useThemeStore();

  const { 
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<z.infer<typeof VerifySchema>>({
    resolver: zodResolver(VerifySchema),
    defaultValues: {
      verifyCode: Array(codeLength).fill(""), 
      email: email
    },
  })

  const watchedCode = watch("verifyCode") ?? Array(codeLength).fill("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/[^0-9]/g, '');

    setValue(`verifyCode.${index}`, value);

    if(index < codeLength && value)
    inputRef.current[index + 1]?.focus();
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if(e.key === 'Backspace' && index > 0 && !watchedCode[index]) {
        inputRef.current[index - 1]?.focus();
    }
  }

  const handleVerification = async (body: z.infer<typeof VerifySchema>) => {
    try {
        const {data} = await axios.post('/api/verify-user', body);
        if(data.success) {
            toast.success(data.message);
            reset();
            router.replace('/sign-in');
        }
    } catch (error) {
        if(axios.isAxiosError(error)) {
            const msg = error.response?.data?.message || "Server Error";
            toast.error(msg);
        } else {
            console.log(error);
            toast.error("Verification Failed!");
        }
    }
  }

  return (
    <main className='noise bg-light-primary dark:bg-dark-tertiary w-screen h-screen p-5 flex justify-center items-center relative'>
        <div className='absolute top-0 left-0 px-3 py-2 bg-light-primary shadow-sm rounded-md'>
          <MeetKindLogo className='w-[79px] h-[52px] text-dark-secondary '/>
        </div>
        <div className="w-full max-w-sm sm:max-w-lg flex flex-col items-center gap-4 md:gap-7">
            <h1 className="text-center text-3xl font-black mb-2">Verify account</h1>
            <form onSubmit={handleSubmit(handleVerification)} className="w-full md:text-lg flex flex-col items-center">
                <label className="font-semibold mb-5 text-center">Enter Verification Code sent to {email}</label>
                <div className="space-x-1 sm:space-x-2 px-2">
                    {Array.from({length: codeLength}).map((_, index) => (
                        <input 
                            key={index}
                            type='text'
                            maxLength={1}
                            value={watchedCode[index] ?? ""}
                            {...register(`verifyCode.${index}` as const)}
                            ref={(el) => {inputRef.current[index] = el}}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="border-2 rounded-sm p-2 bg-light-secondary dark:bg-dark-secondary w-10 h-10 sm:w-15 sm:h-15 md:w-16 md:h-16 shadow-sm outline-none text-center text-2xl sm:text-3xl md:text-4xl font-bold"
                        />
                    ))}
                </div>
                <p className="text-red-500 text-sm text-center w-full h-4 mt-2 mb-3">{errors.verifyCode && errors.verifyCode.root?.message}</p>
                <Button
                    type="submit"
                    className={`${theme === "dark" ? "primary-light" : "primary-dark"} w-full text-center flex justify-center items-center px-3 py-2`}
                >
                    {isSubmitting ? (
                        <>
                        <LoaderIcon className="w-4 sm:w-5 mr-2 animate-spin"/>
                        <span>Verifying</span>
                        </>
                    ) : "Verify"}
                </Button>
            </form> 
            <div className="w-full h-0.5 bg-black/50 dark:bg-light-primary/70"></div>
            <p className="text-center md:text-lg font-medium">
                Go back to{" "}
                <Link className="underline text-dark-primary dark:text-light-secondary font-semibold" href="/sign-up">Signup</Link>
            </p>
        </div>
    </main>
  )
}

export default function VerifyUserPage() {
  return (
    <Suspense fallback={
      <main className='noise bg-light-primary dark:bg-dark-tertiary w-screen h-screen p-5 flex justify-center items-center relative'>
        <div className='absolute top-0 left-0 px-3 py-2 bg-light-primary shadow-sm rounded-md'>
            <MeetKindLogo className='w-[79px] h-[52px] text-dark-secondary'/>
        </div>
        <div className="w-full max-w-sm sm:max-w-lg flex flex-col items-center gap-4 md:gap-7">
          <div className='text-sm sm:text-base font-semibold text-center'>Loading...</div>
        </div>
      </main>
    }>
      <VerifyUser />
    </Suspense>
  );
};