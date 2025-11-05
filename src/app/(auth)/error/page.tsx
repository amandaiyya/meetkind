"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const errorMessages: Record<string, string> = {
    CredentialsSignin: "Invalid email or password.",
    // OAuthAccountNotLinked: "This email is already registered using a different method.",
    OAuthSignin: "Error connecting to provider. Try again.",
    OAuthCallback: "Error during authentication. Please try again.",
    AccessDenied: "Access denied.",
    // Verification: "Verification link expired or invalid.",
    default: "Something went wrong. Please try again."
}

function ErrorPage() {
  const params = useSearchParams();
  const error = params.get("error") ?? "default";

  return (
    <main className="flex flex-col items-center p-8 text-center gap-4">
        <h1 className="text-lg font-semibold text-red-600">{errorMessages[error]}</h1>
        <Link href="/sign-in" className="underline text-dark-secondary">
            Go back to sign in
        </Link>
    </main>
  )
}

export default ErrorPage;
