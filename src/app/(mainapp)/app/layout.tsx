"use client";

import useUser from "@/components/custom-hooks/user";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useUser({ configs: { isFetch: true } });

  return children;
}
