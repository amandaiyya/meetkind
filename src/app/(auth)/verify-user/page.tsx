"use client";

import Button from '@/components/Button';
import { VerifySchema } from '@/schemas/verirySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod";

function page() {
  const queryParams = useSearchParams();
  const email = queryParams.get("email") ?? "";

  const codeLength = 6;

  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  const router = useRouter();

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
            console.log(data.message);
            reset();
            router.replace('/sign-in');
        }
    } catch (error) {
        if(axios.isAxiosError(error)) {
            const msg = error.response?.data?.message || "Server Error";
            console.log(msg);
        } else {
            console.log(error);
            console.log("Verification Failed!");
        }
    }
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
                            className="border-2 rounded-sm p-2 bg-light-secondary w-10 h-10 sm:w-15 sm:h-15 md:w-16 md:h-16 shadow-sm outline-none text-center text-2xl sm:text-3xl md:text-4xl font-bold"
                        />
                    ))}
                </div>
                <p className="text-red-500 text-sm text-center w-full h-4 mt-2 mb-3">{errors.verifyCode && errors.verifyCode.root?.message}</p>
                <Button
                    type="submit"
                    className="primary-dark w-full text-center flex justify-center items-center"
                >
                    {isSubmitting ? (
                        <>
                        <img src="/Loader.svg" className="w-4 sm:w-5 mr-2 animate-spin"/>
                        <span>Verifying</span>
                        </>
                    ) : "Verify"}
                </Button>
            </form> 
            <div className="w-full h-0.5 bg-black/50"></div>
            <p className="text-center md:text-lg font-medium">
                Go back to{" "}
                <Link className="underline text-dark-primary font-semibold" href="/sign-up">Signup</Link>
            </p>
        </div>
    </main>
  )
}

export default page
