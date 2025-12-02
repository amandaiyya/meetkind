"use client";

import React, { useState } from 'react';
import Button from './Button';
import Link from 'next/link';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
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
            <span className="font-semibold text-lg sm:text-xl">User /</span>
        ) : (
            <Button className="secondary-dark noise lg:text-lg px-3 py-1">sign in</Button>
        )}
        <button className="outline-none">
            <img src="dark_mode.png" className="cursor-pointer w-7 lg:w-8"/>
        </button>
      </div>
    </nav>
  )
}

export default Navbar;
