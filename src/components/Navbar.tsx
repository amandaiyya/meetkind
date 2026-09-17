"use client";

import React, { useState } from 'react';
import Button from './Button';
import Link from 'next/link';
import { MoonIcon } from '@/assets/assets';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

function Navbar() {
  const { data: session } = useSession();

  const isLoggedIn = Boolean(session?.user);
  
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between px-4 py-2 sm:px-6 xl:px-10 xl:py-4">
      <Link href="/" className="relative outline-none">
        <img 
            src="/meetkind.svg"
            alt="meetkind"
            className="w-[69px] sm:w-[79px] relative -left-2.5"
        />
      </Link>
      <div className="flex items-center gap-3">
        {isLoggedIn ? (
            <Link href={"/account"} className="font-semibold text-lg sm:text-xl cursor-pointer">{session?.user?.username} /</Link>
        ) : (
            <Button onClick={() => router.push("/sign-in")} className="secondary-dark noise lg:text-lg px-3 py-1">sign in</Button>
        )}
        <button className="outline-none cursor-pointer">
            <MoonIcon className="w-7 lg:w-8"/>
        </button>
      </div>
    </nav>
  )
}

export default Navbar;
