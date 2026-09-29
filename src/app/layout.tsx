import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '@fontsource/krub';
import "./globals.css";
import ThemeScript from "@/components/ThemeScript";
import ThemeProvider from "@/components/ThemeProvider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "meetkind",
  description: "Meet where everyone can",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
          <ThemeScript />
      </head>
      <body
        className={`text-dark-secondary dark:text-light-primary bg-light-primary dark:bg-dark-tertiary ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Toaster
          position="bottom-right"
          reverseOrder={true}
        />
      </body>
    </html>
  );
}
