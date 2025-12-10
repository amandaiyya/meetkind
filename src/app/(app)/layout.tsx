import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="bg-light-secondary noise">
          <main className="noise bg-light-primary h-[95vh] shadow-xl flex flex-col">
              <Navbar />
              {children}
          </main>
          <Footer />
      </div>
    </>
  );
}