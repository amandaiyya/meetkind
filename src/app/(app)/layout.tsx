import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="bg-light-secondary noise">
          <main className="noise bg-light-primary min-h-[95vh] shadow-xl flex flex-col">
              <SessionProvider>
                <Navbar />
                {children}
              </SessionProvider>
          </main>
          <Footer />
      </div>
    </>
  );
}