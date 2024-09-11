import Footer from "@/components/shared/Footer";
import NavBar from "@/components/shared/NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
