"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const errorMessages: Record<string, string> = {
    OAuthAccountNotLinked: "This email is already registered using a different method.",
    OAuthSignin: "Error connecting to provider. Try again.",
    OAuthCallback: "Error during authentication. Please try again.",
    AccessDenied: "Access denied.",
    default: "Something went wrong. Please try again."
}

function ErrorPage() {
  const params = useSearchParams();
  const error = params.get("error");
  const message = errorMessages[error!] ?? errorMessages.default;

  return (
    <main className="noise bg-light-primary dark:bg-dark-tertiary w-screen h-screen p-5 flex flex-col justify-center items-center gap-4">
        <h1 className="text-base sm:text-xl font-semibold text-dark-secondary text-center">{message}</h1>
        <Link href="/sign-in" className="text-sm sm:text-base underline text-dark-primary">
            Go back to sign in
        </Link>
    </main>
  )
}

export default ErrorPage;
