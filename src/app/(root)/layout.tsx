import HomeNavbar from "@/components/navbars/home-navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HomeNavbar />
      {children}
    </>
  );
}
