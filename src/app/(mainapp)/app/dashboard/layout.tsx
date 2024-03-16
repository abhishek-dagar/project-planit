import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Project Planit dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
