"use client";

import Button from '@/components/Button';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="bg-light-secondary noise">
      <main className="noise bg-light-primary min-h-[95vh] shadow-xl flex flex-col items-center justify-center">
        <section className="px-4 py-3 sm:px-6 xl:px-10 text-center relative">
          <h1 className="text-4xl sm:text-5xl xl:text-6xl">404</h1>
          <h2 className="text-lg sm:text-2xl xl:text-3xl mt-5 mb-6">Page Not Found!</h2>
          <Button
            className="primary-dark px-3 py-1 lg:text-lg"
            onClick={() => router.replace("/")}
          >Go to Home</Button>
        </section>
      </main>
      <Footer />
  </div>
  )
}
