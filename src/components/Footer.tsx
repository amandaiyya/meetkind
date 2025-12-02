"use client";

import Link from 'next/link';
import React from 'react';

function Footer() {
  return (
    <footer className="px-6 lg:px-8 xl:px-10 py-9 lg:py-11 xl:py-14">
      <div className="flex flex-col gap-5 sm:gap-7 lg:flex-row mb-6 sm:mb-9 sm:ml-10 lg:ml-0">
        <div className="flex lg:flex-3 flex-col sm:flex-row items-center sm:items-end gap-5">
            <div className="flex-2 space-y-2 relative">
                <div className="flex justify-center sm:justify-start gap-2.5 lg:mb-3 relative sm:-left-2.5">
                    <img 
                        width="79px"
                        height="69px" 
                        src="/meetkind.svg"
                        alt="meetkind"
                    />
                    <div className="flex items-end pb-1.5 gap-2.5">
                        <Link href="https://github.com/amandaiyya">
                            <img width="20px" src="Github.svg"/>
                        </Link>
                        <Link href="https://www.linkedin.com/in/amandaiyya/">
                            <img width="20px" src="Linkedin.svg"/>
                        </Link>
                        <Link href="/">
                            <img width="20px" src="Instagram.svg"/>
                        </Link>
                    </div>
                </div>
                <p className="text-center sm:text-start max-w-[33ch] font-semibold text-sm xl:text-base">A platform to help people of all abilities meet at places that are comfortable, accessible, and kind.</p>
            </div>
            <div className="flex-1 text-center sm:text-start font-semibold">
                <h2 className="text-lg xl:text-xl mb-2 sm:mb-3 lg:mb-4">Quick Links</h2>
                <ul className="text-sm xl:text-base text-dark-primary space-y-1 lg:space-y-2">
                    <li>
                        <Link href="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/profile">
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link href="/">
                            How it Works
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
        <div className="flex lg:flex-2 flex-col sm:flex-row items-center sm:items-end gap-5">
            <div className="flex-2 text-center sm:text-start font-semibold">
                <h2 className="text-lg xl:text-xl mb-2 sm:mb-3 lg:mb-4">Features</h2>
                <ul className="text-xs xl:text-base sm:text-sm space-y-1 lg:space-y-2">
                    <li>Accessible Midpoint</li>
                    <li>Multi-Transport Support</li>
                    <li>Custom Needs Input</li>
                </ul>
            </div>
            <div className="flex-1 lg:flex-none xl:flex-1 text-center sm:text-start font-semibold">
                <h2 className="text-lg xl:text-xl mb-2 sm:mb-3 lg:mb-4">Legal & Support</h2>
                <ul className="text-sm xl:text-base text-dark-primary space-y-1 lg:space-y-2">
                    <li>Privacy & Data</li>
                    <li>Terms & Conditions</li>
                    <li>Need Help?</li>
                </ul>
            </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-dark-secondary"></div>
      <div className="text-xs xl:text-sm flex flex-col sm:flex-row gap-1 sm:gap-0 justify-between items-center mt-2.5 sm:mt-4 sm:ml-10 lg:ml-0">
        <p className="flex-2 lg:flex-none">© 2025 meetkind.  All rights reserved</p>
        <p className="flex flex-1 lg:flex-none items-center gap-1 sm:ml-4">made with <img src="heart.svg" /> for kind meetups.</p>
      </div>
    </footer>
  )
}

export default Footer;
