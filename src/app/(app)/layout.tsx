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
          <main className="noise bg-light-primary h-screen shadow-xl">
              <Navbar />
              {children}
          </main>
          <Footer />
      </div>
    </>
  );
}