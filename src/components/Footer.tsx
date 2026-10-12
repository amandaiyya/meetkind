"use client";

import { GithubIcon, HeartIcon, InstagramIcon, LinkedinIcon, MeetKindLogo } from '@/assets/assets';
import Link from 'next/link';
import React from 'react';

function Footer() {
  return (
    <footer className="px-6 lg:px-8 xl:px-10 py-9 lg:py-11 xl:py-14">
      <div className="flex flex-col gap-5 sm:gap-7 lg:flex-row mb-6 sm:mb-9 sm:ml-10 lg:ml-0">
        <div className="flex lg:flex-3 flex-col sm:flex-row items-center sm:items-end gap-5">
            <div className="flex-2 space-y-2 relative">
                <div className="flex justify-center sm:justify-start gap-2.5 lg:mb-3 relative sm:-left-2.5">
                    <MeetKindLogo className='w-[79px] h-[52px] text-dark-secondary dark:text-light-primary'/>
                    <div className="flex items-end pb-1.5 gap-2.5">
                        <Link href="https://github.com/amandaiyya">
                            <GithubIcon className='w-5 h-5'/>
                        </Link>
                        <Link href="https://www.linkedin.com/in/amandaiyya/">
                            <LinkedinIcon className='w-5 h-5'/>
                        </Link>
                        <Link href="/">
                            <InstagramIcon className='w-5 h-5'/>
                        </Link>
                    </div>
                </div>
                <p className="text-center sm:text-start max-w-[33ch] font-semibold text-sm xl:text-base">A platform that helps groups find a meeting place that&apos;s fair, convenient, and kind for everyone.</p>
            </div>
            <div className="flex-1 text-center sm:text-start font-semibold">
                <h2 className="text-lg xl:text-xl mb-2 sm:mb-3 lg:mb-4">Quick Links</h2>
                <ul className="text-sm xl:text-base text-dark-primary dark:text-light-secondary space-y-1 lg:space-y-2">
                    <li className='hover:underline'>
                        <Link href="/">
                            Home
                        </Link>
                    </li>
                    <li className='hover:underline'>
                        <Link href="/account">
                            Profile
                        </Link>
                    </li>
                    <li>
                        {/* <Link href="/"> */}
                            How it Works
                        {/* </Link> */}
                    </li>
                </ul>
            </div>
        </div>
        <div className="flex lg:flex-2 flex-col sm:flex-row items-center sm:items-end gap-5">
            <div className="flex-2 text-center sm:text-start font-semibold">
                <h2 className="text-lg xl:text-xl mb-2 sm:mb-3 lg:mb-4">Features</h2>
                <ul className="text-xs xl:text-base sm:text-sm space-y-1 lg:space-y-2">
                    <li>Fair Midpoint</li>
                    <li>Travel Comparison</li>
                    <li>Smart Venue Ranking</li>
                </ul>
            </div>
            <div className="flex-1 lg:flex-none xl:flex-1 text-center sm:text-start font-semibold">
                <h2 className="text-lg xl:text-xl mb-2 sm:mb-3 lg:mb-4">Legal & Support</h2>
                <ul className="text-sm xl:text-base text-dark-primary dark:text-light-secondary space-y-1 lg:space-y-2">
                    <li>Privacy & Data</li>
                    <li>Terms & Conditions</li>
                    <li>Need Help?</li>
                </ul>
            </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-dark-secondary dark:bg-light-primary"></div>
      <div className="text-xs xl:text-sm flex flex-col sm:flex-row gap-1 sm:gap-0 justify-between items-center mt-2.5 sm:mt-4 sm:ml-10 lg:ml-0">
        <p className="flex-2 lg:flex-none">© {new Date().getFullYear()} meetkind.  All rights reserved</p>
        <p className="flex flex-1 lg:flex-none items-center gap-1 sm:ml-4">made with <HeartIcon /> for kind meetups.</p>
      </div>
    </footer>
  )
}

export default Footer;
