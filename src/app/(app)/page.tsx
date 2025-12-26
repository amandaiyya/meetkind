"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const isSmall = width < 500;
  const isMedium = width >= 500 && width < 800;

  const src = isSmall
  ? "dark-midway-small.svg"
  : isMedium
  ? "dark-midway-medium.svg"
  : "dark-midway-large.svg";

  useEffect(() => {
    setMounted(true);
    const update = () => setWidth(window.innerWidth);
    update();

    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [setWidth])

  if (!mounted) return null;

  return (
    <section className="flex-1 px-4 py-3 sm:px-6 xl:px-10 text-center relative">
      <h1 className="text-4xl sm:text-5xl xl:text-6xl mt-26">Meet where Everyone can</h1>
      <h2 className="text-lg sm:text-2xl xl:text-3xl mt-5 mb-6">let’s find a accessible midway!</h2>
      <Button 
        className="primary-dark px-3 py-1 lg:text-lg"
        onClick={() => router.replace("/plan")}
      >Search</Button>
      <img src={src} alt="" className="absolute bottom-0 left-0"/>
    </section>
  );
}
  