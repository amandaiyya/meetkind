"use client";

import React from 'react';
import Button from './Button';
import Link from 'next/link';
import { MeetKindLogo, MoonIcon, SunIcon } from '@/assets/assets';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useThemeStore } from '@/stores/theme-store';

function Navbar() {
  const { data: session } = useSession();

  const isLoggedIn = Boolean(session?.user);
  
  const router = useRouter();

  const {theme, setTheme} = useThemeStore();

  const toggleTheme = () => {
      setTheme(theme === "dark" ? "light" : "dark");
  };

  const isDark = theme === "dark";

  return (
    <nav className="flex items-center justify-between px-4 py-2 sm:px-6 xl:px-10 xl:py-4">
      <Link href="/" className="relative outline-none">
        <MeetKindLogo className='w-[69px] h-[46px] sm:w-[79px] sm:h-[51px] relative -left-2.5 text-dark-secondary dark:text-light-primary'/>
      </Link>
      <div className="flex items-center gap-3">
        {isLoggedIn ? (
            <Link href={"/account"} className="font-semibold text-lg sm:text-xl cursor-pointer">{session?.user?.username} /</Link>
        ) : (
            <Button onClick={() => router.push("/sign-in")} className={`${isDark ? "secondary-light" : "secondary-dark"} lg:text-lg px-3 py-1`}>sign in</Button>
        )}
        <button 
          type='button'
          onClick={toggleTheme}
          className="outline-none cursor-pointer transition-colors"
        >
          {isDark 
            ? <SunIcon className='w-7 lg:w-8 text-light-primary'/>
            : <MoonIcon className="w-7 lg:w-8 text-dark-secondary"/>
          }
        </button>
      </div>
    </nav>
  )
}

export default Navbar;