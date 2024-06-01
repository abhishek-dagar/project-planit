import { Boxes } from "@/components/common/background-boxes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden">
      <Boxes className="-z-1" />
      <div className="z-20">{children}</div>
    </div>
  );
}
