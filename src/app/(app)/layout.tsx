import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="bg-light-secondary noise">
          <main className="noise bg-light-primary h-screen shadow-xl">
              {children}
          </main>
          <Footer />
      </div>
    </>
  );
}